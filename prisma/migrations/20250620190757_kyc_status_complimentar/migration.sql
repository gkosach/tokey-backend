/*
  Warnings:

  - The values [not_started,pending,completed,approved,rejected] on the enum `KycStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "KycStatus_new" AS ENUM ('inquiry.created', 'inquiry.completed', 'inquiry.approved', 'inquiry.declined');
ALTER TABLE "users" ALTER COLUMN "kyc_status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "kyc_status" TYPE "KycStatus_new" USING ("kyc_status"::text::"KycStatus_new");
ALTER TYPE "KycStatus" RENAME TO "KycStatus_old";
ALTER TYPE "KycStatus_new" RENAME TO "KycStatus";
DROP TYPE "KycStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "kyc_status" DROP NOT NULL,
ALTER COLUMN "kyc_status" DROP DEFAULT;
