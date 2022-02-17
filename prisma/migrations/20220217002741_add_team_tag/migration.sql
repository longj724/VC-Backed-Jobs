/*
  Warnings:

  - Added the required column `team_tag` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "team_tag" TEXT NOT NULL;
