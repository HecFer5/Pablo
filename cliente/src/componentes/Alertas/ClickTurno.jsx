import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTareas } from '../context/hooks'
import dayjs from 'dayjs';
import axios from "axios";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function TurnoNuevoDirecto() {

  const location = useLocation();

  // const irFuncion = location.state.irFuncion
  // console.log(irFuncion, 'aqui')
  const navigate = useNavigate()
  const [valor, setValor] = useState('');
  const params = useParams()
  const start = location.state.start;
  const titulo = ''

  if (params.idpaciente){
    console.log('con id')
  }else{
    console.log('NO id')
  }
  console.log(start)

  const { editarRegisto } = useTareas()
  const [task, setTask] = useState({
    nombre: "",
    apellido: "",
    observac: ""

  })

  // const start = '2024:03:05 11:00:00'
  const handleChange = (event) => {
    setValor(event.target.value);
  };


  const [valores, setValores] = useState({
    fecha: '',
    fechafin: '',
    pacienteid: '',
    observac: ''
  });



  const handleEnviarDatos = async () => {

    console.log('DA UN TURNO', params.idpaciente)
    const originalDate = dayjs(start);
    const newDate = originalDate.add(30, 'minute');

    console.log(originalDate, newDate)
    valores.fecha = dayjs(start).format('YYYY-MM-DD HH:mm:ss');
    valores.fechafin = newDate.format('YYYY-MM-DD HH:mm:ss');
    valores.pacienteid = params.idpaciente
    valores.observac = valor
    console.log('en clik', valores.fecha, valores.fechafin, params.idpaciente, valor)

    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate('/turno')
    } else {
      console.log('Hubo un error al enviar los datos');
    }

  };


  const handleEnviActividad = async () => {

    console.log('DA UNA ACTIVIDAD')

    const originalDate = dayjs(start);
    const newDate = originalDate.add(30, 'minute');
    valores.fecha = dayjs(start).format('YYYY-MM-DD HH:mm:ss');
    valores.fechafin = newDate.format('YYYY-MM-DD HH:mm:ss');
    valores.pacienteid = 33
    valores.observac = valor
    // console.log('en clik', valores.fecha, valores.fechafin, params.idpaciente, valor)
    console.log('en dar ac', valores)

    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate('/turno')
    } else {
      console.log('Hubo un error al enviar los datos');
    }

  };


  useEffect(() => {
    const traerTarea = async () => {
      if (params.idpaciente) {
        const task = await editarRegisto(params.idpaciente)
        setTask({
          nombre: task.nombre,
          apellido: task.apellido
        })
      }
    }
    traerTarea()
  }, [])

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
  <div className='text-xl font-bold uppercase text-center '>
    {params.idpaciente ? `¿turno para ${task.nombre} ${task.apellido} el ${dayjs(start).format('DD [de] MMMM [de ]YYYY [a las] HH:mm:ss')}?` : 'INGRESE LA ACTIVIDAD A REALIZAR'}
  </div>

  <input
    className="px-16 py-1 rounded-sm w-full border-solid mt-8"
    type="text"
    name='nombre'
    onChange={handleChange}
    placeholder='Ingrese un comentario'
    autoFocus
  />

<div>
    <div style={{ display: 'flex', marginTop: 22 }}>
      <button className="block bg-blue-700 px-2 py-1 mb-4 mt-4 mr-8 text-white rounded-md w-full text-center"  onClick={params.idpaciente ? handleEnviarDatos : handleEnviActividad}>Si</button>
      <button className="block bg-red-700 px-2 py-1 mb-4 mt-4 ml-8 text-white rounded-md w-full text-center "><Link to={'/turno/'} >No</Link></button>
    </div>
  </div>
</Box>

      </Modal>
    </div>
  );
}
