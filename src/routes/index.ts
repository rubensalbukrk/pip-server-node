import { MessageResponse } from './../interfaces/messageResponse';
import { verifyToken } from './../middlewares/auth';
import { authenticate } from './../controllers/auth.controller';
import express from 'express'
import notices from './notices'
import users from './users'
import solicitations from './solicitations'
import aprovados from './aprovados'

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
router.use('/login', authenticate)

export default router;