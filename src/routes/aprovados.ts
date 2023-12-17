import data from '../utils/data';
import express from 'express';
import { AprovadosProps } from './../interfaces/aprovadosProps';
import { verifyToken } from './../middlewares/auth';


const router = express.Router()

export let aprovados: AprovadosProps[] = [
    {
        id: 1,
        nome: "Rubens",
        date: `${data}`,
        cpf: "111.222.333-12",
        service: "Emitir RG",
        status: "Em andamento..."
    }
]

router.get('/', verifyToken, (req, res) => res.json({
    results: {aprovados}
}))
router.post('/', verifyToken, (req, res) => {
    const lastId = aprovados[aprovados.length - 1]?.id

    aprovados.push({
        id: lastId + 1,
        date: data,
        nome: req.body.nome,
        cpf: req.body.cpf,
        service: req.body.service,
        status: req.body.status
    })
    res.json('Aprovado com sucesso!')
})

router.put('/:id', verifyToken, (req, res) => {
    const aprovadoId = req.params.id
    const aprovado = aprovados.find(aprovado => Number(aprovado.id) === Number(aprovadoId))

    if(!aprovado) {
        return res.json('Solicitação não encontrada!')
    }

    const updatedAprovado: AprovadosProps = {
        ...aprovado,
        date: data,
        status: req.body.status
    }

    aprovados = aprovados.map(aprovado => {
        if (Number(aprovado.id) === Number(aprovadoId)) {
            aprovado = updatedAprovado
        }
        return aprovado
    })
    res.json('Status atualizado com sucesso!')
} )

router.delete('/:id', verifyToken, (req, res) => {
    const aprovadoId = req.params.id

    aprovados = aprovados.filter(aprovado => Number(aprovado.id) !== Number(aprovadoId))

    res.json('Aprovação cancelada!')
})

export default router;