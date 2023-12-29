import * as yup from 'yup';

const required = yup.string().required();

export const userValidation = yup.object({
    nome: required,
    idade: required,
    address: required,
    bairro: required,
    phone: required,
    cpf: required,
    password: required,
})