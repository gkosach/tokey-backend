import { KycInquiryStatus } from "../enum/kyc-inquiry-status.enum";

export type KycInquiryResponse =
  | {
      status: KycInquiryStatus.APPROVED;
    }
  | { status: KycInquiryStatus.DECLINED }
  | {
      status: KycInquiryStatus.PENDING;
      sessionId: string;
    };
