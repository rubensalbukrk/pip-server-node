import { userValidation } from './../validations/user.validation';
import express, {Response, Request} from 'express'
import { _getUsers, _createUser, _removeUser,_updateUser  } from '../repositorys/user-repository'
import bcrypt from 'bcrypt'

export const get = async (req: Request, res: Response) => {
    try {
        const users = await _getUsers()
        res.status(200).send({ results: users})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const create = async (req: Request, res: Response) => {
    await userValidation.validate(req.body)
    try {
        const hashPass: String = await bcrypt.hash(req.body.password, 8);
        req.body.password = hashPass
        const {parents} = req.body
        const user = await _createUser(req.body, parents)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(`Problema ao criar usuário: ${e}`)
    }
}

export const update = async(req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 8);
    const userUpdate = req.body;
    const newParents = req.body.parents
    try {
        const user = await _updateUser(userId, userUpdate, newParents)
        res.status(200).send(`O usuário foi alterado!`)
    } catch (e) {
        res.status(400).send(e)
    }
 }

export const remove = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)
    try {
        _removeUser(userId)
        res.status(200).send(`O usuário de id: "${userId}" foi deletado!`)
    } catch (e) {
        res.status(400).send(`O usuário de id: "${userId}" não foi encontrado para ser removido!`)
    }
}