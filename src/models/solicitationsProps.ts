import { AprovadoProps } from "./aprovadosProps";

interface SolicitationsProps extends AprovadoProps {
    id: number
    pasta: string
    userInfo?: object[]
}

export {SolicitationsProps}