-- DropForeignKey
ALTER TABLE `w_requirement` DROP FOREIGN KEY `w_Requirement_talentId_fkey`;

-- AlterTable
ALTER TABLE `w_requirement` MODIFY `talentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `w_Requirement` ADD CONSTRAINT `w_Requirement_talentId_fkey` FOREIGN KEY (`talentId`) REFERENCES `w_Talent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
