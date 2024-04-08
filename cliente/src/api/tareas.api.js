import axios from "axios";

//! PACIENTES
export const ListarTareas = async () =>
  await axios.get("http://localhost:4001/tarea");

export const ListarInactivos = async () =>
  await axios.get("http://localhost:4001/inac");

export const CrearTareas = async (registro) =>
  await axios.post("http://localhost:4001/tarea", registro);

export const BorrarTareas = async (idpaciente) =>
  await axios.delete("http://localhost:4001/tarea/" + idpaciente);

export const EliminarRegistro = async (idpaciente) =>
  await axios.delete("http://localhost:4001/inac/" + idpaciente);

export const VuelveRegistro = async (idpaciente) =>
  await axios.put("http://localhost:4001/tarea/" + idpaciente);

export const ListarUnaTarea = async (idpaciente) =>
  await axios.get("http://localhost:4001/tarea/" + idpaciente);

export const EditaTarea = async (idpaciente, nuevosCampos) =>
  await axios.put(`http://localhost:4001/tarea/${idpaciente}`, nuevosCampos);

//! TURNOS

export const ListarTurnos = async () =>
  await axios.get("http://localhost:4000/turno");

export const BorrarUnTurno = async (idturnos) =>
  await axios.delete("http://localhost:4000/turno" + idturnos);

export const CrearTurnos = async (turno) =>
  await axios.post("http://localhost:4000/turno/", turno);

//! MUTUALES
export const ListarMutuales = async () =>
  await axios.get("http://localhost:4001/mutual/");

  export const ListarPacientesMutual = async (mutualid) =>
  await axios.get("http://localhost:4001/pacientesmutuales/" + mutualid);


export const ListarUnaMutual = async (idmutual) =>
  await axios.get("http://localhost:4001/mutual/" + idmutual);

export const CrearMutuales = async (mutual) =>
  await axios.post("http://localhost:4001/mutual", mutual);

export const BorrarUnaMutual = async (idmutual) =>
  await axios.delete("http://localhost:4000/mutual" + idmutual);
