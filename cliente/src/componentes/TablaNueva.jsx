import axios from 'axios'
import { isPromise } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'

const TablaNueva = () => {

    const llamar = (telefono) => {
        // Lógica para activar la llamada telefónica
        window.location.href = `tel:${telefono}`;

        console.log(`Llamando a ${telefono}`);
    };

    const enviarMensaje = (telefono) => {
        // Lógica para abrir la aplicación de WhatsApp con el número de teléfono
        console.log(`Enviando mensaje a ${telefono}`);
    };

    const [registros, setRegistros] = useState([])
    const [open, setOpen] = useState(false)
    const [abierto, setAbierto] = useState(false)
    const xLink = 'md:ml-8 md:my-0 my-7 font-semibold'
    const navigate = useNavigate()

    const ListarTareas = async () =>
        await axios.get('http://localhost:4001/tarea').then((response) => {
            const data = response.data
            setRegistros(data)
        })

    useEffect(() => {
        ListarTareas()
    }, [])

    const refEstatus = 1
    const irAlerta = (idpaciente) => {
        navigate('/borrar/' + idpaciente, { state: { refEstatus } })
    }

    const registrosFiltrados = registros.filter(registro => registro.idpaciente !== 33);


    return (
        <>
            <div className='text-sm text-black text-center bg-blue-100 mt-2'>LISTADO DE PACIENTES EN ACTIVIDAD</div>


            <div className='text-sm text-orange-700 text-center bg-orange-100 mt-2'>Haga click sobre el número para ver la ficha completa y click en "Editar" para correcciones</div>


            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Nº</th>
                                        <th scope="col" className="px-6 py-4"></th>
                                        <th scope="col" className="px-6 py-4">NOMBRE</th>
                                        <th scope="col" className="px-6 py-4"></th>
                                        <th scope="col" className="px-6 py-4"></th>


                                        <th scope="col" className="px-6 py-4">TELEFONO</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {registrosFiltrados.map(registro => (
                                        <tr key={registro.idpaciente} className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">

                                            <td >

                                                <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/ficha/' + registro.idpaciente} >{registro.idpaciente}</Link></li>
                                            </td>
                                            <td >
                                                <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/turno/' + registro.idpaciente} >Turno</Link></li>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">{`${registro.apellido}, ${registro.nombre}`}</td>
                                           
                                            <td >
                                                <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/tablahistorialturnos/' + registro.idpaciente} > HISTORIAL</Link></li>
                                            </td>

                                            <td>
                                                <button
                                                    className="ml-2 text-blue-500"
                                                    onClick={() => llamar(registro.telefono)}
                                                >
                                                    Llamar
                                                </button>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">{registro.telefono}</td>
                                            <td>
                                                <li className="block bg-lime-700 px-2 py-1 text-white w-min rounded-md"><Link to={'/edit/' + registro.idpaciente} >Editar</Link></li>
                                            </td>
                                            <td>
                                                <button className="block bg-red-700 px-2 py-1 text-white w-min rounded-md" onClick={() => irAlerta(registro.idpaciente)}>Borrar</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default TablaNueva