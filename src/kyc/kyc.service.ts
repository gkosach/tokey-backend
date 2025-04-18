import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { KycError } from "./contract/error/kyc.error";
import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { KycErrorMessages } from "../common/enum/error/kyc-error.enum";
import { KYCStatus } from "@prisma/client";
import { PERSONA_BASE_URI } from "../common";

const prisma = new PrismaClient();

export class KycService {
  /**
   * Создает сессию верификации в Persona и обновляет статус пользователя
   * @param userId - Cognito ID пользователя
   * @param userType - Тип пользователя (инвестор/менеджер)
   * @returns URL для перенаправления на верификацию
   */
  async createSession(userId: string, userType: "investor" | "manager") {
    try {
      const response = await axios.post(
        `${PERSONA_BASE_URI}/api/v1/inquiries`,
        {
          data: {
            type: "inquiry",
            attributes: {
              templateId: process.env.PERSONA_TEMPLATE_ID,
              referenceId: userId,
            },
          },
        },
        {
          headers: {
            "Persona-Version": "2023-01-01",
            Authorization: `Bearer ${process.env.PERSONA_API_KEY}`,
          },
        },
      );

      const updateData = {
        kycStatus: KYCStatus.Pending,
        verificationId: response.data.data.id,
      };

      if (userType === "investor") {
        await prisma.investor.update({ where: { cognitoId: userId }, data: updateData });
      } else {
        await prisma.manager.update({ where: { cognitoId: userId }, data: updateData });
      }

      return { verificationUrl: response.data.data.attributes.verificationUrl };
    } catch (error: any) {
      throw new KycError(ErrorStatus.InternalError, KycErrorMessages.KYC_SESSION_CREATION_FAILED, error.message);
    }
  }

  /**
   * Обрабатывает вебхук от Persona и обновляет статус верификации
   * @param payload - Данные от Persona
   */
  async handleWebhook(payload: any) {
    try {
      const verificationId = payload.data.id;
      const status = payload.data.attributes.status;

      // Поиск пользователя по verificationId
      const [investor, manager] = await Promise.all([
        prisma.investor.findUnique({ where: { verificationId } }),
        prisma.manager.findUnique({ where: { verificationId } }),
      ]);

      const updateData = {
        kycStatus: status === "completed" ? KYCStatus.Approved : KYCStatus.Rejected,
        kycApprovedAt: status === "completed" ? new Date() : null,
      };

      // Обновление данных в соответствующей таблице
      if (investor) {
        await prisma.investor.update({ where: { id: investor.id }, data: updateData });
      } else if (manager) {
        await prisma.manager.update({ where: { id: manager.id }, data: updateData });
      } else {
        throw new KycError(ErrorStatus.NotFound, KycErrorMessages.KYC_SESSION_NOT_FOUND);
      }
    } catch (error: any) {
      throw new KycError(ErrorStatus.InternalError, KycErrorMessages.KYC_WEBHOOK_PROCESSING_FAILED, error.message);
    }
  }
}
