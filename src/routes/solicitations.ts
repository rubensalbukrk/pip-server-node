import data from '../utils/data';
import express from 'express';
import { SolicitationsProps } from '../interfaces/solicitationsProps';
import { UserProps } from '../interfaces/userProps';
import { verifyToken } from './../middlewares/auth';

const router = express.Router()

let solicitations: SolicitationsProps[] = [
    {
      id: 1,
      cpf: "111.222.333-12",
      date: data,
      nome: "Rubens",
      pasta: "Cidadania",
      service: "Emitir RG",
      status: "Em avaliação",
      userInfo: {
        id: 1,
        isAdmin: true,
        isAutist: false,
        isVolt: false,
        status: true,
        date: data,
        nome: "Rubens Albuquerque",
        idade: 27,
        address: "Bariloche Internation",
        bairro: "Santa Rita",
        phone: 839867711,
        cpf: "111.111.111-11",
        nis: 2321051,
        email: "rubiinho@live.it",
        password: "123456",
        filhos: [
          {
            id: 1,
            nome: 'Rafael Santos',
            idade: 4,
            cpf: "215.562.340-10",
            isAutist: true,
          },
          ],
        question1: true,
        question2: "Todos focados pela comunidade!"
      }
    }
  ];

router.get('/', verifyToken, (req, res) => res.json({
    results: {solicitations}
  }))
router.post('/', verifyToken, (req, res) => {
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
router.put('/:id', verifyToken, (req, res) => {
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
router.delete('/:id', verifyToken, (req, res) => {
    const solicitationId = req.params.id
  
    solicitations = solicitations.filter(solicitation => Number(solicitation.id) !== Number(solicitationId))
  
    res.json('Solicitação excluída!')
  })

export default router;
