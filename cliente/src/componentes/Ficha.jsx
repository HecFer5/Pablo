import { useEffect, useState } from 'react'
import { useTareas } from '../componentes/context/hooks'
import { useParams, Link } from 'react-router-dom'

const Ficha = () => {

  const {editarRegisto } = useTareas()
  const [task, setTask] = useState({
    nombre: "",
    apellido: "",
    telefono:"",
  })
// console.log(task.imagen)
  const params = useParams()

  useEffect(() => {
    const traerTarea = async () => {
      if (params.idpaciente) {
        const task = await editarRegisto(params.idpaciente)
        setTask({
          nombre: task.nombre,
          apellido: task.apellido,
          telefono: task.telefono,
          imagen: task.imagen
        })
      }
    }
    traerTarea()
  }, [])

  return (
    <div className='justify-center flex'> 
    <div className="max-w-sm bg-white border border-gray-400 rounded shadow p-3">
    <div className="col  text-left mb-2 ">{`Número de orden: ${params.idpaciente}`}</div>
      <a href="#">
        <img src={task.imagen} alt="imagen" className='rounded-t-lg'/>
      </a>
        <div className="col border mt-1">{`Nombre: ${task.nombre}`}</div>
        <div className="col border mt-1">{`Apellido: ${task.apellido}`}</div>
        <div className="col border mt-1 bg-orange-200 p-1 rounded-md">{`telefonos: ${task.telefono}`}</div>
        <li className="block bg-blue-700 mt-3 px-2 py-1 text-white text-center rounded-md w-full"><Link to={'/tabla/'} >Volver</Link></li>
      </div>
    </div>
  )
}

export default Ficha