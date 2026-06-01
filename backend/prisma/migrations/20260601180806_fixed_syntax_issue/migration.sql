-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "questionType" TYPE "QuestionType" USING "questionType"[1]::"QuestionType";
