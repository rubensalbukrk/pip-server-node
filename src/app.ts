import express from 'express'
import cors from 'cors';
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.get('/', (req, res) => {
    res.json({
        message: "Bem vindo, este sistema está protegido e criptografado de ponta a ponta! 👋🌎"
    })
})

export default app;