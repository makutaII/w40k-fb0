-- DropForeignKey
ALTER TABLE `w_requirement` DROP FOREIGN KEY `w_Requirement_talentId_fkey`;

-- RenameIndex
ALTER TABLE `w_requirement` RENAME INDEX `w_Requirement_talentId_fkey` TO `w_Requirement_talentId_idx`;
