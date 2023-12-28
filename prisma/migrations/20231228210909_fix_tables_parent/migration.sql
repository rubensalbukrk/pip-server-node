/*
  Warnings:

  - You are about to drop the `Parentes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Parentes" DROP CONSTRAINT "Parentes_userId_fkey";

-- DropTable
DROP TABLE "Parentes";

-- CreateTable
CREATE TABLE "Parente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "isAutist" BOOLEAN NOT NULL,
    "isPcd" BOOLEAN NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Parente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parente" ADD CONSTRAINT "Parente_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
