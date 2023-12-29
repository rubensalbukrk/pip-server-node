import jwt from 'jsonwebtoken'
import { Request, Response} from 'express'
import { _findUser } from '../repositorys/user-repository'
import bcrypt from 'bcrypt'

export const authenticate = async (req: Request, res: Response, next: any) => {
    
   try {
    const {cpf, password} = req.body
    const user = await _findUser(cpf, password)
    if(!(cpf && password)){
        res.status(400).send('Email e senha são obrigatórios!')
    }
   
    if(!user){
        res.status(401)
        .send('Email e/ou senha inválidos!')
    }
    
    if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign(
            {
                id: user.id, 
                isAdmin: user?.isAdmin,
                isVolt: user?.isVolt,
                isCoordAutist: user?.isCoordAutist,
                isCoordMulher: user?.isCoordMulher,
                isCoordSaude: user?.isCoordSaude,
                isCoordProtagonista: user?.isCoordProtagonista,
                isCoordAlimentar: user?.isCoordAlimentar,
                isCoordPasse: user?.isCoordPasse,
                isCoordCidadania: user?.isCoordCidadania,
                nome: user.nome,
                idade: user.idade,
                address: user.address,
                bairro: user.bairro,
                phone: user.phone,
                avatar: user?.avatar,
                cpf: user.cpf,
                nis: user?.nis,
                email: user.email,
                question1: user?.question1,
                question2: user?.question2,
                parents: user?.parents
            },
            String(process.env.TOKEN_KEY),
            {
                expiresIn: "3hr"
            }
        )
        const decodedUser = jwt.decode(token)
        res.status(200).send({token: token, user: decodedUser})
        
    }else {
        res.status(401).send(`CPF e/ou senha inválidos!`)
    }

   } catch (e) {
    res.status(400).send(e)
   }

}