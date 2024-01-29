import { Component, useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useTareas } from './context/hooks'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios'


import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { AiTwotoneDelete } from "react-icons/ai";


dayjs.locale("es")

const localizer = dayjsLocalizer(dayjs)
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



    const EventComponent = ({ event }) => (

        <div >
            <span >{event.title}</span>
            <span>{event.nombre}</span> {/* Muestra el parámetro 'nombre' */}


            <button className=" bg-red-700 p-1 ml-8 text-white w-min rounded-md" onClick={() => handleDeleteEvent(event.id)}><AiTwotoneDelete />
            </button>
        </div>
    );

    const localizer = dayjsLocalizer(dayjs)
    const [selectedDate, setSelectedDate] = useState(dayjs(Date()).toDate());

    const params = useParams()
    const nombre = params.nombre

    const { darTurno } = useTareas()
    const [task, setTask] = useState({
        "fecha": dayjs(Date()).toString(),
        "pacienteid": 0,
        "fechafin": dayjs(Date()).toString(),
        "observac": "",

    })
    console.log(task.fecha, task.observac)
    const navigate = useNavigate()


    const handleDeleteEvent = async (id) => {
        try {

            await axios.delete(`http://localhost:4001/turno/${id}`);
            fetchEvents();
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };
    ////////////////////////////contesto you
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4001/turno');
            const data = response.data;
            const formattedEvents = data.map((turno) => ({
                title: turno.nombre + ' ' + turno.apellido + ' / ' + turno.observac,
                start: dayjs(turno.fecha).toDate(),
                end: dayjs(turno.fechafin).toDate(),
                id: turno.idturnos
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
        traerDatos()

    }, []);

    ////////////////////////////////////////////




    return (
        <div>
            <div>
                {`se dará un turno para ${datos.nombre} ${datos.apellido}`}
            </div>
            <Formik
                initialValues={task}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    values.fecha = dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss');
                    values.fechafin = dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss');
                    values.pacienteid = params.idpaciente
                    navigate('/otroturno')
                    await darTurno(values)

                }}
            >

                {({ handleSubmit, handleChange, values }) => (
                    <Form onSubmit={handleSubmit}   >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DateTimePicker',

                                ]}>
                                <DemoItem >
                                    <DateTimePicker
                                        className='w-80 mx-auto'
                                        defaultValue={dayjs(Date()).toDate()}
                                        value={dayjs(task.fecha)}
                                        onChange={(date) => setSelectedDate(date)}
                                        format='ddd DD [de] MMMM [de] YYYY hh:mm '
                                    // timeZone='America/Argentina/Buenos_Aires'
                                    />
                                    <div className=' container mx-auto p-4 w-88 mt-10 mb-10 flex gap-6'>
                                        <input className="px-10 py-1 rounded-sm w-min  mx-10 border-2" type="text"
                                            name='observac'
                                            onChange={handleChange}
                                            value={values.observac}
                                            placeholder='Ingresar observaciones'
                                        />
                                        <button type='submit' className="block bg-lime-700 px-2 py-1 text-white w-min rounded-md">Ingresar</button>
                                        <button ><Link to={'/turno/' + params.idpaciente}>Borrar</Link></button>
                                    </div>
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Form>
                )}
            </Formik>

            <Calendar
                style={{
                    height: '65vh',
                    wide: '35vw'
                }}
                messages={messages}
                selectable
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
        </div>

    )
}

export default Turno6
