/*
 Warnings:
 - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
 - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
 - A unique constraint covering the columns `[phoneNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
 - Added the required column `phoneNo` to the `User` table without a default value. This is not possible if the table is not empty.
 - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
 - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
  ADD COLUMN "avatar" TEXT,
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "password" TEXT NOT NULL,
  ADD COLUMN "phoneNo" TEXT NOT NULL,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL,
  ADD COLUMN "username" TEXT NOT NULL,
  ALTER COLUMN "email"
SET DATA TYPE VARCHAR(255);
-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNo_key" ON "User"("phoneNo");