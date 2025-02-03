/*
  Warnings:

  - Made the column `courseName` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_courseName_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "creatorId" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "tag" DROP NOT NULL,
ALTER COLUMN "tag" SET DEFAULT 'free';

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "courseName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "Course"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
