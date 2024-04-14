import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function VisorImagenes() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const location = useLocation();
  const imagen = new URLSearchParams(location.search).get('imagen');
  const descripcion = location.state.descripcion; // Acceder a 'descripcion' desde el estado
console.log(descripcion)
  const handleRetorno = () => {
    navigate(-1); // Esto llevará de vuelta a la pantalla anterior
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='text-xm text-red-700 font-bold uppercase text-center '></div>
        <h2>{descripcion}</h2> {/* Mostrar 'descripcion' en el componente */}
        <img className="object-cover h-full w-full" src={imagen} alt="Descripción de la imagen" />
        <button onClick={handleRetorno} className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center">Si</button>
      </Box>
    </Modal>
  );
}
