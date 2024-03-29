import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTareas } from "../componentes/context/hooks"


const TablaMutuales = () => {

    const [mutuales, setMutuales] = useState([])
    const xLink = 'md:ml-8 md:my-0 my-7 font-semibold'
    const navigate = useNavigate()

    const ListarMutuales = async () =>
        await axios.get('http://localhost:4001/mutual').then((response) => {
            const data = response.data
            setMutuales(data)
        })

    useEffect(() => {
        ListarMutuales()
    }, [])

    const irAlerta = (idmutual) => { 
           const refEstatus = 0
        navigate('/borrar/' + idmutual, { state: { refEstatus } })
    }

    const Rehabilita = (idmutual) => {
        const refEstatus = 2
        navigate('/borrar/' + idmutual, { state: { refEstatus } })
   
    }

    return (
        <>
         <div className='text-sm text-white text-center bg-red-400 mt-2'>LISTADO DE MUTUALES</div>

            <div className='text-sm text-orange-700 text-center bg-orange-100'>Haga click sobre el número para ver la ficha completa y click en "Editar" para correcciones</div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Nº</th>
                                        <th scope="col" className="px-6 py-4">NOMBRE</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {mutuales.map(mutual => (
                                        mutual.idmutual !== 33 && (
                                        <tr key={mutual.idmutual} className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            <td >
                                                <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/ficha/' + mutual.idmutual} >{mutual.idmutual}</Link></li>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">{`${mutual.nombre}`}</td>
                                            <td>
                                                <li className="block bg-lime-700 px-2 py-1 text-white w-min rounded-md"><Link to={'/edit/' + mutual.idmutual} >Editar</Link></li>
                                            </td>
                                            <td>
                                                <button className="block bg-red-700 px-2 py-1 text-white w-min rounded-md" onClick={() => irAlerta(mutual.idmutual)}>Borrar</button>
                                            </td>
                                        </tr>
                                        )
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

export default TablaMutuales