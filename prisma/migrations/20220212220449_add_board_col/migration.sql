/*
  Warnings:

  - Added the required column `board` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "board" TEXT NOT NULL;
