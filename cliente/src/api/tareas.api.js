import axios from "axios";

export const ListarTareas = async () =>
  await axios.get("http://localhost:4001/tarea");

export const ListarTurnos = async () =>
  await axios.get("http://localhost:4000/turno");

 export const BorrarUnTurno = async (idturnos) =>
   await axios.delete("http://localhost:4000/turno" + idturnos);

export const ListarInactivos = async () =>
  await axios.get("http://localhost:4001/inac");

export const CrearTareas = async (registro) =>
  await axios.post("http://localhost:4001/tarea", registro);

export const CrearTurnos = async (turno) =>
  await axios.post("http://localhost:4000/turno/", turno);

export const BorrarTareas = async (idpaciente) =>
  await axios.delete("http://localhost:4001/tarea/" + idpaciente);

export const ListarUnaTarea = async (idpaciente) =>
  await axios.get("http://localhost:4001/tarea/" + idpaciente);

export const EditaTarea = async (idpaciente, nuevosCampos) =>
  await axios.put(`http://localhost:4001/tarea/${idpaciente}`, nuevosCampos);

export const ToogleTaskDoneRec = async (idpaciente, hecho) =>
  await axios.put(`http://localhost:4001/tarea/${idpaciente}`, {
    hecho,
  });
