import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useTareas } from './context/hooks'
import { useParams, useNavigate, Link } from 'react-router-dom'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers';


import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import 'dayjs/locale/es';


dayjs.locale("es")
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


const Turno7 = () => {
    const { darTurno } = useTareas()
    const [task, setTask] = useState({
        "fecha": "",
        "pacienteid": 1,
        "fechafin": "",
        "observac": ""
    })

    const [dia, setDia] = useState(new Date())

console.log(dia, '1')
    const params = useParams()
   
    const fechaElegida = () => {

        setDia(DateTimePicker.selected)
        console.log(dia, 'setDia', values)
        // setDia(dayjs(dia).format('YYYY/MM/DD HH:mm:ss'))
        // console.log(dia)
    }

    // const navigate = useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefalut()
    // }

    return (
        <div>
            <Formik
                initialValues={task}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {


                    await darTurno(values)
                    console.log(values, 'hhdhh')
                    setTask({
                        "fecha": "",
                        "pacienteid": 0,
                        "fechafin": "",
                        "observac": ""
                    })
                }}
            >

                {({ handleSubmit, handleChange, values }) => (
                    <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-xl rounded-md p-4 mx-auto mt-10">
                    
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DateTimePicker',
                                ]}
                            >
                                <DemoItem label={`Elija fecha y hora para el turno del paciente ${params.idpaciente}`}>
                                    <DateTimePicker
                                        defaultValue={dayjs(Date())}
                                        
                                    />
                                    {
                                        
                                    }
                                    <button type='submit' className="block bg-lime-700 px-2 py-1 text-white w-min rounded-md">Ingresar</button>
                                    <input className="px-20 py-10 rounded-sm w-min  mx-10  " type="text"
                                        name='observac'
                                        onChange={handleChange}
                                        placeholder='Campo obligatorio'
                                        value={values.observac} />
                                    <input className="px-2 py-1 rounded-sm w-full" type="text"
                                        name='fecha'
                                        onChange={handleChange}
                                        placeholder='Obligatorio'
                                        value={values.fecha} />
                                    <input className="px-2 py-1 rounded-sm w-full" type="text"
                                        name='fechafin'
                                        onChange={handleChange}
                                        placeholder='Obligatorio'
                                        value={values.fechafin} />
                                    <input className="px-2 py-1 rounded-sm w-full" type="text"
                                        name='id'
                                        onChange={handleChange}
                                        placeholder='Obligatorio'
                                        value={values.pacienteid} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Form>
                )}

            </Formik>

        </div>

    )
}

export default Turno7