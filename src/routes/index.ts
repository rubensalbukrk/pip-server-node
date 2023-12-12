import express from 'express'
import notices from './notices'
import users from './users'
import solicitations from './solicitations'
import aprovados from './aprovados'
import { MessageResponse } from './../interfaces/messageResponse';

const router = express.Router()

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: "Bem vindo ao nosso sistema 👋🌎"
    })
})

router.use('/notices', notices)
router.use('/users', users)
router.use('/solicitations', solicitations)
router.use('/aprovados', aprovados)

export default router;