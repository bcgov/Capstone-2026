/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `FeedbackForm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "FeedbackForm_name_key";

-- DropIndex
DROP INDEX "Owner_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackForm_id_key" ON "FeedbackForm"("id");
