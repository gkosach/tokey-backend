import { KycStatus, User } from "@prisma/client";
import axios from "axios";
import { KycError, prisma } from "../common";
import { PersonaInquiryEvent } from "./contract/enum/persona-inquiry-event.enum";
import { PersonaInquiryStatus } from "./contract/enum/persona-inquiry-status.enum";

/**
 * Сервис для управления процессом верификации пользователей (KYC)
 */
export class KycService {
  private readonly personaApiKey: string;
  private readonly personaTemplateId: string;

  constructor() {
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
      if (!response || !response.data) {
        throw KycError.providerError("Persona API error: 400");
      }
      return response.data;
    } catch (error) {
      if (error && (error as any).isAxiosError) {
        const err: any = error;
        console.error(`Persona API error on ${method} ${path}:`, err.response?.data);
        throw KycError.providerError(`Persona API error: ${err.response?.status}`);
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
  async initiateVerification(userId: string): Promise<{ inquiryId: string; sessionToken?: string }> {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { cognitoId: userId },
      });

      // Если KYC уже завершен, выбрасываем ошибку
      if (user.kycStatus === KycStatus.APPROVED) {
        throw KycError.alreadyVerified();
      }

      if (user.kycStatus === KycStatus.REJECTED) {
        throw KycError.providerError("Persona API error: 400");
      }

      let inquiryIdToReturn = user.kycProviderId;
      let sessionToken: string | undefined;

      // Если есть активный запрос
      if (user.kycStatus === KycStatus.PENDING && user.kycProviderId) {
        try {
          const { status: personaInquiryStatus } = await this.getInquiryData(user.kycProviderId);

          switch (personaInquiryStatus) {
            case PersonaInquiryStatus.COMPLETED:
              await tx.user.update({
                where: { cognitoId: user.cognitoId },
                data: {
                  kycStatus: KycStatus.COMPLETED,
                },
              });
              break;
            case PersonaInquiryStatus.APPROVED:
              // Если Persona говорит, что COMPLETED/APPROVED, но у нас PENDING, синхронизируем
              await tx.user.update({
                where: { cognitoId: user.cognitoId },
                data: {
                  kycStatus: KycStatus.APPROVED,
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
              const { sessionToken: currentSessionToken } = await this.getInquirySessionToken(user.kycProviderId);
              sessionToken = currentSessionToken;
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
        const { sessionToken: newSessionToken } = await this.getInquirySessionToken(inquiry.id);
        sessionToken = newSessionToken;

        await tx.user.update({
          where: { cognitoId: user.cognitoId },
          data: {
            kycStatus: KycStatus.PENDING,
            kycProviderId: inquiry.id,
            kycCompletedAt: null, // Убедиться, что сброшено
          },
        });
      }

      return { inquiryId: inquiryIdToReturn, sessionToken };
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

    if (!response || !response.data || !response.data.id) {
      throw KycError.providerError("Invalid response from Persona API: missing inquiry ID");
    }

    return { id: response.data.id };
  }

  /**
   * Обработка вебхука от Persona с результатом верификации
   * @param verificationId - Идентификатор верификации
   * @param eventName - Статус верификации (approved/declined)
   */
  async handleWebhook(verificationId: string, eventName: PersonaInquiryEvent): Promise<void> {
    const user = await prisma.user.findFirst({
      where: { kycProviderId: verificationId },
    });

    if (!user) {
      console.warn(`Webhook received for unknown verificationId: ${verificationId}`);
      throw KycError.verificationNotFound();
    }

    const { status: newStatus } = this.inquiryEventToKycStatus(eventName);

    if (user.kycStatus !== newStatus) {
      await prisma.user.update({
        where: { cognitoId: user.cognitoId },
        data: {
          kycStatus: newStatus,
          kycCompletedAt: newStatus === KycStatus.COMPLETED ? new Date() : null,
        },
      });
      console.log(`KYC ${eventName} for user ${user.cognitoId}, status updated to ${newStatus}`);
    } else {
      console.log(
        `KYC webhook for user ${user.cognitoId} with status ${eventName}, status already ${newStatus}. No update needed.`,
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

  private async getInquirySessionToken(inquiryId: string): Promise<{ sessionToken: string }> {
    const response = await this._callPersonaApi<{ meta: { "session-token": string } }>(
      "post",
      `inquiries/${inquiryId}/resume`,
    );

    console.log(response.meta["session-token"]);

    return {
      sessionToken: response.meta["session-token"],
    };
  }

  private inquiryEventToKycStatus(eventName: PersonaInquiryEvent) {
    switch (eventName) {
      case PersonaInquiryEvent.CREATED:
      case PersonaInquiryEvent.COMPLETED:
        return {
          status: KycStatus.PENDING,
        };
      case PersonaInquiryEvent.APPROVED:
        return {
          status: KycStatus.COMPLETED,
        };
      case PersonaInquiryEvent.DECLINED:
      case PersonaInquiryEvent.FAILED:
      case PersonaInquiryEvent.EXPIRED:
        return {
          status: KycStatus.REJECTED,
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
      },
    });

    return {
      status: user.kycStatus,
      verificationId: user.kycProviderId,
      completedAt: user.kycCompletedAt,
      walletEnabled: user.kycStatus === KycStatus.COMPLETED,
    };
  }

  /**
   * Проверка возможности создания кошелька
   */
  async canCreateWallet(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: { kycStatus: true },
    });

    if (!user) {
      return false;
    }

    return user.kycStatus === KycStatus.COMPLETED;
  }

  /**
   * Проверка возможности выполнения операций (требует завершенного KYC)
   */
  async canPerformOperations(cognitoId: string): Promise<boolean> {
    const user = await prisma.user.findUniqueOrThrow({
      where: { cognitoId },
      select: { kycStatus: true },
    });

    return user.kycStatus === KycStatus.COMPLETED;
  }
}
