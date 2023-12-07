import express from 'express'
import data from '../utils/data';
import { AprovadoProps } from '../models/aprovadosProps';

const router = express.Router()

let aprovados: AprovadoProps[] = [
    {
      id: 1,
      nome: "Rubens",
      date: "29/11/2025",
      service: "all in one",
      status: "aprovado",
      cpf: "111.111.111-11"
    },
  ];
  
  router.get('/api/aprovados', (req, res) => res.json({
    aprovados
  }))
  router.post('/api/aprovados', (req, res) => {
    const lastId = aprovados[aprovados?.length - 1]?.id
    aprovados.push({
      id: lastId + 1,
      date: data,
      nome: req.body.nome,
      cpf: req.body.cpf,
      service: req.body.service,
      status: req.body.status
    })
    res.json('Solicitação aprovada!')
  })
  router.put('/api/aprovados/:id', (req, res) => {
    const aprovadoId = req.params.id
  
    const aprovado = aprovados.find(aprovado => Number(aprovado.id) === Number(aprovadoId))
  
    if (!aprovado) {
      return res.json('Usuário não encontrado!')
    }
  
    const updatedAprovado: any = {
      ...aprovados,
      date: data,
      status: req.body.status,
    }
  
    aprovados = aprovados.map(aprovado => {
      if (Number(aprovado.id) === Number(aprovadoId)) {
        aprovado = updatedAprovado
      }
      return aprovado
    })
  
    res.json("Status foi atualizada!")
  })
  router.delete('/api/aprovados/:id', (req, res) => {
    const aprovadoId = req.params.id
  
    aprovados = aprovados.filter(aprovado => Number(aprovado.id) !== Number(aprovadoId))
  
    res.json('Aprovação cancelada!')
  })

  export default router;