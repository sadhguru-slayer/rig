/*
  Warnings:

  - You are about to drop the column `images` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GalleryImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "serviceId" INTEGER,
    "projectId" INTEGER,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GalleryImage_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GalleryImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GalleryImage" ("id", "serviceId", "url") SELECT "id", "serviceId", "url" FROM "GalleryImage";
DROP TABLE "GalleryImage";
ALTER TABLE "new_GalleryImage" RENAME TO "GalleryImage";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT,
    "location" TEXT,
    "completedOn" DATETIME,
    "imgSource" TEXT,
    "description" TEXT,
    "serviceType" TEXT,
    "category" TEXT,
    "seoId" INTEGER,
    "scope" JSONB,
    "highlights" JSONB,
    "clientBenefits" JSONB,
    "finalOutcome" TEXT,
    "keyProject" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_seoId_fkey" FOREIGN KEY ("seoId") REFERENCES "Seo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("category", "client", "clientBenefits", "completedOn", "createdAt", "description", "finalOutcome", "highlights", "id", "imgSource", "keyProject", "location", "name", "scope", "seoId", "serviceType", "slug", "updatedAt") SELECT "category", "client", "clientBenefits", "completedOn", "createdAt", "description", "finalOutcome", "highlights", "id", "imgSource", "keyProject", "location", "name", "scope", "seoId", "serviceType", "slug", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
