interface FilhosProps {
    id: number
    nome: string
    cpf: string
    idade: number
    isAutist: boolean
    isPcd: boolean
}

interface UserProps {
    id: number 
    status: boolean
    isAdmin?: boolean
    isAutist?: boolean
    isVolt?: boolean
    isCoordAutist?: boolean
    isCoordMulher?: boolean
    isCoordSaude?: boolean
    isCoordProtagonista?: boolean
    isCoordAlimentar?: boolean
    isCoordPasse?: boolean
    isCoordCidadania?: boolean
    date: string
    avatar?: string
    nome: string
    idade: number
    address: string
    bairro: string
    phone: number
    cpf: string
    nis: number
    parents: FilhosProps[]
    email: string,
    password: string
    question1?: boolean
    question2?: string
}

export {UserProps}