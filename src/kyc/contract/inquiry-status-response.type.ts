import { PersonaInquiryStatus } from "./persona-inquiry-status.enum";

export type InquiryStatusResponse = {
  status: PersonaInquiryStatus.APPROVED | PersonaInquiryStatus.DECLINED | PersonaInquiryStatus.PENDING;
};
