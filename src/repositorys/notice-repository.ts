import { prisma } from "../services/prisma";
import { Notices } from "@prisma/client";

export const _createNotice = async (data: Notices) => {
    const notice = await prisma.notices.create({
        data
    })
    return notice
}

export const _getNotices = async () => {
    const notices = await prisma.notices.findMany()
    return notices
}

export const _removeNotice = async(id: number) => {
    const notice = await prisma.notices.delete({
        where: {
            id
        }
    })
}