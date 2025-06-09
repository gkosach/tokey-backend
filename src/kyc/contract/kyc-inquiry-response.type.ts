import { KycInquiryStatus } from "./kyc-inquiry-status.enum";

export type KycInquiryResponse =
  | {
      status: KycInquiryStatus.APPROVED;
    }
  | { status: KycInquiryStatus.DECLINED }
  | {
      status: KycInquiryStatus.PENDING;
      sessionId: string;
    };
