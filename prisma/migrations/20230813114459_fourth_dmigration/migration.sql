/*
  Warnings:

  - Made the column `creator` on table `meetups` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "meetups" ALTER COLUMN "creator" SET NOT NULL;
