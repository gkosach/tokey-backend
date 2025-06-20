-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('not_started', 'pending', 'completed', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('coming_soon', 'active', 'sold_out', 'completed');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "cognito_id" VARCHAR(128) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "referral_link" VARCHAR(50),
    "kyc_status" "KycStatus" NOT NULL DEFAULT 'pending',
    "kyc_provider_id" VARCHAR(100),
    "kyc_completed_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "user_id" UUID NOT NULL,
    "tatum_wallet_id" VARCHAR(100) NOT NULL,
    "wallet_address" VARCHAR(42) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL,
    "contract_address" VARCHAR(42) NOT NULL,
    "developer_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "district" VARCHAR(20) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "available_tokens" INTEGER NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'coming_soon',
    "price" REAL,
    "roi" REAL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "address" VARCHAR(500),
    "metadata" JSONB,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "tokens_amount" INTEGER NOT NULL,
    "tx_hash" VARCHAR(66) NOT NULL,
    "from_address" VARCHAR(42) NOT NULL,
    "to_address" VARCHAR(42) NOT NULL,
    "payment_amount" REAL NOT NULL,
    "payment_currency" VARCHAR(10) NOT NULL,
    "transaction_type" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cognito_id_key" ON "users"("cognito_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_referral_link_key" ON "users"("referral_link");

-- CreateIndex
CREATE INDEX "idx_user_kyc_status" ON "users"("kyc_status");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_tatum_wallet_id_key" ON "wallets"("tatum_wallet_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_wallet_address_key" ON "wallets"("wallet_address");

-- CreateIndex
CREATE INDEX "idx_wallet_tatum_id" ON "wallets"("tatum_wallet_id");

-- CreateIndex
CREATE INDEX "idx_wallet_wallet_address" ON "wallets"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "properties_contract_address_key" ON "properties"("contract_address");

-- CreateIndex
CREATE INDEX "idx_property_status" ON "properties"("status");

-- CreateIndex
CREATE INDEX "idx_property_status_district" ON "properties"("status", "district");

-- CreateIndex
CREATE INDEX "idx_property_status_price" ON "properties"("status", "price");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_tx_hash_key" ON "transactions"("tx_hash");

-- CreateIndex
CREATE INDEX "idx_transaction_user_time" ON "transactions"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_transaction_property_time" ON "transactions"("property_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_transaction_from" ON "transactions"("from_address");

-- CreateIndex
CREATE INDEX "idx_transaction_to" ON "transactions"("to_address");

-- CreateIndex
CREATE INDEX "idx_transaction_type" ON "transactions"("transaction_type");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
