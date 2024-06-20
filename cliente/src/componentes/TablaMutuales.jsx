import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTareas } from "../componentes/context/hooks"
import { Formik, Form } from 'formik'



const TablaMutuales = () => {

    const [mutuales, setMutuales] = useState([])
    const { nuevaMutual } = useTareas()
    const [task, setTask] = useState({
        nombremutual: "",
        idmutual: 0,
        cantidadpacientes: 0

    })

    const xLink = 'md:ml-8 md:my-0 my-7 font-semibold'
    const navigate = useNavigate()

    const ListarMutuales = async () =>
        await axios.get('http://localhost:4000/mutual').then((response) => {
            const data = response.data
            setMutuales(data)
        })

    useEffect(() => {
        ListarMutuales()
    }, [])



    const borrarMutual = async (idmutual) => {
        const response = await axios.delete("http://localhost:4000/mutual/" + idmutual);

        // Verificar la respuesta de la API
        if (response.status === 200) {
            // Los datonis se enviaron correctamente
            navigate('/confirmacion')


        } else {
            // Hubo un error al enviar los datos
            console.log('Hubo un error al enviar los datos');
        }
    };


    return (
        <>
            <div className=" flex justify-between">
            </div>
            <div className='flex justify-center'>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="ml-20 inline-block  py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <div className='text-2xl text-white text-center font-bold bg-blue-500
                 mb-10  max-w-md px-4 py-2 mt-5 ml-5'>LISTADO MUTUALES</div>
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead
                                        className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Nº</th>
                                            <th scope="col" className="px-6 py-4">NOMBRE</th>
                                            <th scope="col" className="px-6 py-4">CANTIDAD DE AFILIADOS</th>

                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {mutuales.map(mutual => (
                                            mutual.idmutual !== 33 && (
                                                <tr key={mutual.idmutual} className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                                    <td >
                                                        <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/mutualespacientes/' + mutual.idmutual} > {mutual.idmutual}</Link></li>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 font-bold">{`${mutual.nombremutual}`}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-bold">{`${mutual.cantidadpacientes}`}</td>
                                                    <td>
                                                        <button className="block bg-red-700 px-5 py-1 text-white w-min rounded-md" onClick={() => borrarMutual(mutual.idmutual)}>Borrar</button>
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


                <div class=" justify-center items-center ml-40">
                    <div className='text-2xl text-white text-center font-bold bg-blue-500
                 mb-10  max-w-md px-14 py-2 mt-8'>Ingreso nuevas mutuales</div>
                    <Formik
                        initialValues={task}
                        enableReinitialize={true}
                        onSubmit={async (values, actions) => {
                            console.log(values)
                            navigate('/otroReg')
                            await nuevaMutual(values)
                            setTask({
                                nombremutual: "",
                            })
                        }}
                    >

                        {({ handleChange, handleSubmit, values, isSubmitting }) => (
                            <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-xl rounded-md p-4 mx-auto  mt-10 opacity-100">
                                <div className="flex">
                                    <label className="block">Mutual</label>
                                    <input className="px-2 py-1 rounded-sm w-full ml-5" required type="text"
                                        name='nombremutual'
                                        onChange={handleChange}
                                        placeholder='Campo obligatorio'
                                        value={values.nombremutual} />

                                </div>
                                <div className='flex'>

                                    <button type='submit' disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md mt-4">
                                        {isSubmitting ? "Guardando" : "Guardar"}</button>
                                    <button className="block bg-red-500 px-2 py-1 text-white w-full rounded-md mt-4 ml-6" onClick={() => navigate('/turno')}>Cancelar</button>

                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default TablaMutuales