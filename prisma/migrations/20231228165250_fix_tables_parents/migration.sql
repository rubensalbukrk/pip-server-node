-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "isAdmin" BOOLEAN,
    "isVolt" BOOLEAN,
    "isCoordAutist" BOOLEAN,
    "isCoordMulher" BOOLEAN,
    "isCoordSaude" BOOLEAN,
    "isCoordProtagonista" BOOLEAN,
    "isCoordAlimentar" BOOLEAN,
    "isCoordPasse" BOOLEAN,
    "isCoordCidadania" BOOLEAN,
    "avatar" TEXT,
    "nome" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "question1" BOOLEAN,
    "question2" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solicitationsId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parentes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "isAutist" BOOLEAN NOT NULL,
    "isPcd" BOOLEAN NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Parentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitations" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "pasta" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Solicitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aprovados" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aprovados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notices" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_solicitationsId_fkey" FOREIGN KEY ("solicitationsId") REFERENCES "Solicitations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parentes" ADD CONSTRAINT "Parentes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
