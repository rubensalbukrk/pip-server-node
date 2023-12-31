import dataNow from '../utils/data';
import express from 'express';
import { verifyToken } from './../middlewares/auth';
import {create,get, remove } from '../controllers/aprovados.controller'
import bodyParser from 'body-parser';

let aprovados = [
    {
        id: 1,
        nome: "Rubens",
        date: `${dataNow}`,
        cpf: "111.222.333-12",
        service: "Emitir RG",
        status: "Em andamento..."
    }
]

const router = express.Router();
router.use(bodyParser.json());

router.post('/', create);
router.get('/', get);
router.delete('/:id', remove)

export default router;