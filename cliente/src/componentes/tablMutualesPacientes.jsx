import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


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
  
const PacientesPorMutual = () => {
  const [registros, setRegistros] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState({ nombre: '', apellido: '' });
  const params = useParams();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const mutualid = params.idmutual

  const TraerPacientesMutual = async () => {
    try {
      const response = await axios.get("http://localhost:4001/pacientesmutuales/" + mutualid);
      
      const data = response.data;
      setRegistros(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    TraerPacientesMutual();
    console.log(params.idmutual)

  }, [params.idmutual]);

    console.log(registros.nombremutual)
    const registrosFiltrados = registros.filter(registro => registro.idpaciente !== 33);

  return (     
   
     

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description" >
         
         <Box sx={style}>
   <h1>{params.idmutual}</h1>
        <table className="min-w-full text-left text-sm font-light">
                                <thead
                                    className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Nº</th>
                                        <th scope="col" className="px-6 py-4">NOMBRE</th>
                               
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {registrosFiltrados.map(registro => (
                                        <tr key={registro.idpaciente} className="border-e-4 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                            
                                            <td >
                                                
                                                <li className="block bg-white font-semibold ml-4 px-2 py-1 text-black w-min rounded-md"><Link to={'/ficha/' + registro.idpaciente} >{registro.idpaciente}</Link></li>
                                            </td>
                                         
                                            <td className="whitespace-nowrap px-6 py-4">{`${registro.nombre} ${registro.apellido}`}</td>
                                          
                                     
                                       
                                   
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
   
    </Box>
    </Modal>
    
  );
};

export default PacientesPorMutual;
