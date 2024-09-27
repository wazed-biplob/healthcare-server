/*
  Warnings:

  - You are about to drop the column `appointmenFee` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `avarageRating` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `doctors` table. All the data in the column will be lost.
  - Added the required column `appointmentFee` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "appointmenFee",
DROP COLUMN "avarageRating",
DROP COLUMN "contactNumber",
DROP COLUMN "createdAt",
DROP COLUMN "isDeleted",
DROP COLUMN "name",
DROP COLUMN "profilePhoto",
DROP COLUMN "updatedAt",
ADD COLUMN     "appointmentFee" INTEGER NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
