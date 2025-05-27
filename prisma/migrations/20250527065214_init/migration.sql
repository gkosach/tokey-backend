-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('not_started', 'pending', 'verified', 'failed');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "cognito_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "kyc_status" "KycStatus" NOT NULL DEFAULT 'not_started',
    "kyc_verification_id" TEXT,
    "kyc_verified_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("cognito_id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" UUID NOT NULL,
    "address" VARCHAR(44) NOT NULL,
    "whitelisted" BOOLEAN NOT NULL DEFAULT false,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "mint" TEXT NOT NULL,
    "owner_id" VARCHAR(36) NOT NULL,
    "metadata" JSONB NOT NULL,
    "moderation_status" "ModerationStatus" NOT NULL DEFAULT 'pending',
    "moderation_comment" TEXT,
    "tokenization_date" TIMESTAMP(3),

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" UUID NOT NULL,
    "tx_hash" TEXT,
    "amount" TEXT NOT NULL,
    "from_wallet" VARCHAR(44) NOT NULL,
    "to_wallet" VARCHAR(44) NOT NULL,
    "property_id" UUID NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "walletId" UUID,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StakingRecord" (
    "id" UUID NOT NULL,
    "amount" TEXT NOT NULL,
    "last_claim" TIMESTAMP(3),
    "user_id" VARCHAR(36) NOT NULL,
    "property_id" UUID NOT NULL,

    CONSTRAINT "StakingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "user_phone_idx" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE INDEX "wallet_address_idx" ON "Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Property_mint_key" ON "Property"("mint");

-- CreateIndex
CREATE INDEX "property_mint_idx" ON "Property"("mint");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_tx_hash_key" ON "PaymentTransaction"("tx_hash");

-- CreateIndex
CREATE INDEX "transaction_tx_hash_idx" ON "PaymentTransaction"("tx_hash");

-- CreateIndex
CREATE INDEX "transaction_property_idx" ON "PaymentTransaction"("property_id");

-- CreateIndex
CREATE INDEX "staking_property_idx" ON "StakingRecord"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "staking_user_property_unq" ON "StakingRecord"("user_id", "property_id");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("cognito_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("cognito_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("cognito_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StakingRecord" ADD CONSTRAINT "StakingRecord_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("cognito_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StakingRecord" ADD CONSTRAINT "StakingRecord_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
