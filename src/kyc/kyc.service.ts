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

      // Если уже есть активная верификация
      if (user.kycStatus === KycStatus.PENDING && user.kycProviderId) {
        return { inquiryId: user.kycProviderId };
      }

      // Если KYC уже завершен
      if (user.kycStatus === KycStatus.COMPLETED) {
        throw KycError.alreadyVerified();
      }

      // Создаем новую верификацию в Persona
      const inquiry = await this.createPersonaInquiry(user);

      // Обновляем статус пользователя
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
                // Убрали phone-number так как его нет в новой схеме
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

  /**
   * Обработка вебхука от Persona с результатом верификации
   * @param verificationId - Идентификатор верификации
   * @param status - Статус верификации (approved/declined)
   */
  async handleWebhook(verificationId: string, status: "approved" | "declined"): Promise<void> {
    const user = await prisma.user.findFirst({
      where: { kycProviderId: verificationId }, // Исправлено поле
    });

    if (!user) throw KycError.verificationNotFound();

    // Используем правильные статусы из новой схемы
    const newStatus = status === "approved" ? KycStatus.COMPLETED : KycStatus.REJECTED;

    // Убрали обновление wallet так как модели Wallet больше нет
    await prisma.user.update({
      where: { cognitoId: user.cognitoId },
      data: {
        kycStatus: newStatus,
        kycCompletedAt: newStatus === KycStatus.COMPLETED ? new Date() : null,
      },
    });

    console.log(`KYC ${status} for user ${user.cognitoId}, status updated to ${newStatus}`);
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
