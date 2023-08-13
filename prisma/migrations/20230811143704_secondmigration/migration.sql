/*
  Warnings:

  - Added the required column `creator` to the `meetups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meetups" ADD COLUMN     "creator" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
