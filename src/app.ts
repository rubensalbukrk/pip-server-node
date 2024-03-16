import express from 'express'
import cors from 'cors';
import routes from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.get('/', (req, res) => {
    res.json({
        message: "Bem vindo, estamos no ar! 👋🌎"
    })
})

export default app;