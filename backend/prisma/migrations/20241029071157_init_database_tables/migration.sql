-- CreateEnum
CREATE TYPE "loan_status" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "term_status" AS ENUM ('PENDING', 'PAID');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255),
    "email" VARCHAR(325) NOT NULL,
    "password" TEXT NOT NULL,
    "phone_no" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "term" INTEGER NOT NULL,
    "payer_id" TEXT NOT NULL,
    "status" "loan_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" TEXT NOT NULL,
    "term_amount" INTEGER NOT NULL,
    "term" INTEGER NOT NULL,
    "payer_id" TEXT NOT NULL,
    "status" "term_status" NOT NULL DEFAULT 'PENDING',
    "due" DATE NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_no_key" ON "users"("phone_no");

-- CreateIndex
CREATE INDEX "loans_payer_id_idx" ON "loans"("payer_id");

-- CreateIndex
CREATE INDEX "terms_payer_id_idx" ON "terms"("payer_id");

-- CreateIndex
CREATE INDEX "terms_due_idx" ON "terms"("due");

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms" ADD CONSTRAINT "terms_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
