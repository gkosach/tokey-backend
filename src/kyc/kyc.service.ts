import { KycStatus, User } from "@prisma/client";
import axios from "axios";
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
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: { kycStatus: true },
    });

    if (!user) throw KycError.userNotFound();
    return user.kycStatus;
  }

  /**
   * Инициализация процесса верификации через Persona
   * @param userId - Идентификатор пользователя
   * @returns URL для прохождения верификации
   */
  async initiateVerification(userId: string): Promise<string> {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { cognitoId: userId } });
      if (!user) throw KycError.userNotFound();

      if (user.kycStatus !== KycStatus.NOT_STARTED) {
        throw KycError.verificationInProgress();
      }

      const verification = await this.createPersonaVerification(user);

      await tx.user.update({
        where: { id: userId },
        data: {
          kycStatus: KycStatus.PENDING,
          kycVerificationId: verification.id,
        },
      });

      return verification.url;
    });
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
        where: { id: user.id },
        data: {
          kycStatus: newStatus,
          kycVerifiedAt: newStatus === KycStatus.VERIFIED ? new Date() : null,
        },
      }),
      prisma.wallet.updateMany({
        where: { userId: user.id },
        data: { whitelisted: newStatus === KycStatus.VERIFIED },
      }),
    ]);
  }

  /**
   * Создание запроса верификации в API Persona
   * @param user - Данные пользователя
   * @returns Ответ от Persona с ID и URL верификации
   */
  private async createPersonaVerification(user: User): Promise<{ id: string; url: string }> {
    try {
      const response = await axios.post(
        "https://withpersona.com/api/v1/inquiries",
        {
          data: {
            type: "inquiry",
            attributes: {
              templateId: this.personaTemplateId,
              referenceId: user.id,
              user: {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
              },
            },
          },
        },
        {
          headers: {
            "Persona-Version": "2023-01-01",
            Authorization: `Bearer ${this.personaApiKey}`,
          },
        },
      );

      return {
        id: response.data.data.id,
        url: response.data.data.attributes.verificationUrl,
      };
    } catch (error) {
      console.error("Persona API error:", error);
      throw KycError.providerError();
    }
  }
}
