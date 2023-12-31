/*
  Warnings:

  - You are about to drop the column `createAt` on the `Solicitations` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Solicitations` table. All the data in the column will be lost.
  - Added the required column `date` to the `Solicitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solicitations" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "date" TEXT NOT NULL;
