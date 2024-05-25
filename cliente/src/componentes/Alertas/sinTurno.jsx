import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';

export default function SinTurno({ values }) {
  const [open, setOpen] = useState(false);
  const [showCantidad, setShowCantidad] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate()
  const location = useLocation();
  const taskData = location.state;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAsignarSesiones = () => {
    setShowCantidad(true);
  };
  const handleCantidadChange = (event) => setCantidad(event.target.value);


  const handleAsignarCantidad = () => {

    console.log(cantidad);
    handleClose();
  };

  useEffect(() => {
    handleOpen();
  }, []);
  const [valores, setValores] = useState({
    idpaciente: '',
    observac: '',
    cantidad: 0,
    usadas: 0,
    tanda: 0,
    estado: 0

  });
  const atenderIgual = async () => {
    console.log(taskData, ' atender igual')
    console.log('taskdata', taskData, 'valores', valores)


    valores.idpaciente = taskData.idpaciente
    valores.tanda = taskData.tanda
    valores.usadas = taskData.usadas + 1
    valores.cantidad = 0
    valores.estado = 1

    const response = await axios.post("http://localhost:4000/turno/", valores);

    if (response.status === 200) {
      console.log('Los datos se enviaron correctamente');
      navigate('/turno')
    } else {
      console.log('Hubo un error al enviar los datos');
    }

    navigate('/turnodirecto/')
  }


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ p: 4 }}>
          <div className='text-xl font-bold uppercase text-center text-red-600'>
            ¡El paciente no tiene sesiones asignadas!
          </div>
          <div className="text-sm text-center font-bold mt-2 mb-3">Elija una opción</div>
          <div className='flex justify-between'>
            <Button onClick={() => atenderIgual()}>Atender Igual</Button>
            <Button onClick={handleAsignarSesiones}>Asignar Sesiones</Button>
            <Button onClick={() => navigate('/turno')}>Cancelar</Button>
          </div>
          {showCantidad && (
            <>
              <div className="flex justify-center mt-12">

                <input className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-100 border border-gray-300 rounded-md py-2 px-4" type="text" placeholder="Cantidad" />
                <Button onClick={handleAsignarCantidad}>Confirmar</Button>
              </div>
            </>

          )}
        </Box>
      </Dialog>
    </div>
  );
}
