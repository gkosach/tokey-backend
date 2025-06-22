// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT

export enum KycStatus {
  CREATED = "CREATED",
  COMPLETED = "COMPLETED",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export enum PropertyStatus {
  COMING_SOON = "COMING_SOON",
  ACTIVE = "ACTIVE",
  SOLD_OUT = "SOLD_OUT",
  COMPLETED = "COMPLETED",
}

export interface User {
  id: string;
  cognitoId: string;
  email: string;
  referralLink?: string;
  kycStatus?: KycStatus;
  kycProviderId?: string;
  kycCompletedAt?: Date;
  createdAt: Date;
  transactions: TokenTransaction[];
  wallet?: Wallet;
}

export interface Wallet {
  userId: string;
  turnkeyWalletId: string;
  walletAddress: string;
  status: string;
  createdAt: Date;
  user: User;
}

export interface Property {
  id: string;
  contractAddress: string;
  developerId: string;
  title: string;
  district: string;
  type: string;
  totalTokens: number;
  availableTokens: number;
  status: PropertyStatus;
  price?: number;
  roi?: number;
  createdAt: Date;
  description?: string;
  address?: string;
  metadata?: any;
  transactions: TokenTransaction[];
}

export interface TokenTransaction {
  id: string;
  userId: string;
  propertyId: string;
  tokensAmount: number;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  paymentAmount: number;
  paymentCurrency: string;
  transactionType: string;
  createdAt: Date;
  user: User;
  property: Property;
}
