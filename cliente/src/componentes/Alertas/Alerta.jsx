import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Alert, AlertTitle } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTareas } from "../context/hooks"



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


export default function Alerta() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const { borrarTarea } = useTareas()
  const params = useParams()
  console.log(params.idpaciente)


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <div className='text-xm text-red-700 font-bold uppercase text-center '>{`¡Se va a borrar el registro nº ${params.idpaciente}!`}</div>
          <div className="text-sm text-center font-bold mt-2 mb-3">¿Está seguro de continuar?</div>
         
          <button onClick={() => { borrarTarea(params.idpaciente) }} className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center">Si</button>

         { navigate('/tabla')}
          { <li className="block bg-red-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={'/tabla/'} >No</Link></li>}
        </Box>
      </Modal>
    </>
  );
}
