import { KycStatus } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { PERSONA_BASE_URI } from "../../constants";
import { HttpError } from "../../error";

export class PersonaProvider {
  private readonly apiKey: string;
  private readonly templateId: string;

  constructor() {
    this.apiKey = process.env.PERSONA_API_KEY!;
    this.templateId = process.env.PERSONA_TEMPLATE_ID!;
    if (!this.apiKey || !this.templateId) {
      throw new Error("Persona API key or template ID not configured");
    }
  }

  /**
   * Инициирует верификацию в Persona
   * @param userId - ID пользователя в вашей системе
   * @param userEmail - Email пользователя
   * @returns Данные для верификации: inquiryId и sessionToken
   */
  async initiateVerification(
    userId: string,
    userEmail: string,
  ): Promise<{
    inquiryId: string;
    sessionToken?: string;
  }> {
    try {
      const response = await axios.post(
        `${PERSONA_BASE_URI}/inquiries`,
        {
          data: {
            attributes: {
              "template-id": this.templateId,
              "reference-id": userId,
              fields: { "email-address": userEmail },
            },
          },
        },
        { headers: this.getHeaders() },
      );

      if (response.status !== 201 || !response.data?.data?.id) {
        throw new HttpError("Persona initiation failed", 500);
      }

      return {
        inquiryId: response.data.data.id,
        sessionToken: response.data.data.attributes?.session_token,
      };
    } catch (error) {
      this.handlePersonaError(error, "initiateVerification");
    }
  }

  /**
   * Обрабатывает вебхук от Persona
   * @param payload - Данные вебхука
   * @returns Статус KYC
   */
  async handleWebhook(payload: any): Promise<KycStatus> {
    try {
      const inquiryId = this.extractInquiryId(payload);
      const inquiry = await this.getInquiryDetails(inquiryId);
      return this.mapPersonaStatus(inquiry.attributes.status);
    } catch (error) {
      this.handlePersonaError(error, "handleWebhook");
    }
  }

  /**
   * Получает детали инквизи из Persona
   * @param inquiryId - ID инквизи в Persona
   * @returns Данные инквизи
   */
  private async getInquiryDetails(inquiryId: string): Promise<any> {
    try {
      const response = await axios.get(`${PERSONA_BASE_URI}/inquiries/${inquiryId}`, { headers: this.getHeaders() });
      return response.data.data;
    } catch (error) {
      this.handlePersonaError(error, "getInquiryDetails");
    }
  }

  /**
   * Извлекает ID инквизи из вебхука
   * @param payload - Данные вебхука
   * @returns ID инквизи
   * @throws HttpError при отсутствии ID
   */
  private extractInquiryId(payload: any): string {
    const inquiryId = payload.data?.relationships?.inquiry?.data?.id;
    if (!inquiryId) {
      throw new HttpError("Missing inquiryId in webhook payload", 400);
    }
    return inquiryId;
  }

  /**
   * Маппит статус Persona в KycStatus
   * @param personaStatus - Статус из Persona
   * @returns Соответствующий KycStatus
   */
  private mapPersonaStatus(personaStatus: string): KycStatus {
    const mapping: Record<string, KycStatus> = {
      pending: KycStatus.CREATED,
      completed: KycStatus.COMPLETED,
      approved: KycStatus.APPROVED,
      declined: KycStatus.DECLINED,
    };

    const status = mapping[personaStatus.toLowerCase()];
    return status || KycStatus.CREATED;
  }

  /**
   * Генерирует заголовки для запросов к Persona
   * @returns Объект с заголовками
   */
  private getHeaders() {
    return {
      "Persona-Version": "2023-01-05",
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Обрабатывает ошибки Persona API
   * @param error - Ошибка
   * @param context - Контекст вызова
   * @throws HttpError с детализированным сообщением
   */
  private handlePersonaError(error: unknown, context: string): never {
    if (error instanceof AxiosError) {
      const message = `Persona API error in ${context}: ${error.message}`;
      const status = error.response?.status || 500;
      throw new HttpError(message, status);
    }

    if (error instanceof HttpError) throw error;

    throw new HttpError(`Unknown error in ${context}`, 500);
  }
}
