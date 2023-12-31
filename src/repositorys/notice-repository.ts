import { prisma } from "../services/prisma";
import { Notices } from "@prisma/client";
import dataNow from '../utils/data'

export const _createNotice = async (data: Notices) => {
    const notice = await prisma.notices.create({
        data: {
            ...data,
            date: dataNow
        }
    })
    return notice
}

export const _getNotices = async () => {
    const notices = await prisma.notices.findMany({
        select: {
            id: true,
            title: true,
            mensagem: true,
            img: true,
            date: true
        }
    })
    return notices
}

export const _removeNotice = async(id: any) => {
    const notice = await prisma.notices.delete({
        where: {
            id: id
        }
    })
}