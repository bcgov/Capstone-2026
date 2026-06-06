-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_formId_fkey";


-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "FeedbackForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
