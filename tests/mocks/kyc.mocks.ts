import { KycStatus } from "@prisma/client";

export const mockKycUsers = {
  kycPending: {
    id: "user-123",
    cognitoId: "cognito-123",
    email: "test@tokey.com",
    kycStatus: KycStatus.CREATED,
    kycProviderId: null,
  },
  kycApproved: {
    id: "user-456",
    cognitoId: "cognito-456",
    email: "verified@tokey.com",
    kycStatus: KycStatus.APPROVED,
    kycProviderId: "persona_123",
  },
};

export const mockWebhookPayload = {
  approved: {
    data: {
      attributes: { status: "approved" },
      relationships: {
        inquiry: {
          data: { id: "inquiry_123" },
        },
      },
    },
  },
  declined: {
    data: {
      attributes: { status: "declined" },
      relationships: {
        inquiry: {
          data: { id: "inquiry_123" },
        },
      },
    },
  },
};
