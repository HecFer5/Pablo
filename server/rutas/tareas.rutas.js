import { Router } from "express";
import {
  getTarea,
  getTareas,
  crearTarea,
  borrarRegistro,
  editarTarea,
  getPacInac,
  crearTurno,
  getTurnos,
  borrarTurno,
  eliminarUnRegistro,
  volverRegistro,
  crearActividad,
  borrarActividad,
  getActividades,
  getMutuales,
  getMutual,
  crearMutual,
  borrarMutual,
  getPacientesMutuales,
  historialTurnos,
  getImagenes,
  crearHistoria,
  getSesiones,
  getTareaSesion,
  getPacientes,
  turnosPaciente,
  ultimoPaciente,
  getPermiso
} from "../controladores/tareas.controladores.js";

const router = Router();

//! PACIENTES
router.get("/tarea", getTareas);

router.get("/pacientes", getPacientes);


router.get("/ultimo", ultimoPaciente);

// router.get("/actividad", getActividades)

router.get("/tarea/:idpaciente", getTarea);

router.post("/tarea", crearTarea);

router.put("/tarea/:idpaciente", editarTarea);

router.delete("/tarea/:idpaciente", borrarRegistro);

router.delete("/inac/:idpaciente", eliminarUnRegistro);

router.put("/inac/:idpaciente", volverRegistro);

router.get("/inac", getPacInac);

//! TURNOS Y ACTIVIDADES

router.get("/turno", getTurnos);

router.get("/turno/:idpaciente", turnosPaciente);

router.post("/turno", crearTurno);

router.delete("/turno/:idturnos", borrarTurno);

router.get("/historialturnos/:idpaciente", historialTurnos);

 router.put("/permiso/:idturnos", getPermiso);

router.get("/sesiones/:idpaciente", getTareaSesion);
// router.post("/actividad", crearActividad)

// router.delete("/actividad/:idactividad", borrarActividad)

//! MUTUALES

router.get("/mutual", getMutuales);
router.get("/mutual/:idmutual", getMutual);
router.post("/mutual", crearMutual);
router.delete("/mutual/:idmutual", borrarMutual);
router.get("/tarea/:mutualid", getPacientesMutuales);
router.get("/pacientesmutuales/:mutualid", getPacientesMutuales);
router.get("/imagenes/:idpaciente", getImagenes);

router.post("/historias", crearHistoria);

export default router;
