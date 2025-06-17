import { PersonaInquiryStatus } from "../enum/persona-inquiry-status.enum";

export type InquiryStatusResponse = {
  status: PersonaInquiryStatus.APPROVED | PersonaInquiryStatus.DECLINED | PersonaInquiryStatus.PENDING;
};
