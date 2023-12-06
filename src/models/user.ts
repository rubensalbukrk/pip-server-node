interface UserProps {
    id: number
    isAdmin?: boolean
    status: boolean
    isAutist?: boolean
    isVolt?: boolean
    date: string
    avatar?: string
    nome: string
    idade: number
    address: string
    bairro: string
    phone: number
    cpf: number
    nis: number
    filhos?: Array<{name: string, cpf: number, idade: number}>
    email: string,
    password: string
    question1?: boolean
    question2?: string
}

export {UserProps}