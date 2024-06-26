import { createContext, useContext, useState, useReducer } from 'react'
import {
    ListarTareas, BorrarTareas, CrearTareas, ListarUnaTarea, EditaTarea, ListarInactivos, CrearTurnos, ListarTurnos, EliminarRegistro, ListarMutuales, CrearMutuales, ListarPacientesMutual, CrearHistorialTurnos, ListarImagenes
} from '../../api/tareas.api'
// import { Alert } from '@mui/material'
import UserReducer from './UserReducer'



export const TareasContext = createContext()



////////////////////para traer todo el listado

export const TareasContextProv = ({ children }) => {
    const estadoInicial = {
        registro: [],
        registroSelec: null
    }

    const [tareas, setTareas] = useState([])
    const [turnos, setTurnos] = useState([])
    const [mutuales, setMutuales] = useState([])
    const [state, dispatch] = useReducer(UserReducer, estadoInicial)
    const [imagen, setImagen] = useState([])

    async function TraerTurnos() {
        const respuesta = await ListarTurnos()
        setTurnos(respuesta.data)
    }

    async function TraerTareas() {
        const respuesta = await ListarTareas()
        setTareas(respuesta.data)
    }

    async function TraerMutuales() {
        const respuesta = await ListarMutuales()
        setMutuales(respuesta.data)
    }
    const crearRegistro = async (tarea) => {
        try {
            const response = await CrearTareas(tarea)

        } catch (error) {
            console.error(error)
        }
    }

    const darTurno = async (turno) => {
        try {
            const response = await CrearTurnos(turno)

        } catch (error) {
            console.error(error)
        }
    }

    const listarBorrados = async () => {
        try {
            const respuesta = await ListarInactivos()
            setTareas(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    const borrarTarea = async (idpaciente) => {
        try {

            const respuesta = await BorrarTareas(idpaciente)

            // setTareas(tareas.filter(tarea => tarea.idpaciente !== idpaciente))

        } catch (error) {
            console.log(error)
        }
    }

    const EliminarDelTodo = async (idpaciente) => {
        try {

            const respuesta = await EliminarRegistro(idpaciente)

            setTareas(tareas.filter(tarea => tarea.idpaciente !== idpaciente))

        } catch (error) {
            console.log(error)
        }
    }
    const editarRegisto = async (idpaciente) => {
        try {
            const respuesta = await ListarUnaTarea(idpaciente)
            setTareas(respuesta.data)
            return respuesta.data


        } catch (error) {
            console.log(error)
        }
    }

    const modificaRegistro = async (idpaciente, nuevosCampos) => {
        try {
            const respuesta = await EditaTarea(idpaciente, nuevosCampos)

            // console.log(respuesta)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevaMutual = async (tarea) => {
        try {
            const response = await CrearMutuales(tarea)

        } catch (error) {
            console.error(error)
        }
    }


    const TraerPacientesMutual = async (tarea) => {
        try {
            const response = await ListarPacientesMutual(tarea)

        } catch (error) {
            console.error(error)
        }
    }


    const TraerHistorialTurnos = async (tarea) => {
        try {
            const response = await CrearHistorialTurnos(tarea)

        } catch (error) {
            console.error(error)
        }
    }

    const TraerImagenes = async (idpaciente) => {
        try {
            const response = await ListarImagenes(idpaciente)
            setImagen(response.data)
            return response.data

        } catch (error) {
            console.error(error)
        }
    }

    return <TareasContext.Provider value={{
        // registro: state.registro,
        // registroSelec: state.registroSelec,
        tareas, TraerTareas, borrarTarea, crearRegistro, editarRegisto, modificaRegistro, listarBorrados, darTurno, TraerTurnos, EliminarDelTodo, TraerMutuales, nuevaMutual
        , TraerPacientesMutual, TraerHistorialTurnos, TraerImagenes
    }}>
        {children}
    </TareasContext.Provider>
}