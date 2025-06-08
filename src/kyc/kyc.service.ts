import { KycStatus, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { prisma } from "../common";
import { KycError } from "./contract/error/kyc.error";

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

  /**
   * Получение текущего статуса KYC пользователя
   * @param userId - Идентификатор пользователя
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
   * Получение текущего идентификатора сессии верификации
   * @param verificationId - Идентификатор верификации
   * @returns Ключ сессии верификации
   */
  async getSessionToken(verificationId: string): Promise<{ sessionToken: string }> {
    try {
      const response = await axios.post(
        `https://api.withpersona.com/api/v1/inquiries/${verificationId}/resume`,
        {},
        {
          headers: {
            "Persona-Version": "2023-01-05",
            Authorization: `Bearer ${this.personaApiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      return { sessionToken: response.data.meta["session-token"] };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Persona API error:", error.response?.data);
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw KycError.providerError();
    }
  }

  /**
   * Инициализация процесса верификации через Persona
   * @param userId - Идентификатор пользователя
   * @returns URL для прохождения верификации
   */
  async initiateVerification(userId: string): Promise<{ inquiryId: string; sessionToken?: string }> {
    return prisma.$transaction(async (tx) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { cognitoId: userId },
      });

      if (user.kycStatus === KycStatus.PENDING) {
        const { sessionToken } = await this.getSessionToken(user.kycVerificationId!);

        return { inquiryId: user.kycVerificationId!, sessionToken };
      }

      if (user.kycStatus !== KycStatus.NOT_STARTED) {
        throw KycError.verificationInProgress();
      }

      const inquiry = await this.createPersonaInquiry(user);

      await tx.user.update({
        where: { cognitoId: user.cognitoId },
        data: {
          kycStatus: KycStatus.PENDING,
          kycVerificationId: inquiry.id,
        },
      });

      return { inquiryId: inquiry.id };
    });
  }

  private async createPersonaInquiry(user: User): Promise<{ id: string }> {
    try {
      const response = await axios.post(
        "https://api.withpersona.com/api/v1/inquiries",
        {
          data: {
            attributes: {
              "inquiry-template-id": this.personaTemplateId,
              "reference-id": user.cognitoId,
              fields: {
                "email-address": user.email,
                "phone-number": user.phoneNumber,
              },
            },
          },
        },
        {
          headers: {
            "Persona-Version": "2023-01-05",
            Authorization: `Bearer ${this.personaApiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      return { id: response.data.data.id };
    } catch (error) {
      // 2. Проверяем тип ошибки
      if (error instanceof AxiosError) {
        console.error("Persona API error:", error.response?.data);
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw KycError.providerError();
    }
  }

  /**
   * Обработка вебхука от Persona с результатом верификации
   * @param verificationId - Идентификатор верификации
   * @param status - Статус верификации (approved/declined)
   */
  async handleWebhook(verificationId: string, status: "approved" | "declined"): Promise<void> {
    const user = await prisma.user.findFirst({
      where: { kycVerificationId: verificationId },
    });
    if (!user) throw KycError.verificationNotFound();

    const newStatus = status === "approved" ? KycStatus.VERIFIED : KycStatus.FAILED; // Используем FAILED вместо NOT_STARTED

    await prisma.$transaction([
      prisma.user.update({
        where: { cognitoId: user.cognitoId },
        data: {
          kycStatus: newStatus,
          kycVerifiedAt: newStatus === KycStatus.VERIFIED ? new Date() : null,
        },
      }),
      prisma.wallet.updateMany({
        where: { userId: user.cognitoId },
        data: { whitelisted: newStatus === KycStatus.VERIFIED },
      }),
    ]);
  }
}
