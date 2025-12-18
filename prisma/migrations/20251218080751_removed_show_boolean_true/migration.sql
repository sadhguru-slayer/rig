/*
  Warnings:

  - You are about to drop the column `show` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `SubService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "show";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "show";

-- AlterTable
ALTER TABLE "SubService" DROP COLUMN "show";
