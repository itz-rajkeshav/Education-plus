-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Course video',
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "publishedAt" DROP NOT NULL;
