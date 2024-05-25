import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
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

const events = [
  {
  start: dayjs('2024-01-28 11:00:00').toDate(),
  end: dayjs('2024-01-28T12:00:00').toDate(),
  title: "Natalia Ferreccio. Domi"
  },
  {
    start: dayjs('2024-01-26T14:00:00').toDate(),
    end: dayjs('2024-01-26T15:00:00').toDate(),
    title: "Hector Ferreccio. LLevar magneto"
    }
]

const Portada = () => {

  const localizer = dayjsLocalizer(dayjs)
  // const formats = {
  //   weekdayformat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
  // }
  return (
    <>

      <div>Portada</div>
      

      
      <div className='p-7'>
        <Calendar
          localizer={localizer}
          style={{
            height: 500,
            wide: 500
          }}
          messages={messages}
          events={events}
          selectable

        // formats={{
        //   dayHeaderFormat: date => {
        //     return dayjs(date).format(" dddd  DD/MMMM/yyyy")
        //   },
        //   monthHeaderFormat: date => {
        //     return dayjs(date).format(" dddd  DD/MMMM/yyyy")
        //   },
        //   dayFormat: date => {
        //     return dayjs(date).format(" dddd  DD")
        //   },
        // }}
        />
      </div>
    </>
  )
}

export default Portada