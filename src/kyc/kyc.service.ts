import { KycStatus, User } from "@prisma/client";
import axios from "axios";
import { prisma } from "../common";
import { KycError } from "./contract/error/kyc.error";

/**
 * Сервис для управления процессом KYC (Know Your Customer)
 */
export class KycService {
  private readonly personaApiKey: string;
  private readonly personaTemplateId: string;

  constructor() {
    this.personaApiKey = process.env.PERSONA_API_KEY!;
    this.personaTemplateId = process.env.PERSONA_TEMPLATE_ID!;
  }

  async getKycStatus(userId: string): Promise<KycStatus> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { kycStatus: true },
    });

    if (!user) throw KycError.userNotFound();
    return user.kycStatus;
  }

  async initiateVerification(userId: string): Promise<string> {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
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

  async handleWebhook(verificationId: string, status: "approved" | "declined"): Promise<void> {
    const user = await prisma.user.findFirst({
      where: { kycVerificationId: verificationId },
    });

    if (!user) throw KycError.verificationNotFound();

    const newStatus = status === "approved" ? KycStatus.VERIFIED : KycStatus.NOT_STARTED;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        kycStatus: newStatus,
        kycVerifiedAt: newStatus === KycStatus.VERIFIED ? new Date() : null,
      },
    });
  }

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
    } catch {
      throw KycError.providerError();
    }
  }
}
