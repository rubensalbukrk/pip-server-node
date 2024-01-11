import jwt from 'jsonwebtoken'
import { Request, Response} from 'express'
import bcrypt from 'bcrypt'
import admin from "firebase-admin";
import { _findUser } from '../repositorys/user-repository';

const users = admin.firestore().collection('usuarios');

const findUser = async (cpf, password) => {
    try {
        // Consulta para encontrar um usuário com base no CPF e senha
        const querySnapshot = await users
          .where('cpf', '==', cpf)
          .where('password', '==', password)
          .get();
    
        // Verifica se algum usuário foi encontrado
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log('Usuário encontrado:', userData);
            return userData
          });
         
        } else {
          console.log('Nenhum usuário encontrado com o CPF e senha fornecidos.');
        }
      } catch (error) {
        console.error('Erro ao procurar usuário:', error.message);
      }
}

export const authenticate = async (req: Request, res: Response, next: any) => {
    
   try {
    const {cpf, password} = req.body
    const user = await _findUser(cpf, password);
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
                password: user?.password,
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
        res.status(401).send(`CPF e/ou senha inválidos!`)
    }

   } catch (e) {
    res.status(400).send(e)
   }

}