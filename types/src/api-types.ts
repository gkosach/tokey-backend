// Generic API Response
import { KycStatus, Property, User, Wallet } from "./prismaTypes";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  timestamp: string;
  details?: any;
}

// Wallet API Types
export interface WalletCreateResponse {
  walletAddress: string;
}

export interface WalletBalanceResponse {
  balance: string; // in wei
}

export interface WalletInfo {
  walletAddress: string;
  turnkeyWalletId: string;
  status: string;
  createdAt: Date;
}

// KYC API Types
export interface KycStatusResponse {
  status: KycStatus | null;
  canStart: boolean;
}

export interface KycInitiateResponse {
  inquiryId: string;
  sessionToken: string;
}

export interface KycDetailsResponse {
  status: KycStatus | null;
  verificationId: string | null;
  completedAt: Date | null;
  canCreateWallet: boolean;
}

// Property API Types
export interface PropertyListResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
}

// Transaction API Types
export interface TransactionSendRequest {
  toAddress: string;
  amount: string;
}

export interface TransactionSendResponse {
  txHash: string;
}

// Extended types with relations
export interface UserWithWallet extends User {
  wallet?: Wallet;
}

export interface PropertyWithTransactions extends Property {
  _count?: {
    transactions: number;
  };
}
