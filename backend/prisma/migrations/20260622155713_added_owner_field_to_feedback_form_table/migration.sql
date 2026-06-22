-- AlterTable
ALTER TABLE "FeedbackForm" ADD COLUMN     "devId" INTEGER;

-- AddForeignKey
ALTER TABLE "FeedbackForm" ADD CONSTRAINT "FeedbackForm_devId_fkey" FOREIGN KEY ("devId") REFERENCES "Developer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
