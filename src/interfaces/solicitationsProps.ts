import { AprovadosProps } from "./aprovadosProps"

interface SolicitationsProps extends AprovadosProps {
    id: number
    pasta: string
    userInfo?: object[]
}

export {SolicitationsProps}