import express, {Response, Request} from 'express'
import { _getNotices, _createNotice, _removeNotice } from '../repositorys/notice-repository'
import { Notices } from '@prisma/client'

export const get = async (req: Request, res: Response) => {
    try {
        const notices = await _getNotices()
        res.status(200).send({ results: notices})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const notice = await _createNotice(req.body)
        res.status(200).send("Notícia criada com sucesso!")
    } catch (e) {
        res.status(400).send(`Problema ao criar notícia: ${e}`)
    }
}

export const remove = async (req: Request, res: Response) => {
    const noticeId = parseInt(req.params.id)
    try {
        _removeNotice(noticeId)
        res.status(200).send(`A notícia de id: "${noticeId}" foi deletado!`)
    } catch (e) {
        res.status(400).send(`O notícia de id: "${noticeId}" não foi encontrado para ser removido!`)
    }
}