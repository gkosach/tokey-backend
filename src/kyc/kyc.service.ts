import { KycStatus, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { KycError, prisma } from "../common";
import { KycInquiryResponse, KycInquiryStatus } from "./index";

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
  async initiateVerification(userId: string): Promise<{ inquiryId: string }> {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { cognitoId: userId },
      });
      if (user.kycStatus === KycStatus.PENDING && user.kycProviderId) {
        return { inquiryId: user.kycProviderId };
      }

      if (user.kycStatus === KycStatus.COMPLETED) {
        throw KycError.alreadyVerified();
      }
      const inquiry = await this.createPersonaInquiry(user);

      await tx.user.update({
        where: { cognitoId: user.cognitoId },
        data: {
          kycStatus: KycStatus.PENDING,
          kycProviderId: inquiry.id,
        },
      });

      return { inquiryId: inquiry.id };
    });
  }

  /**
   * Создание запроса на верификацию в Persona
   */
  private async createPersonaInquiry(user: User): Promise<{ id: string }> {
    const response = await axios.post(
      "https://api.withpersona.com/api/v1/inquiries",
      {
        data: {
          attributes: {
            "inquiry-template-id": this.personaTemplateId,
            "reference-id": user.cognitoId,
            fields: {
              "email-address": user.email,
            },
          },
        },
      },
      {
        headers: {
          "Persona-Version": "2023-01-05",
          Authorization: `Bearer ${this.personaApiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    return { id: response.data.data.id };
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

    if (!user) throw KycError.verificationNotFound();
    const newStatus = status === "approved" ? KycStatus.COMPLETED : KycStatus.REJECTED;

    await prisma.user.update({
      where: { cognitoId: user.cognitoId },
      data: {
        kycStatus: newStatus,
        kycCompletedAt: newStatus === KycStatus.COMPLETED ? new Date() : null,
      },
    });

    console.log(`KYC ${status} for user ${user.cognitoId}, status updated to ${newStatus}`);
  }

  async getInquiryData(inquiryId: string): Promise<{ status: KycInquiryStatus }> {
    try {
      const response = await axios.post(
        `https://api.withpersona.com/api/v1/inquiries/${inquiryId}`,
        {},
        {
          headers: {
            "Persona-Version": "2023-01-05",
            Authorization: `Bearer ${this.personaApiKey}`,
            "Content-Type": "application/json",
          },
        },
      );
      return {
        status: response.data.data.attributes.status as KycInquiryStatus,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Persona API error:", error.response?.data);
        throw KycError.providerError(`Persona API error: ${error.response?.status}`);
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
        throw KycError.providerError(`Unexpected error: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        throw KycError.providerError("Unknown error occurred");
      }
    }
  }

  private async getInquirySessionKey(inquiryId: string): Promise<{ sessionId: string }> {
    try {
      const response = await axios.post(
        `https://api.withpersona.com/api/v1/inquiries/${inquiryId}/resume`,
        {},
        {
          headers: {
            "Persona-Version": "2023-01-05",
            Authorization: `Bearer ${this.personaApiKey}`,
            "Content-Type": "application/json",
          },
        },
      );
      return {
        sessionId: response.data.data.attributes.session_id,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Persona API error:", error.response?.data);
        throw KycError.providerError(`Persona API error: ${error.response?.status}`);
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
        throw KycError.providerError(`Unexpected error: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        throw KycError.providerError("Unknown error occurred");
      }
    }
  }

  async handleInquiryStatusUpdate(inquiryId: string, userId: string) {
    const { status } = await this.getInquiryData(inquiryId);
    return await this.handleInquiryStatus(status, userId);
  }

  async handleInquiryStatus(inquiryStatus: KycInquiryStatus, userId: string): Promise<KycInquiryResponse> {
    switch (inquiryStatus) {
      case KycInquiryStatus.COMPLETED:
      case KycInquiryStatus.APPROVED:
        await prisma.user.update({
          where: { cognitoId: userId },
          data: {
            kycStatus: KycStatus.COMPLETED,
            kycCompletedAt: new Date(),
          },
        });
        return {
          status: KycInquiryStatus.APPROVED,
        };
      case KycInquiryStatus.CREATED:
      case KycInquiryStatus.PENDING:
      case KycInquiryStatus.EXPIRED:
        const { sessionId } = await this.getInquirySessionKey(inquiryStatus);
        return {
          status: KycInquiryStatus.PENDING,
          sessionId,
        };
      case KycInquiryStatus.DECLINED:
      case KycInquiryStatus.FAILED:
        await prisma.user.update({
          where: { cognitoId: userId },
          data: {
            kycStatus: KycStatus.REJECTED,
            kycCompletedAt: new Date(),
          },
        });
        return {
          status: KycInquiryStatus.DECLINED,
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
