import { KycStatus, User } from "@prisma/client";
import axios from "axios";
import { HttpError } from "../common";
import { UserService } from "../user/user.service";
import { WalletService } from "../wallet/wallet.service";

/**
 * Сервис для управления процессом верификации пользователей (KYC)
 *
 * ОТВЕТСТВЕННОСТЬ:
 * - Интеграция с Persona API для проведения верификации
 * - Бизнес-логика KYC процесса и принятие решений
 * - Обработка webhook'ов от KYC провайдера
 * - Определение правил и ограничений для KYC операций
 *
 * ГРАНИЦЫ:
 * ✅ Запуск процесса верификации в Persona
 * ✅ Обработка статусов и событий от Persona
 * ✅ Проверка бизнес-правил (можно ли начать KYC, одобрен ли KYC)
 * ✅ Получение детальной информации о верификации
 * ❌ Прямая работа с базой данных (только через UserService)
 * ❌ CRUD операции с пользователями
 *
 * ЗАВИСИМОСТИ:
 * - UserService для получения и обновления данных пользователей
 * - Persona API для проведения верификации
 */
export class KycService {
  private readonly personaApiKey: string;
  private readonly personaTemplateId: string;
  private readonly userService: UserService;

  constructor() {
    this.personaApiKey = process.env.PERSONA_API_KEY!;
    this.personaTemplateId = process.env.PERSONA_TEMPLATE_ID!;
    this.userService = new UserService();
  }

  /**
   * Получение текущего статуса KYC пользователя
   */
  async getKycStatus(cognitoId: string): Promise<{ status: KycStatus | null; canStart: boolean }> {
    const user = await this.userService.getUserByCognitoId(cognitoId);

    return {
      status: user.kycStatus,
      canStart: user.kycStatus === null,
    };
  }

  /**
   * Инициализация процесса верификации через Persona
   */
  async initiateVerification(cognitoId: string): Promise<{ inquiryId: string; sessionToken: string }> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    if (user.kycStatus === KycStatus.APPROVED) {
      throw new HttpError("User is already verified", 409);
    }

    if (user.kycStatus === KycStatus.DECLINED) {
      throw new HttpError("KYC already rejected", 409);
    }

    if (user.kycStatus === KycStatus.CREATED && user.kycProviderId) {
      const sessionToken = await this.getInquirySessionToken(user.kycProviderId);
      return { inquiryId: user.kycProviderId, sessionToken };
    }
    const inquiry = await this.createPersonaInquiry(user);
    const sessionToken = await this.getInquirySessionToken(inquiry.id);

    await this.userService.updateKycStatusByCognitoId(cognitoId, KycStatus.CREATED, inquiry.id);

    return { inquiryId: inquiry.id, sessionToken };
  }

  /**
   * Обработка webhook от Persona
   */
  async handleWebhook(inquiryId: string, eventName: string): Promise<void> {
    const user = await this.userService.getUserByKycProviderId(inquiryId);
    if (!user) {
      throw new HttpError("Verification not found", 404);
    }

    const newStatus = this.mapPersonaStatusToKycStatus(eventName);
    await this.userService.updateKycStatusByCognitoId(user.cognitoId, newStatus);

    if (newStatus === KycStatus.APPROVED) {
      await this.triggerWalletCreation(user.cognitoId);
    }
  }

  /**
   * Проверка бизнес-правил KYC
   */
  async canStartKyc(cognitoId: string): Promise<boolean> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return user.kycStatus === null;
  }

  async isKycApproved(cognitoId: string): Promise<boolean> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return user.kycStatus === KycStatus.APPROVED;
  }

  /**
   * Получение детальной информации о KYC
   */
  async getKycDetails(cognitoId: string) {
    const user = await this.userService.getUserByCognitoId(cognitoId);

    return {
      status: user.kycStatus,
      verificationId: user.kycProviderId,
      completedAt: user.kycCompletedAt,
      canCreateWallet: user.kycStatus === KycStatus.APPROVED,
    };
  }

  /**
   * Проверка возможности создания кошелька
   */
  async canCreateWallet(cognitoId: string): Promise<boolean> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return user.kycStatus === KycStatus.APPROVED;
  }

  /**
   * Проверка возможности выполнения операций
   */
  async canPerformOperations(cognitoId: string): Promise<boolean> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return user.kycStatus === KycStatus.APPROVED;
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

      if (!response?.data) {
        throw new HttpError("Invalid response from Persona API", 500);
      }
      return response.data;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        throw new HttpError(`Persona API error: ${error.response?.status} - ${message}`, 500);
      }

      const message = error instanceof Error ? error.message : "Unknown error";
      throw new HttpError(`Persona API error: ${message}`, 500);
    }
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

    if (!response?.data?.id) {
      throw new HttpError("Invalid response from Persona API: missing inquiry ID", 500);
    }

    return { id: response.data.id };
  }

  // TODO: если не используется удалить
  async getInquiryData(inquiryId: string): Promise<{ status: string }> {
    const { data } = await this._callPersonaApi<{
      data: {
        attributes: {
          status: string;
        };
        id: string;
      };
    }>("get", `inquiries/${inquiryId}`);

    return {
      status: data.attributes.status,
    };
  }

  private async getInquirySessionToken(inquiryId: string): Promise<string> {
    const response = await this._callPersonaApi<{ meta: { "session-token": string } }>(
      "post",
      `inquiries/${inquiryId}/resume`,
    );

    return response.meta["session-token"];
  }

  private mapPersonaStatusToKycStatus(eventName: string): KycStatus {
    switch (eventName) {
      case "inquiry.created":
        return KycStatus.CREATED;
      case "inquiry.completed":
        return KycStatus.COMPLETED;
      case "inquiry.approved":
        return KycStatus.APPROVED;
      case "inquiry.declined":
        return KycStatus.DECLINED;
      default:
        throw new HttpError(`Unknown Persona status: ${eventName}`, 500);
    }
  }
  /**
   * Триггерит создание кошелька для одобренного пользователя
   * Это бизнес-логика KYC процесса
   */
  private async triggerWalletCreation(cognitoId: string): Promise<void> {
    try {
      const walletService = new WalletService();
      const user = await this.userService.getUserByCognitoId(cognitoId);
      const hasWallet = await walletService.hasWallet(user.id);

      if (!hasWallet) {
        await walletService.createWalletForUser(user.id);
        console.log(`✅ Wallet auto-created for approved user: ${cognitoId}`);
      } else {
        console.log(`⏭️ User ${cognitoId} already has wallet`);
      }
    } catch (error) {
      console.error(`❌ Failed to auto-create wallet for ${cognitoId}:`, error);
    }
  }
}
