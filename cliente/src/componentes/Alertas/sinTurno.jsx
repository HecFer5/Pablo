import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTareas } from '../context/hooks'




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

// const traerTarea = async () => {
//   if (params.idpaciente) {
  
//   }}


export default  function SinTurno({ values }) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams()
  console.log(params.idpaciente, 'viendo2')

  // const task = props.location.state.task.
  // const response = await axios.post("http://localhost:4000/turno/", valores);
    
 

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
          <div className='text-xl font-bold uppercase text-center text-red-600 '>¡El paciente  no tiene sesiones asignadas!</div>
          <div className="text-sm text-center font-bold mt-2 mb-3">Elija una opción </div>

          {<li className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center"><Link to={'/new/'} >Atender igual</Link></li>}
          {<li className="block bg-green-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={'/tabla/'} >Asignarle sesiones</Link></li>}
          {<li className="block bg-red-700 px-2 py-1 text-white w-full text-center mt-3 rounded-md"><Link to={'/turno/' } >Cancelar</Link></li>}
        </Box>
      </Modal>
    </div>
  );
}
