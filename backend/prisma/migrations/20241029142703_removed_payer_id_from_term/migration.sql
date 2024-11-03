/*
  Warnings:

  - You are about to drop the column `loanId` on the `terms` table. All the data in the column will be lost.
  - You are about to drop the column `payer_id` on the `terms` table. All the data in the column will be lost.
  - Added the required column `loan_id` to the `terms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "terms" DROP CONSTRAINT "terms_loanId_fkey";

-- DropForeignKey
ALTER TABLE "terms" DROP CONSTRAINT "terms_payer_id_fkey";

-- DropIndex
DROP INDEX "terms_payer_id_idx";

-- AlterTable
ALTER TABLE "terms" DROP COLUMN "loanId",
DROP COLUMN "payer_id",
ADD COLUMN  "loan_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "terms_loan_id_idx" ON "terms"("loan_id");

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
