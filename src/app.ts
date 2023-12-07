import express from 'express'
import cors from 'cors';
import api from './api'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', api)

app.get('/', (req, res) => {
    res.json({
        message: "Bem vindo, este sistema está protegido e criptografado de ponta a ponta! 👋🌎"
    })
})

export default app;