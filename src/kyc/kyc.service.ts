import { KycStatus, User } from "@prisma/client";
import { HttpError, PersonaProvider } from "../common";
import { UserService } from "../user/user.service";

export class KycService {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly personaProvider: PersonaProvider = new PersonaProvider(),
  ) {}

  async getKycStatus(cognitoId: string): Promise<{
    status: KycStatus | null;
    canStart: boolean;
  }> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return {
      status: user.kycStatus,
      canStart: this.canStartKyc(user),
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
  }

  async getKycDetails(cognitoId: string) {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return {
      status: user.kycStatus,
      verificationId: user.kycProviderId,
      completedAt: user.kycCompletedAt,
    };
  }

  async isKycApproved(cognitoId: string): Promise<boolean> {
    const user = await this.userService.getUserByCognitoId(cognitoId);
    return user.kycStatus === KycStatus.APPROVED;
  }

  private canStartKyc(user: User): boolean {
    return !user.kycStatus || user.kycStatus === KycStatus.DECLINED || user.kycStatus === KycStatus.CREATED;
  }

  private validateKycStart(user: User) {
    if (user.kycStatus === KycStatus.APPROVED) {
      throw new HttpError("User is already verified", 409);
    }
    if (user.kycStatus === KycStatus.COMPLETED) {
      throw new HttpError("KYC is in progress", 409);
    }
  }

  private extractInquiryId(payload: any): string {
    const inquiryId = payload.data?.relationships?.inquiry?.data?.id;
    if (!inquiryId) throw new HttpError("Missing inquiryId", 400);
    return inquiryId;
  }
}
