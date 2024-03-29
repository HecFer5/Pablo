import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useTareas } from './context/hooks'
import { useParams, useNavigate, Link } from 'react-router-dom'
import dayjs from 'dayjs';
// import 'dayjs/locale/es';
import esLocale from 'dayjs/locale/es'; // Importar el archivo de localización para español
import updateLocale from 'dayjs/plugin/updateLocale'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
// import 'react-big-calendar/lib/sass/styles';

import { AiTwotoneDelete } from "react-icons/ai";
import './Turno.css'


dayjs.extend(updateLocale);
dayjs.locale(esLocale);

dayjs.updateLocale('es', {
    weekStart: 0,
});


const localizer = dayjsLocalizer(dayjs, { weekStart: 0 });
const messages = {
    allDay: 'Dia Entero',
    previous: 'Atrás',
    next: 'Adelante',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    showMore: (total) => `+ (${total}) Eventos`,
}


const Turno6 = () => {
    const [events, setEvents] = useState([]);
    const [datos, setDatos] = useState([])
    const localizer = dayjsLocalizer(dayjs)
    const [selectedDate, setSelectedDate] = useState(dayjs(Date()).toDate());

    const params = useParams()

    const { darTurno } = useTareas()
    const [task, setTask] = useState({
        "fecha": dayjs(Date()).toString(),
        "pacienteid": 0,
        "fechafin": dayjs(Date()).toString(),
        "observac": "",

    })
    const navigate = useNavigate()

//  const xTitulo = event.xTitulo
    const EventComponent = ({ event }) => (
        <div  className={event.color}>
            <span className=' block ml-5 -mt-2 pt-3 pb-3' >{event.title} <button className=" bg-transparent  ml-1  mt-1 text-red-500 w-min rounded-md icon-large " onClick={() => handleDeleteEvent(event.id)}><AiTwotoneDelete />
            </button></span>
            {/* <span style={{ textAlign: 'center' }}>{event.nombre}</span> Muestra el parámetro 'nombre' */}


           

        </div>
    
    );

 



    // //!  para seleccionar desde el calendario
    const Selector = (slotInfo) => {
        const { start } = slotInfo;
        console.log(start, 'en selector')

        console.log(start, dayjs(Date()).toDate())

        if (start < dayjs(Date()).toDate()) {

            navigate(`/turnopasado/${params.idpaciente}`)
        } else {
            if (params.idpaciente) {
                navigate(`/clickturno/${params.idpaciente}`, { state: { start } });
                console.log(params.idpaciente, 'entrantdo')

            }else{
                navigate(`/clickturno`, { state: { start } });
                console.log(start, 'entrantdo')


            }
        }




    };
    //     //! fin 


    const handleDeleteEvent = async (idturnos) => {

        const response = await axios.delete("http://localhost:4000/turno/" + idturnos);

        // Verificar la respuesta de la API
        if (response.status === 200) {
            // Los datonis se enviaron correctamente
            navigate('/confirmacion')
            console.log('Los datos se enviaron correctamente', idpaciente);
        } else {
            // Hubo un error al enviar los datos
            console.log('Hubo un error al enviar los datos');
        }
    };

    ////////////////////////////contesto you
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4001/turno');
            const data = response.data;
            const formattedEvents = data.map((turno) => ({
                title: `${turno.nombre ? turno.nombre : 'ACTIVIDAD'} ${turno.apellido}${turno.observac ? ` (${turno.observac})` : ''}`,
                start: dayjs(turno.fecha).toDate(),
                end: dayjs(turno.fechafin).toDate(),
                id: turno.idturnos,
                color:`${turno.nombre ? 'bg-blue-300 text-black font-semibold':  'bg-green-300 text-black font-semibold'}`
                
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error al obtener los eventos del calendario:', error);
        }

       
    };


    const traerDatos = async () => {
        try {
            const response = await axios.get("http://localhost:4001/tarea/" + params.idpaciente);
            const data = response.data;

            const datosPacientes = ({
                nombre: data.nombre,
                apellido: data.apellido

            });

            setDatos(datosPacientes);
        } catch (error) {
            console.error('Error al obtener los eventos del calendario:', error);
        }
    };



    useEffect(() => {
        fetchEvents();
        if (params.idpaciente) {
            traerDatos()
        }
    }, [params.idpaciente]);

    const darElTurno = async (values, actions) => {
        const originalDate = dayjs(selectedDate);
        const newDate = originalDate.add(30, 'minute');


        values.fecha = dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss');
        values.fechafin = newDate.format('YYYY-MM-DD HH:mm:ss');
        values.pacienteid = params.idpaciente
        navigate('/otroturno')
        await darTurno(values)

    }

    const irActividad = () => {
        const irFuncion = 1
        console.log(irFuncion)
        // Selector()
    }

    const irPaciente = () => {
        const irFuncion = 2
        console.log(irFuncion)
    }

    ////////////////////////////////////////////

   
    

    return (
        <>
            <Calendar
                style={{
                    height: '65vh',
                    wide: '35vw',
                    marginTop: '5vh',
                    marginLeft: '3vw',
                    marginRight: '3vw',
                    
                }}

                messages={messages}
                selectable={true} // Establecer selectable en true
                onSelectSlot={Selector}
                step={15}
                timeslots={1}
                localizer={dayjsLocalizer(dayjs, { weekStart: 0 })} events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView='week'
                min={dayjs('2024-01-22T08:00:00').toDate()}
                max={dayjs('2024-01-22T18:00:00').toDate()}


                components={{
                    event: EventComponent,
                }}
                formats={{
                    dayHeaderFormat: date => {
                        return dayjs(date).format('dddd DD [de] MMMM [de] YYYY')
                    },
                    monthHeaderFormat: date => {
                        return dayjs(date).format('dddd DD [de] MMMM [de] YYYY')
                    },
                    dayFormat: date => {
                        return dayjs(date).format(" dddd  DD")
                    },
                }}
            />

            <div className='container mx-auto mb-2 p-1'>
                <Formik
                    initialValues={task}
                    enableReinitialize={true}
                    onSubmit={darElTurno}
                >

                    {({ handleSubmit, handleChange, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        'DateTimePicker',

                                    ]}>
                                    <DemoItem >
                                        {/* CAJA PARA LOS ELEMENTOS */}
                                        <div className="flex flex-col sm:items-center sm:flex-row justify-around items-center p-5 gap-4">

                                            {/* TITULO */}
                                            {params.idpaciente ? <div className="text-white bg-blue-500 px-3 py-1 font-semibold rounded-xl h-full">{datos.nombre} {datos.apellido}</div> : <button className="text-black bg-red-500 hover:bg-red-900 px-3 py-1 font-semibold rounded-xl h-full " onClick={irPaciente}><Link to={'/turnoDirecto/'}>¿PACIENTE?</Link></button>}


                                            <button className="text-black bg-green-500 hover:bg-blue-700 px-3 py-1 font-semibold rounded-xl h-full " onClick={irActividad}><Link to={'/haceractividad'}>ACTIVIDAD</Link></button>
                                            {/* SELECTOR DE FECHA */}
                                            <DateTimePicker

                                                defaultValue={dayjs(Date()).toDate()}
                                                value={dayjs(task.fecha)}
                                                onChange={(date) => setSelectedDate(date)}
                                                format='ddd DD [de] MMMM [de] YYYY hh:mm '
                                                className='selector h-full mt-2'

                                            />
                                            {/* BOTON INGRESAR */}

                                            {params.idpaciente ? <button type='submit' className="bg-lime-700 px-2 py-1 text-white rounded-md  ">Ingresar</button> : <button disabled type='submit' className="bg-green-300 px-2 py-1 text-white rounded-md">Ingresar</button>}


                                            {/* BOTON CANCELAR */}

                                            <button className="bg-red-700 px-2 py-1 text-white rounded-md"><Link to={'/'}>Cancelar</Link></button>




                                        </div>

                                        {/* OBSERVACIONES */}
                                        <input className="px-10 py-1 rounded-sm border-2 h-10   " type="text"
                                            onChange={handleChange}
                                            value={values.observac}
                                            placeholder='Ingresar observaciones'
                                            name='observac'
                                        />

                                        {/* FIN DE LA CAJA PARA ELEMENTOS */}

                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Form>
                    )}
                </Formik>



            </div>
        </>
    )
}

export default Turno6
