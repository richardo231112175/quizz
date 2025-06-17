/*
  Warnings:

  - You are about to drop the column `allow_retake` on the `QuizSession` table. All the data in the column will be lost.
  - You are about to drop the column `show_answers` on the `QuizSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuizSession" DROP COLUMN "allow_retake",
DROP COLUMN "show_answers";
