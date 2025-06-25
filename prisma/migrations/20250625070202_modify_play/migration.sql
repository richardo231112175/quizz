/*
  Warnings:

  - You are about to drop the column `time_taken` on the `Play` table. All the data in the column will be lost.
  - Added the required column `finish_time` to the `Play` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Play" DROP COLUMN "time_taken",
ADD COLUMN     "finish_time" TIMESTAMP(3) NOT NULL;
