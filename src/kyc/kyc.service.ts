import { KycStatus, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { prisma } from "../common";
import { KycError } from "./contract/error/kyc.error";
import { InquiryStatusResponse } from "./contract/inquiry-status-response.type";
import { PersonaInquiryStatus } from "./contract/persona-inquiry-status.enum";

/**
 * Сервис для управления процессом верификации пользователей (KYC)
 */
export class KycService {
  private readonly personaApiKey: string;
  private readonly personaTemplateId: string;

  constructor() {
    // Инициализация ключей Persona из переменных окружения
    this.personaApiKey = process.env.PERSONA_API_KEY!;
    this.personaTemplateId = process.env.PERSONA_TEMPLATE_ID!;
  }

  private async _callPersonaApi<T>(method: "get" | "post", path: string, data?: any): Promise<T> {
    try {
      const response = await axios({
        method,
        url: `https://api.withpersona.com/api/v1/${path}`,
        data,
        headers: {
          "Persona-Version": "2023-01-05",
          Authorization: `Bearer ${this.personaApiKey}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(`Persona API error on ${method} ${path}:`, error.response?.data);
        throw KycError.providerError(`Persona API error: ${error.response?.status}`);
      } else if (error instanceof Error) {
        console.error(`Unexpected error on ${method} ${path}:`, error.message);
        throw KycError.providerError(`Unexpected error: ${error.message}`);
      } else {
        console.error(`Unknown error on ${method} ${path}:`, error);
        throw KycError.providerError("Unknown error occurred");
      }
    }
  }

  /**
   * Получение текущего статуса KYC пользователя
   * @param userId - Идентификатор пользователя (cognitoId)
   * @returns Текущий статус верификации
   */
  async getKycStatus(userId: string): Promise<KycStatus> {
    const user = await prisma.user.findUniqueOrThrow({
      where: { cognitoId: userId },
      select: { kycStatus: true },
    });
    return user.kycStatus;
  }

  /**
   * Инициализация процесса верификации через Persona
   * @param userId - Идентификатор пользователя (cognitoId)
   * @returns ID верификации для прохождения KYC
   */
  async initiateVerification(userId: string): Promise<{ inquiryId: string; sessionId?: string }> {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { cognitoId: userId },
      });

      // Если KYC уже завершен, выбрасываем ошибку
      if (user.kycStatus === KycStatus.COMPLETED) {
        throw KycError.alreadyVerified();
      }

      let inquiryIdToReturn = user.kycProviderId;
      let sessionId: string | undefined;

      // Если есть активный запрос
      if (user.kycStatus === KycStatus.PENDING && user.kycProviderId) {
        try {
          const { status: personaInquiryStatus } = await this.getInquiryData(user.kycProviderId);

          switch (personaInquiryStatus) {
            case PersonaInquiryStatus.COMPLETED:
            case PersonaInquiryStatus.APPROVED:
              // Если Persona говорит, что COMPLETED/APPROVED, но у нас PENDING, синхронизируем
              await tx.user.update({
                where: { cognitoId: user.cognitoId },
                data: {
                  kycStatus: KycStatus.COMPLETED,
                  kycCompletedAt: new Date(),
                },
              });
              // Возвращаем ошибку или специальный ответ, что уже верифицирован
              throw KycError.alreadyVerified();
            case PersonaInquiryStatus.DECLINED:
            case PersonaInquiryStatus.FAILED:
            case PersonaInquiryStatus.EXPIRED:
              await tx.user.update({
                where: { cognitoId: user.cognitoId },
                data: {
                  kycStatus: KycStatus.REJECTED,
                  kycProviderId: null,
                  kycCompletedAt: null,
                },
              });
              break;
            case PersonaInquiryStatus.CREATED:
            case PersonaInquiryStatus.PENDING:
              // Если Persona говорит, что PENDING, то получаем session_id
              const { sessionId: currentSessionId } = await this.getInquirySessionKey(user.kycProviderId);
              sessionId = currentSessionId;
              break;
            default:
              break;
          }
        } catch (error) {
          console.warn(`Failed to get status for existing inquiryId ${user.kycProviderId}:`, error);
          inquiryIdToReturn = null;
        }
      }
      if (!inquiryIdToReturn) {
        const inquiry = await this.createPersonaInquiry(user);
        inquiryIdToReturn = inquiry.id;
        const { sessionId: newSessionId } = await this.getInquirySessionKey(inquiry.id);
        sessionId = newSessionId;

        await tx.user.update({
          where: { cognitoId: user.cognitoId },
          data: {
            kycStatus: KycStatus.PENDING,
            kycProviderId: inquiry.id,
            kycCompletedAt: null, // Убедиться, что сброшено
          },
        });
      }

      return { inquiryId: inquiryIdToReturn, sessionId };
    });
  }

  /**
   * Создание запроса на верификацию в Persona
   */
  private async createPersonaInquiry(user: User): Promise<{ id: string }> {
    const response = await this._callPersonaApi<{ data: { id: string } }>("post", "inquiries", {
      data: {
        attributes: {
          "inquiry-template-id": this.personaTemplateId,
          "reference-id": user.cognitoId,
          fields: {
            "email-address": user.email,
          },
        },
      },
    });

    return { id: response.data.id };
  }

  /**
   * Обработка вебхука от Persona с результатом верификации
   * @param verificationId - Идентификатор верификации
   * @param status - Статус верификации (approved/declined)
   */
  async handleWebhook(verificationId: string, status: "approved" | "declined"): Promise<void> {
    const user = await prisma.user.findFirst({
      where: { kycProviderId: verificationId },
    });

    if (!user) {
      console.warn(`Webhook received for unknown verificationId: ${verificationId}`);
      throw KycError.verificationNotFound();
    }

    const newStatus = status === "approved" ? KycStatus.COMPLETED : KycStatus.REJECTED;

    if (user.kycStatus !== newStatus) {
      await prisma.user.update({
        where: { cognitoId: user.cognitoId },
        data: {
          kycStatus: newStatus,
          kycCompletedAt: newStatus === KycStatus.COMPLETED ? new Date() : null,
        },
      });
      console.log(`KYC ${status} for user ${user.cognitoId}, status updated to ${newStatus}`);
    } else {
      console.log(
        `KYC webhook for user ${user.cognitoId} with status ${status}, status already ${newStatus}. No update needed.`,
      );
    }
  }

  async getInquiryData(inquiryId: string): Promise<{ status: PersonaInquiryStatus }> {
    const { data } = await this._callPersonaApi<{
      data: {
        attributes: {
          status: PersonaInquiryStatus;
        };
        id: string;
      };
    }>("get", `inquiries/${inquiryId}`);

    return {
      status: data.attributes.status as PersonaInquiryStatus,
    };
  }

  private async getInquirySessionKey(inquiryId: string): Promise<{ sessionId: string }> {
    const response = await this._callPersonaApi<{ data: { attributes: { session_id: string } } }>(
      "post",
      `inquiries/${inquiryId}/resume`,
      {},
    );

    return {
      sessionId: response.data.attributes.session_id,
    };
  }

  async handleInquiryStatusUpdate(inquiryId: string) {
    const { status } = await this.getInquiryData(inquiryId);
    return await this.handleInquiryStatus(status, inquiryId);
  }

  async handleInquiryStatus(inquiryStatus: PersonaInquiryStatus, inquiryId: string): Promise<InquiryStatusResponse> {
    switch (inquiryStatus) {
      case PersonaInquiryStatus.CREATED:
      case PersonaInquiryStatus.PENDING:
        return {
          status: PersonaInquiryStatus.PENDING,
        };
      case PersonaInquiryStatus.COMPLETED:
      case PersonaInquiryStatus.APPROVED:
        return {
          status: PersonaInquiryStatus.APPROVED,
        };
      case PersonaInquiryStatus.DECLINED:
      case PersonaInquiryStatus.FAILED:
      case PersonaInquiryStatus.EXPIRED:
        return {
          status: PersonaInquiryStatus.DECLINED,
        };
      default:
        throw KycError.providerError("Unknown inquiry status");
    }
  }

  /**
   * Получение детальной информации о KYC пользователя
   * @param userId - Идентификатор пользователя (cognitoId)
   * @returns Детальная информация о KYC
   */
  async getKycDetails(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { cognitoId: userId },
      select: {
        kycStatus: true,
        kycProviderId: true,
        kycCompletedAt: true,
        walletAddress: true, // Добавляем адрес кошелька
      },
    });

    return {
      status: user.kycStatus,
      verificationId: user.kycProviderId,
      completedAt: user.kycCompletedAt,
      walletEnabled: user.kycStatus === KycStatus.COMPLETED,
      walletAddress: user.walletAddress,
    };
  }

  /**
   * Проверка возможности выполнения операций (требует завершенного KYC)
   * @param userId - Идентификатор пользователя (cognitoId)
   * @returns true если KYC завершен
   */
  async canPerformOperations(userId: string): Promise<boolean> {
    const status = await this.getKycStatus(userId);
    return status === KycStatus.COMPLETED;
  }
}
