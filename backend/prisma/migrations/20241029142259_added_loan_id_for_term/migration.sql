/*
  Warnings:

  - Added the required column `loanId` to the `terms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "terms" ADD COLUMN  "loanId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
