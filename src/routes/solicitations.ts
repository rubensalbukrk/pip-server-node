import express from 'express';
import { SolicitationsProps } from '../interfaces/solicitationsProps';
import data from '../utils/data';

const router = express.Router()

let solicitations: SolicitationsProps[] = [
    {
      id: 1,
      cpf: "111.222.333-12",
      date: data,
      nome: "Rubens",
      pasta: "Cidadania",
      service: "Emitir RG",
      status: "Em avaliação"
    }
  ];

router.get('/', (req, res) => res.json({
    results: {solicitations}
  }))
router.post('/', (req, res) => {
    const lastId = solicitations[solicitations.length - 1]?.id
    solicitations.push({
      id: lastId + 1,
      date: data,
      userInfo: req.body.userInfo,
      nome: req.body.nome,
      cpf: req.body.cpf,
      service: req.body.service,
      pasta: req.body.pasta,
      status: req.body.status
    })
    res.json('Solicitação enviada, aguarde a analise e fique de olho você será notificado aqui!')
  })
router.put('/:id', (req, res) => {
    const solicitationId = req.params.id
  
    const solicitation = solicitations.find(solicitation => Number(solicitation.id) === Number(solicitationId))
  
    if (!solicitation) {
      return res.json('Solicitação não encontrada!')
    }
  
    const updatedSolicitation = {
      ...solicitation,
      date: data,
      status: req.body.status,
    }
  
    solicitations = solicitations.map(solicitation => {
      if (Number(solicitation.id) === Number(solicitationId)) {
        solicitation = updatedSolicitation
      }
      return solicitation
    })
  
    res.json("A solicitação foi atualizada!")
  })
router.delete('/:id', (req, res) => {
    const solicitationId = req.params.id
  
    solicitations = solicitations.filter(solicitation => Number(solicitation.id) !== Number(solicitationId))
  
    res.json('Solicitação excluída!')
  })

export default router;
