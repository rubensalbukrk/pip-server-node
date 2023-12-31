import {prisma} from '../services/prisma'
import { Aprovados } from '@prisma/client'
import dataNow from '../utils/data'

export const _createAprovado = async (data: Aprovados) => {
    const aprovado = prisma.aprovados.create({
        data: {
            ...data,
            date: dataNow
        }
    })
    return aprovado
}

export const _getAprovados = async () => {
    const aprovados = prisma.aprovados.findMany({
        select: {
            id: true,
            nome: true,
            cpf: true,
            service: true,
            status: true,
            date: true
        }
    })
    return aprovados
}

export const _removeAprovado = async (id: number) => {
    const removed = await prisma.aprovados.delete({
        where: {
            id: id
        }
    })
}