import { prisma } from './../services/prisma';
import { Parente, Prisma, User } from "@prisma/client";

export const _createUser = async (data: User, parents: Parente) => {
    const user = await prisma.user.create({
        data: {
            isAdmin: data.isAdmin,
            nome: data.nome,
            idade: data.idade,
            cpf: data.cpf,
            address: data.address,
            phone: data.phone,
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
    const users = await prisma.user.findMany({
        select: {
            id: true,
			isAdmin: true,
			isVolt: true,
			isEtg: true,
			isCoordAutist: true,
			isCoordMulher: true,
			isCoordSaude: true,
			isCoordProtagonista: true,
			isCoordAlimentar: true,
			isCoordPasse: true,
			isCoordCidadania: true,
            isCoordCursos: true,
            isCoordOptometria: true,
			isBusiness: true,
			avatar: true,
			nome: true,
			idade: true,
			phone: true,
			address: true,
			bairro: true,
			cpf: true,
			nis: true,
			email: true,
			password: true,
			question1: true,
			question2: true,
			solicitationsId: true,
			createAt: true,
            parents: true

        }
    })
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
                isEtg: true,
                isBusiness: true,
                isCoordAutist: true,
                isCoordMulher: true,
                isCoordSaude: true,
                isCoordProtagonista: true,
                isCoordAlimentar: true,
                isCoordPasse: true,
                isCoordCidadania: true,
                isCoordCursos: true,
                isCoordOptometria: true,
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

export const _updateUser = async (id: number, userUpdate: User, newParents: any) => {

    const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...userUpdate,
                parents: {
                    deleteMany: {},
                    createMany: {
                        data: newParents
                    }
                }
            },
            include: {
                parents: true,
              },
    })
}

export const _removeUser = async(id: number) => {
    const removeUser = await prisma.user.delete({
        where: {
            id
        }
    })
}