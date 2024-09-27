/*
  Warnings:

  - You are about to drop the column `profilePHoto` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "profilePHoto",
ADD COLUMN     "profilePhoto" TEXT;
