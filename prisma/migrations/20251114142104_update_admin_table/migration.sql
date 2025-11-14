-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSuperUser" BOOLEAN NOT NULL DEFAULT false;
