import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
// import React, { useContext } from 'react';
// import { TareasContext } from '../context/TareasContext';
import { useTareas } from '../context/hooks'
// import {  } from 'react-router-dom';
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

  const { darTurno } = useTareas()
  const navigate = useNavigate()



  const params = useParams()

  const location = useLocation();
  const start = location.state.start;

  // const start = '2024:03:05 11:00:00'


  const [valores, setValores] = useState({
    fecha: '',
    fechafin: '',
    pacienteid: '',
    observac: ''
  });



  const handleEnviarDatos = async () => {
    const originalDate = dayjs(start);
    const newDate = originalDate.add(1, 'hour');

    valores.fecha = dayjs(start).format('YYYY-MM-DD HH:mm:ss');
    valores.fechafin = newDate.format('YYYY-MM-DD HH:mm:ss');
    valores.pacienteid = params.idpaciente
    valores.observac = ''
    console.log('en clik', valores.fecha, params.idpaciente)
    // try {
      // Realizar la petición POST a la API de MySQL
      const response = await axios.post("http://localhost:4000/turno/", valores);

      // Verificar la respuesta de la API
      if (response.status === 200) {
        // Los datos se enviaron correctamente
        console.log('Los datos se enviaron correctamente');
        navigate('/otroturno')
      } else {
        // Hubo un error al enviar los datos
        console.log('Hubo un error al enviar los datos');
      }
    // } catch (error) {
    //   // Manejar el error de la petición
    //   console.log('Error al enviar los datos:', error);
    // }
  };



  // useEffect(() => {
  //   const traerTarea = async () => {
  //     if (params.idpaciente) {
  //       const task = await editarRegisto(params.idpaciente)
  //       setTask({
  //         nombre: task.nombre,
  //         apellido: task.apellido,
  //         telefono: task.telefono,
  //       })
  //     }
  //   }
  //   traerTarea()
  //   console.log('hola turno, ', start)
  // }, [])

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
          {/* <div className='text-xl font-bold uppercase text-center '> {`${task.apellido}, ${task.nombre} `}</div> */}
          {/* <div className="text-sm text-center font-bold mt-2 mb-3">{`El ${start}`}</div> */}

          <button className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center" onClick={handleEnviarDatos}>Si</button>
          <li className="block bg-red-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={'/turno/'} >No</Link></li>
        </Box>
      </Modal>
    </div>
  );
}
