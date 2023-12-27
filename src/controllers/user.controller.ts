import express, {Response, Request} from 'express'
import { _getUsers, _createUser, _removeUser,_updateUser  } from '../repositorys/user-repository'

export const get = async (req: Request, res: Response) => {
    try {
        const user = await _getUsers()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const user = await _createUser(req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(`Problema ao criar usuário: ${e}`)
    }
}

export const update = async(req: Request, res: Response) => {
    try {
        const user = await _updateUser(req?.body?.id, req.body)
        res.send(200).send(`O usuário foi alterado: \n ${user}`)
    } catch (e) {
        res.status(400).send(e)
    }
 }

export const remove = async (req: Request, res: Response) => {
    try {
        const user = await _removeUser(req.body.id)
        res.status(200).send(`O usuário de id: "${req.body.id}" foi deletado!`)
    } catch (e) {
        res.status(400).send(`O usuário de id: "${req.body.id}" não foi encontrado para ser removido!`)
    }
}