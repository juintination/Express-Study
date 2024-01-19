/*
  Warnings:

  - You are about to drop the `temp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `temp`;

-- CreateTable
CREATE TABLE `Temp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
