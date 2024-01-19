/*
  Warnings:

  - Made the column `description` on table `w_talent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `w_talent` MODIFY `description` VARCHAR(191) NOT NULL;
