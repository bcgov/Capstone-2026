-- AlterTable
ALTER TABLE "CoverageReport" ADD COLUMN     "devId" INTEGER;

-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");

-- AddForeignKey
ALTER TABLE "CoverageReport" ADD CONSTRAINT "CoverageReport_devId_fkey" FOREIGN KEY ("devId") REFERENCES "Developer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
