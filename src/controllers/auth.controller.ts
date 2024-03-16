import jwt from 'jsonwebtoken'
import { Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { _findUser } from '../repositorys/user-repository';
var db = require('../../firebase')

const getUser = async (cpf: string, password: string) => {

  try {
    const usersRef = db.collection('usuarios');
    const user = await usersRef
    .where('cpf', '==', cpf)
    .get();
    const thisUser = user.docs[0].data();

    return thisUser
  } catch (error) {
    console.error("Problema ao obter usuário, tente novamente!")
  }
};

export const authenticate = async (req: Request, res: Response, next: any) => {
    
   try {
    const {cpf, password} = req.body
    const user = await getUser(cpf, password);
    if(!(cpf && password)){
        res.status(400).send('Email e senha são obrigatórios!')
    }
   
    if(!user){
        res.status(401)
        .send('Email e/ou senha inválidos!')
    }
     //retirado bcrypt bcrypt.compareSync(password, user.password)
    if(user){
        const token = jwt.sign(
            {
                id: user.id, 
                isAdmin: user?.isAdmin,
                isVolt: user?.isVolt,
                isEtg: user?.isEtg,
                isCoordAutist: user?.isCoordAutist,
                isCoordMulher: user?.isCoordMulher,
                isCoordSaude: user?.isCoordSaude,
                isCoordProtagonista: user?.isCoordProtagonista,
                isCoordAlimentar: user?.isCoordAlimentar,
                isCoordPasse: user?.isCoordPasse,
                isCoordCidadania: user?.isCoordCidadania,
                isCoordCursos: user?.isCoordCursos,
                isCoordOptometria: user?.isCoordOptometria,
                isBusiness: user?.isBusiness,
                nome: user.nome,
                idade: user.idade,
                address: user.address,
                bairro: user.bairro,
                phone: user.phone,
                avatar: user?.avatar,
                cpf: user.cpf,
                nis: user?.nis,
               
                email: user?.email,
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
        res.status(401).send(`CPF e SENHA não confere!`)
    }

   } catch (e) {
    res.status(400).send(e)
   }

}