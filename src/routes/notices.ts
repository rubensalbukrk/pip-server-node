import express from 'express';
import data from '../utils/data'
import { NoticeProps } from '../interfaces/noticesProps';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

let notices: NoticeProps[] = [
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

router.get('/', verifyToken, (req, res) => res.json({
    results: {notices}
  }))
  
router.post('/', verifyToken, (req, res) => {
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
  
router.put('/:id', verifyToken, (req, res) => {
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
  
router.delete('/:id', verifyToken, (req, res) => {
    const noticeId = req.params.id
    notices = notices.filter(notice => Number(notice.id) !== Number(noticeId))
    res.json('Notícia deletada!')
  })

export default router;