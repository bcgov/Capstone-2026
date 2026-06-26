/*
  Warnings:

  - You are about to drop the column `devId` on the `CoverageReport` table. All the data in the column will be lost.
  - You are about to drop the column `devId` on the `FeedbackForm` table. All the data in the column will be lost.
  - You are about to drop the `Developer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoverageReport" DROP CONSTRAINT "CoverageReport_devId_fkey";

-- DropForeignKey
ALTER TABLE "FeedbackForm" DROP CONSTRAINT "FeedbackForm_devId_fkey";

-- AlterTable
ALTER TABLE "CoverageReport" DROP COLUMN "devId",
ADD COLUMN     "ownerId" INTEGER;

-- AlterTable
ALTER TABLE "FeedbackForm" DROP COLUMN "devId",
ADD COLUMN     "ownerId" INTEGER;

-- DropTable
DROP TABLE "Developer";

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- AddForeignKey
ALTER TABLE "CoverageReport" ADD CONSTRAINT "CoverageReport_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackForm" ADD CONSTRAINT "FeedbackForm_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
