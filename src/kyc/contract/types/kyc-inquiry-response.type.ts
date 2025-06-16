import { PersonaInquiryStatus } from "../enum/persona-inquiry-status.enum";

export type KycInquiryResponse =
  | {
      status: PersonaInquiryStatus.APPROVED;
    }
  | { status: PersonaInquiryStatus.DECLINED }
  | {
      status: PersonaInquiryStatus.PENDING;
      sessionId: string;
    };
