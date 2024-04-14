import React, { useEffect, useState } from 'react';
import { useTareas } from '../componentes/context/hooks';
import { useParams, useNavigate } from 'react-router-dom';

const Historia = () => {
  const { TraerImagenes } = useTareas();
  const [tasks, setTasks] = useState([]);
  const [ver, setVer] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    const HistoriaImagenes = async () => {
      if (params.idpaciente) {
        const tasks = await TraerImagenes(params.idpaciente);
        setTasks(tasks);
      }
    };
    HistoriaImagenes();
  }, [params.idpaciente]);

  const manejoImagen = (imagen, descripcion) => {
    setImagenSeleccionada(imagen);
    setVer(true);
    navigate(`/visorimagenes?imagen=${imagen}`, { state: { descripcion } }); // Pasar 'descripcion' como parte del estado al navegar
  };

  return (
    <div className='justify-center flex'>
      <div className="w-96 md:max-w-sm bg-white border border-gray-700 rounded shadow p-5 mt-14 flex">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tasks) ? (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td>{`${task.nombre} ${task.apellido}`}</td>
                  <td>{task.descripcion}</td>
                  <td onClick={() => manejoImagen(task.imagen, task.descripcion)}>Ver Imagen</td> {/* Pasar 'descripcion' al hacer clic */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay datos de este paciente</td>
              </tr>
            )}
          </tbody>
        </table>
        {ver && (
          <div>
            <button onClick={() => navigate('/tabla')} className="block bg-blue-700 px-2 py-1 text-white rounded-md w-full text-center mt-5">Si</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historia;
