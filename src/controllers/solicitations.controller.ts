
import express, {Response, Request} from 'express'
import { _getSolicitations, _createSolicitation, _removeSolicitation , _updateSolicitation } from '../repositorys/solicitations-repository'
import { Solicitations } from '@prisma/client'


export const get = async (req: Request, res: Response) => {
    try {
        const Solicitations = await _getSolicitations()
        res.status(200).send({ results: Solicitations })
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const {userInfo} = req.body
        const Solicitations = await _createSolicitation(req.body, userInfo)
        res.status(200).send(Solicitations)
    } catch (e) {
        res.status(400).send(`Problema ao criar solicitação: ${e}`)
    }
}

export const update = async(req: Request, res: Response) => {
    const solicitationId = parseInt(req.params.id, 8)
    const solicitationUpdate: Solicitations = req.body;
    try {
        const solicitation = await _updateSolicitation(solicitationId, solicitationUpdate)
        res.send(200).send(solicitation)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        _removeSolicitation(req.body.id)
        res.status(200).send(`Solicitação cancelada!`)
    } catch (e) {
        res.status(400).send(`Solicitação de id: "${req.body.id}" não foi encontrada`)
    }
}