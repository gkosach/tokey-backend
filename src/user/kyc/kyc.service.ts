import { KycStatus, User } from "@prisma/client";
import { HttpError, PersonaProvider } from "../../common";
import { WalletService } from "../../wallet/wallet.service";
import { UserService } from "../user.service";

export class KycService {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly personaProvider: PersonaProvider = new PersonaProvider(),
    private readonly walletService: WalletService = new WalletService(),
  ) {}

  async getKycStatus(cognitoId: string): Promise<{
    status: KycStatus | null;
    canStart: boolean;
  }> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return {
      status: user.kycStatus,
      canStart: this.canStartKyc(user), // Используем существующий приватный метод
    };
  }

  async initiateVerification(cognitoId: string) {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    this.validateKycStart(user);

    const { inquiryId, sessionToken } = await this.personaProvider.initiateVerification(user.id, user.email);
    await this.userService.updateKycStatus(cognitoId, KycStatus.CREATED, inquiryId);

    return { inquiryId, sessionToken };
  }

  async handleWebhook(payload: any) {
    const status = await this.personaProvider.handleWebhook(payload);
    const inquiryId = this.extractInquiryId(payload);
    const user = await this.userService.getUserByKycProviderId(inquiryId);
    if (!user) {
      throw new HttpError(`User not found for inquiryId: ${inquiryId}`, 404);
    }

    await this.userService.updateKycStatus(user.cognitoId, status, user.kycProviderId || undefined);

    if (status === KycStatus.APPROVED) {
      await this.triggerWalletCreation(user.cognitoId);
    }
  }

  async getKycDetails(cognitoId: string) {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return {
      status: user.kycStatus,
      verificationId: user.kycProviderId,
      completedAt: user.kycCompletedAt,
      walletEnabled: user.kycStatus === KycStatus.APPROVED,
    };
  }

  // Убрали дублирующие методы, оставили только необходимые
  async isKycApproved(cognitoId: string): Promise<boolean> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return user.kycStatus === KycStatus.APPROVED;
  }

  private canStartKyc(user: User): boolean {
    return !user.kycStatus || user.kycStatus === KycStatus.DECLINED;
  }

  private validateKycStart(user: User) {
    if (user.kycStatus === KycStatus.APPROVED) {
      throw new HttpError("User is already verified", 409);
    }
    if (user.kycStatus === KycStatus.COMPLETED) {
      throw new HttpError("KYC is in progress", 409);
    }
  }

  private async triggerWalletCreation(cognitoId: string) {
    try {
      const user = await this.userService.getUserByCognitoId(cognitoId);
      if (!user) throw new HttpError(`User not found: ${cognitoId}`, 404);

      const wallet = await this.walletService.getWalletByUserId(user.id);
      if (!wallet) {
        await this.walletService.createWalletForUser(user.id);
        console.log(`✅ Wallet created for: ${cognitoId}`);
      }
    } catch (error) {
      console.error(`❌ Wallet creation failed: ${cognitoId}`, error);
      throw new HttpError("Wallet creation failed", 500);
    }
  }

  private extractInquiryId(payload: any): string {
    const inquiryId = payload.data?.relationships?.inquiry?.data?.id;
    if (!inquiryId) throw new HttpError("Missing inquiryId", 400);
    return inquiryId;
  }
}
