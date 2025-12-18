-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "show" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "show" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SubService" ADD COLUMN     "show" BOOLEAN NOT NULL DEFAULT false;
