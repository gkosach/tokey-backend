export default {
  openapi: "3.0.0",
  info: {
    title: "Real Estate Tokenization API",
    version: "1.0.0",
    description: "API for tokenizing real estate properties",
  },
  servers: [
    { url: "http://localhost:3002", description: "Local server" },
    { url: "https://api.trytokey.com", description: "Production server" },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          cognitoId: { type: "string" },
          email: { type: "string" },
          referralLink: { type: "string", nullable: true },
          kycStatus: {
            type: "string",
            enum: ["CREATED", "COMPLETED", "APPROVED", "DECLINED"],
            nullable: true,
          },
          kycProviderId: { type: "string", nullable: true },
          kycCompletedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      KycDetails: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["CREATED", "COMPLETED", "APPROVED", "DECLINED"],
            nullable: true,
            description: "Current KYC verification status",
          },
          verificationId: {
            type: "string",
            nullable: true,
            description: "ID from KYC provider",
          },
          completedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            description: "Timestamp when KYC was completed",
          },
          canStart: {
            type: "boolean",
            description: "Whether user can start new KYC verification",
          },
        },
      },
      Property: {
        type: "object",
        properties: {
          id: { type: "string" },
          contractAddress: { type: "string" },
          title: { type: "string" },
          status: {
            type: "string",
            enum: ["COMING_SOON", "ACTIVE", "SOLD_OUT", "COMPLETED"],
          },
          createdAt: { type: "string", format: "date-time" },
          description: { type: "string", nullable: true },
          address: { type: "string", nullable: true },
          media: { type: "object", nullable: true },
          tiers: {
            type: "array",
            items: {
              $ref: "#/components/schemas/PropertyTier",
            },
          },
        },
      },
      PropertyTier: {
        type: "object",
        properties: {
          id: { type: "string" },
          propertyId: { type: "string" },
          type: {
            type: "string",
            enum: ["PLATINUM", "RUBY", "DIAMOND"],
          },
          price: { type: "number" },
          totalSupply: { type: "integer" },
          benefits: { type: "object", nullable: true },
        },
      },
      TokenTransaction: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          tierId: { type: "string" },
          tokensAmount: { type: "integer" },
          userAddress: { type: "string" },
          contractAddress: { type: "string" },
          txHash: { type: "string" },
          paymentAmount: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      TokenBalance: {
        type: "object",
        properties: {
          tier: { $ref: "#/components/schemas/PropertyTier" },
          property: { $ref: "#/components/schemas/Property" },
          totalTokens: { type: "number" },
          transactions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                tokensAmount: { type: "number" },
                createdAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
  },
  security: [{ BearerAuth: [] }],
};
