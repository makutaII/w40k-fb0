/*
  Warnings:

  - You are about to drop the column `talentId` on the `w_requirement` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `w_Requirement_talentId_idx` ON `w_requirement`;

-- AlterTable
ALTER TABLE `w_requirement` DROP COLUMN `talentId`,
    ADD COLUMN `talent_id` INTEGER NULL,
    MODIFY `name` VARCHAR(400) NOT NULL;

-- CreateIndex
CREATE INDEX `w_requirement_talent_id_idx` ON `w_requirement`(`talent_id`);
