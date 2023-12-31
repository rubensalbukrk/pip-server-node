import express, {Request, Response} from 'express';
import { _createAprovado, _getAprovados, _removeAprovado } from '../repositorys/aprovado-repository';

export const get = async (req: Request, res: Response) => {
    try {
        const response = await _getAprovados()
        res.status(200).send({ results: response})
    } catch (error) {
        res.status(400).send(`Erro ao obter lista de aprovados: ${error}`)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const response = await _createAprovado(req.body)
        res.status(200).send(`A solicitação foi aprovada!`)
    } catch (error) {
        res.send(400).send(`Problema ao criar aprovados!${error}`)
    }
}

export const remove = async (req: Request, res: Response) => {
    const approvedId = parseInt(req.params.id)
    try {
        const response = await _removeAprovado(approvedId)
        res.status(200).send(`A aprovação foi cancelada!`)
    } catch (error) {
        res.status(400).send(`Problema ao remover aprovação: ${error}`)
    }
}