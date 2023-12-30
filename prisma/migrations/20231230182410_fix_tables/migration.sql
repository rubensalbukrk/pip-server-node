-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "isAdmin" BOOLEAN,
    "isVolt" BOOLEAN,
    "isEtg" BOOLEAN,
    "isCoordAutist" BOOLEAN,
    "isCoordMulher" BOOLEAN,
    "isCoordSaude" BOOLEAN,
    "isCoordProtagonista" BOOLEAN,
    "isCoordAlimentar" BOOLEAN,
    "isCoordPasse" BOOLEAN,
    "isCoordCidadania" BOOLEAN,
    "isCoordCursos" BOOLEAN,
    "isCoordOptometria" BOOLEAN,
    "isBusiness" BOOLEAN,
    "avatar" TEXT,
    "nome" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nis" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "question1" BOOLEAN,
    "question2" TEXT,
    "solicitationsId" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "parentesco" TEXT,
    "cpf" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "isAutist" BOOLEAN NOT NULL,
    "isPcd" BOOLEAN NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "Parente_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Notices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_solicitationsId_fkey" FOREIGN KEY ("solicitationsId") REFERENCES "Solicitations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parente" ADD CONSTRAINT "Parente_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
