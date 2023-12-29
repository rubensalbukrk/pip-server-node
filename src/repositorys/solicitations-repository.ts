import { prisma } from './../services/prisma';
import {Solicitations, User } from "@prisma/client";

export const _createSolicitation = async (data: Solicitations, userInfo: any) => {
    const solicitation = await prisma.solicitations.create({
        data: {
            nome:data.nome,
            cpf: data.cpf,
            service: data.service,
            pasta: data.pasta,
            status: data.status,
            userInfo: {
                createMany: {
                    data: userInfo
                }
            }
        },
        include: {
            userInfo: true
        }    
    })
    return solicitation
}

export const _getSolicitations = async () => {
    const solicitations = await prisma.solicitations.findMany({
        select: {
            id: true,
            nome: true,
            cpf: true,
            service: true,
            pasta: true,
            status: true,
            createAt: true,
            userInfo: true
        }
    })
    return solicitations
}


export const _updateSolicitation = async (id: number, data: any) => {
    const post = await prisma.solicitations.update({
      where: {
        id: id
      },
      data: data
    })
}

export const _removeSolicitation = async(id: number) => {
    const removeUser = await prisma.solicitations.delete({
        where: {
            id
        }
    })
}