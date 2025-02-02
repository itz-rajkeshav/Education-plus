/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Video` table. All the data in the column will be lost.
  - Added the required column `Videotype` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "publishedAt",
DROP COLUMN "type",
ADD COLUMN     "Videotype" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
