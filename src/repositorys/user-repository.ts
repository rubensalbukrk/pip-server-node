import { prisma } from './../services/prisma';
import { Parente, User } from "@prisma/client";

export const _createUser = async (data: User, parents: Parente) => {
    const user = await prisma.user.create({
        data: {
            isAdmin: data.isAdmin,
            nome: data.nome,
            idade: data.idade,
            cpf: data.cpf,
            address: data.address,
            nis: data.nis,
            phone: data.phone,
            email: data.email,
            bairro: data.bairro,
            password: data.password,
            parents: {
                createMany: {
                    data: parents
                }
            }
        },
        include: {
            parents: true
        }
    })
    return user
}

export const _getUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}
export const _findUser = async (cpf: string, password: string) => {
    const user = await prisma.user.findFirst({
        where: {
            cpf: cpf
        },
        select: {
                id: true,
                isAdmin: true,
                isVolt: true,
                isCoordAutist: true,
                isCoordMulher: true,
                isCoordSaude: true,
                isCoordProtagonista: true,
                isCoordAlimentar: true,
                isCoordPasse: true,
                isCoordCidadania: true,
                nome:true,
                idade: true,
                address: true,
                bairro: true,
                phone: true,
                avatar: true,
                cpf: true,
                nis: true,
                email: true,
                password: true,
                question1: true,
                question2: true,
                parents: true
        }
    })
    return user
}

export const _updateUser = async (id: number, data: User) => {
    const post = await prisma.user.update({
      where: {
        id
      },
      data
    })
}

export const _removeUser = async(id: number) => {
    const removeUser = await prisma.user.delete({
        where: {
            id
        }
    })
}