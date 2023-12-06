import express from 'express'
import multer from 'multer'
import path from 'path'
import cors from 'cors';
import {AprovadoProps} from './src/models/aprovados'
import { UserProps } from './src/models/user';
import {SolicitationsProps} from './src/models/solicitationsProps'

export const app = express()

const hoje = new Date()
const data: string = hoje.getDate().toString().padStart(2,'0') + "/" + String(hoje.getMonth() + 1).padStart(2,'0') + "/" + hoje.getFullYear() + ` as ` + hoje.toLocaleTimeString()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve('uploads'));
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime();

        callback(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage });

app.listen(5500, () => console.log('Rodando na porta 5500'))
app.use(cors())
app.use(express.json())
app.use('/require/files', express.static('uploads'));

app.post("/require/upload", upload.single("file"), (req, res) =>{
  return res.json(req.file?.filename);
});

let users: UserProps[] = [
  {
      id: 272,
      isAdmin: true,
      isAutist: false,
      isVolt: false,
      status: true,
      date: data,
      nome: "Rubens Albuquerque",
      idade: 27,
      avatar: "aaaa",
      address: "Bariloche Internation",
      bairro: "Santa Rita",
      phone: 839867711,
      cpf: 11111111111,
      nis: 2321051,
      email: "rubiinho@live.it",
      password: "123456",
      filhos: [
        {
          name: 'Rafael SAntos',
          idade: 4,
          cpf: 2155623400
        },
        {
          name: "Miguel",
          idade: 2,
          cpf: 312563333-0
        }
      ],
      question1: true,
      question2: "Todos focados pela comunidade!"
    },
    {
      id: 273,
      isVolt: false,
      isAutist: false,
      isAdmin: false,
      status: true,
      date: '3/8/2023 23:30:08',
      nome: 'David Santana',
      idade: 30,
      avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/336218919_554045106561603_6296707162473895037_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=09ERwkLkpl4AX9HWGxr&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfC1sSmzjxG6WCEnwjsrZ3cAYJJ-pmXWOTzw0pwamBF0mQ&oe=650B7E0B&_nc_sid=ee9879",
      address: 'Rua São Francisco',
      bairro: "Tibiri",
      phone: 83981234696,
      cpf: 22222222222,
      nis: 111112,
      email: "david@pip",
      password: "admin",
      filhos: [
        {
          name: "Rafael",
          idade: 4,
          cpf: 2155623400
        },
      ],
      question1: true,
      question2: "Todos focados pela comunidade!"
    },
    {
      id: 274,
      isAutist: false,
      isVolt: true,
      isAdmin: false,
      status: false,
      date: data,
      nome: 'Matheus Tester',
      idade: 30,
      bairro: "santa rita",
      avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/371451584_679092440943712_7467185518078917342_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=gKSPSH9vAdkAX81Y6f-&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfDXSCkQL7w1xKoX_VDKYGE_kV4jWvxZAWWgrWBKTxHqMw&oe=650AABA8&_nc_sid=ee9879",
      address: 'Rua São Francisco',
      phone: 83981234696,
      cpf: 33333333333,
      nis: 1020304051,
      email: "matheus@tester",
      password: "tester",
      filhos: [
        {
          name: "Rafael",
          idade: 4,
          cpf: 2155623400
        },
      ],
      question1: true,
      question2: "Todos focados pela comunidade!"
    },
  ];

let notices = [
  {
    id: 1,
    date: data,
    title: 'Fique por dentro',
    mensagem: 'Aqui você tem todas as notícias e informações sobre seus benefícios!',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX2zW5rDCoG_sRJkK7JltISOIxclfsaQNVbg2GgMdxYcPQ_6kBbgk8pnaOV1Y8bASDLf0&usqp=CAU',
  },
    {
    id: 2,
    date: data,
    title: 'NOVA ATUALIZAÇÃO',
    mensagem: 'Agora você pode solicitar nossos serviços, é facil!',
    img: 'https://t3.ftcdn.net/jpg/04/51/58/68/360_F_451586836_NNmw4WcMDEaPQHrtAzL6kRFNunp4eq1e.jpg',
  },
]

let solicitations: SolicitationsProps[] = [

];
let aprovados: AprovadoProps[] = [
  {
    id: 1,
    nome: "Rubens",
    date: "29/11/2025",
    service: "all in one",
    status: "aprovado",
    cpf: 111111121
  },
];

app.route('/require/aprovados').get((req, res) => res.json({
  aprovados
}))
app.route('/require/aprovados').post((req, res) => {
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
app.route('/require/aprovados/:id').put((req, res) => {
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
app.route('/require/aprovados/:id').delete((req, res) => {
  const aprovadoId = req.params.id

  aprovados = aprovados.filter(aprovado => Number(aprovado.id) !== Number(aprovadoId))

  res.json('Aprovação cancelada!')
})


app.route('/require/solicitations').get((req, res) => res.json({
  solicitations
}))
app.route('/require/solicitations').post((req, res) => {
  const lastId = solicitations[solicitations.length - 1].id
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
app.route('/require/solicitations/:id').put((req, res) => {
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
app.route('/require/solicitations/:id').delete((req, res) => {
  const solicitationId = req.params.id

  solicitations = solicitations.filter(solicitation => Number(solicitation.id) !== Number(solicitationId))

  res.json('Solicitação excluída!')
})


app.route('/require/users').get((req, res) => res.json({
  users
}))

app.route('/require/users/:id').get((req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('Usuário não encontrado!')
  }

  res.json(user)
})

app.route('/require/users').post((req, res) => {
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
app.route('/require/users/:id').put((req, res) => {
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
    requireService: req.body.requireService,
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
app.route('/require/users/:id').delete((req, res) => {
  const userId = req.params.id

  users = users.filter(user => Number(user.id) !== Number(userId))

  res.json('Usuário deletado!')
})



app.route('/require/notices').get((req, res) => res.json({
  notices
}))

app.route('/require/notices').post((req, res) => {
  const lastId = notices[notices.length - 1]?.id
  notices.push({
    id: lastId + 1,
    date: data,
    title: req.body.title,
    img: req.body.img,
    mensagem: req.body.mensagem

  })
  res.json('Notícia adicionada!')
})

app.route('/require/notices/:id').put((req, res) => {
  const noticeId = req.params.id

  const notice = notices.find(user => Number(user.id) === Number(noticeId))

  if (!notice) {
    return res.json('Notícia não encontrada!')
  }

  const updatedNotice = {
    ...notice,
    date: data,
    title: req.body.title,
    mensagem: req.body.mensagem
  }

  notices = notices.map(notice => {
    if (Number(notice.id) === Number(noticeId)) {
      notice = updatedNotice
    }
    return notice
  })

  res.json("Notícia atualizada!")
})

app.route('/require/notices/:id').delete((req, res) => {
  const noticeId = req.params.id

  notices = notices.filter(notice => Number(notice.id) !== Number(noticeId))

  res.json('Notícia deletada!')
})