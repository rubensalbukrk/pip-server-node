import jwt from 'jsonwebtoken'
import { Request, Response} from 'express'
import { users } from '../routes/users'
import bcrypt from 'bcrypt'

export const authenticate = (req: Request, res: Response, next: any) => {

   try {
    const {cpf, password} = req.body

    if(!(cpf && password)){
        res.status(400).send('Email e senha são obrigatórios!')
    }

    const user = users.find(item => item.cpf === cpf)
   
    if(!user){
        res.status(401)
        .send({message: `Email e/ou senha inválidos!`})
    }
    
    if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign(
            {
                id: user.id, 
                status: user.status,
                isAdmin: user.isAdmin,
                isAutist: user.isAutist,
                isVolt: user.isVolt,
                isCoordAutist: user.isCoordAutist,
                isCoordMulher: user.isCoordMulher,
                isCoordSaude: user.isCoordSaude,
                isCoordProtagonista: user.isCoordProtagonista,
                isCoordAlimentar: user.isCoordAlimentar,
                isCoordPasse: user.isCoordPasse,
                isCoordCidadania: user.isCoordCidadania,
                date: user.date,
                nome: user.nome,
                idade: user.idade,
                address: user.address,
                bairro: user.bairro,
                phone: user.phone,
                cpf: user.cpf,
                nis: user.nis,
                filhoss: user.filhos,
                email: user.email,
                question1: user.question1,
                question2: user.question2,
            },
            String(process.env.TOKEN_KEY),
            {
                expiresIn: "3hr"
            }
        )
        res.status(200).send({token})
    }else {
        res.status(401).send(`CPF e/ou senha inválidos!`)
    }

   } catch (e) {
    res.status(400).send(e)
   }

}