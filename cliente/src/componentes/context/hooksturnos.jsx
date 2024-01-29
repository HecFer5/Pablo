import { createContext, useContext } from 'react'
import {TurnosContext} from './TurnosContext'



export const useTurnos = () => {
    const context = useContext(TurnosContext)
    if (!context) {
        throw new Error("hay que usarlo en context")
    }
    return context
}