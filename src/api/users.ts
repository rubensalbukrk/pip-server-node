import express from 'express';
import data from '../utils/data'
import { UserProps } from '../models/userProps';

const router = express.Router()

let users: UserProps[] = [
    {
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
            name: 'Rafael Santos',
            idade: 4,
            cpf: "215.562.340-10"
          },
          ],
        question1: true,
        question2: "Todos focados pela comunidade!"
      },
      {
        id: 2,
        isVolt: false,
        isAutist: false,
        isAdmin: false,
        status: true,
        date: '3/8/2023 23:30:08',
        nome: 'David Santana',
        idade: 30,
        address: 'Rua São Francisco',
        bairro: "Tibiri",
        phone: 83981234696,
        cpf: "222.222.222-22",
        nis: 111112,
        email: "david@pip",
        password: "admin",
        filhos: [
          {
            id: 1,
            name: "Rafael",
            idade: 4,
            cpf: "215.562.340-10"
          },
        ],
        question1: true,
        question2: "Todos focados pela comunidade!"
      },
      {
        id: 3,
        isAutist: false,
        isVolt: true,
        isCoordAutist: true,
        isAdmin: false,
        status: false,
        date: data,
        nome: 'Matheus Tester',
        idade: 30,
        bairro: "santa rita",
        address: 'Rua São Francisco',
        phone: 83981234696,
        cpf: "333.333.333-33",
        nis: 1020304051,
        email: "matheus@tester",
        password: "tester",
        filhos: [
          {
            id: 1,
            name: "Rafael",
            idade: 4,
            cpf: "215.562.340-10"
          },
        ],
        question1: true,
        question2: "Todos focados pela comunidade!"
      },
];

router.get('/', (req, res) => res.json({users}))
router.get('/:id', (req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('Usuário não encontrado!')
  }

  res.json(user)
})
router.post('/', (req, res) => {
  const lastId = users[users.length - 1]?.id
  users.push({
    id: lastId + 1,
    status: req.body.status,
    isAutist: false,
    isVolt: req.body.isVolt,
    isAdmin: req.body.isAdmin,
    date: data,
    avatar: req.body.avatar,
    nome: req.body.nome,
    idade: req.body.idade,
    address: req.body.address,
    bairro: req.body.bairro,
    phone: req.body.phone,
    cpf: req.body.cpf,
    nis: req.body.nis,
    filhos: req.body.filhos,
    email: req.body.email,
    password: req.body.password,
    question1: req.body.question1,
    question2: req.body.question2,
  })
  res.json('Usuário cadastrado!')
})
router.put('/:id', (req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('Usuário não encontrado!')
  }

  const updatedUser = {
    ...user,
    isAutist: req.body.isAutist,
    isVolt: req.body.isVolt,
    isEtg: req.body.isEtg,
    isCoordMulher: req.body.isCoordMulher,
    isCoordAutist: req.body.isCoordAutist,
    isCoordSaude: req.body.isCoordSaude,
    isCoordAlimentar: req.body.isCoordAlimentar,
    isCoordPasse: req.body.isCoordPasse,
    isCoordCidadania: req.body.isCoordCidadania,
    isCoordProtagonista: req.body.isCoordProtagonista,
    status: req.body.status,
    nome: req.body.nome,
    idade: req.body.idade,
    address: req.body.address,
    bairro: req.body.bairro,
    avatar: req.body.avatar,
    phone: req.body.phone,
    cpf: req.body.cpf,
    nis: req.body.nis,
    filhos: req.body.filhos,
    email: req.body.email,
    apiService: req.body.apiService,
    password: req.body.password,
    parentsName: req.body.parentsName,
    question1: req.body.question1,
    question2: req.body.question2
  }

  users = users.map(user => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser
    }
    return user
  })

  res.json("Usuário atualizado com sucesso!")
})
router.delete('/:id', (req, res) => {
  const userId = req.params.id

  users = users.filter(user => Number(user.id) !== Number(userId))

  res.json('Usuário deletado!')
})

export default router;