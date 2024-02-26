import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import React, { useContext } from 'react';
import { TareasContext } from '../context/TareasContext';
import { useTareas } from '../context/hooks'
import { useLocation } from 'react-router-dom';






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


export default function NuevoReg(datos) {
  const { editarRegisto } = useTareas()
  const [task, setTask] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
 
  })
  // console.log(task.imagen)
 const params = useParams()
 const location = useLocation();
 const start = location.state.start; // Verificar si location.state existe antes de acceder a la propiedad start

 

  
  useEffect(() => {
    const traerTarea = async () => {
      if (params.idpaciente) {
        const task = await editarRegisto(params.idpaciente)
        setTask({
          nombre: task.nombre,
          apellido: task.apellido,
          telefono: task.telefono,
    
        })
      }
    }
    traerTarea()
  console.log('hola turno, ',start)
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
          <div className='text-xl font-bold uppercase text-center '> {`${task.apellido}, ${task.nombre} `}</div>
          <div className="text-sm text-center font-bold mt-2 mb-3">{`El ${start}`}</div>

          {<li className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center"><Link to={'/new/'} >Si</Link></li>}
          {<li className="block bg-red-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={'/turno/'} >No</Link></li>}
        </Box>
      </Modal>
    </div>
  );
}
