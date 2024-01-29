import { createContext, useContext, useState } from 'react'
import { CrearTurnos, ListarTurnos,  } from '../../api/tareas.api'
// import { Alert } from '@mui/material'



export const TurnosContext = createContext()



////////////////////para traer todo el listado

export const TurnosContextProv = ({ children }) => {
    const [turnos, setTurnos] = useState([])

    async function TraerTurnos() {
        const respuesta = await ListarTurnos()
        setTurnos(respuesta.data)
    }

    const darTurno = async (turno) => {
        try {
            const response = await CrearTurnos(turno)
            console.log(response)

        } catch (error) {
            // console.error(error)
        }
    }





    return <TurnosContext.Provider value={{ turnos, darTurno, TraerTurnos }}>
        {children}
    </TurnosContext.Provider>
}