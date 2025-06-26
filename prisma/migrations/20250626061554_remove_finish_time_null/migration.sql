/*
  Warnings:

  - Made the column `finish_time` on table `Play` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Play" ALTER COLUMN "finish_time" SET NOT NULL;
