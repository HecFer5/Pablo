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
  getImagenes
} from "../controladores/tareas.controladores.js";

const router = Router();

//! PACIENTES
router.get("/tarea", getTareas);

// router.get("/actividad", getActividades)

router.get("/tarea/:idpaciente", getTarea);

router.post("/tarea", crearTarea);

router.put("/tarea/:idpaciente", editarTarea);

router.delete("/tarea/:idpaciente", borrarRegistro);

router.delete("/inac/:idpaciente", eliminarUnRegistro)

router.put("/inac/:idpaciente", volverRegistro)

router.get("/inac", getPacInac);

//! TURNOS Y ACTIVIDADES

router.get("/turno", getTurnos);

router.post("/turno", crearTurno)

router.delete("/turno/:idturnos", borrarTurno)

router.get("/historialturnos/:pacienteid", historialTurnos);




// router.post("/actividad", crearActividad)




// router.delete("/actividad/:idactividad", borrarActividad)


//! MUTUALES

router.get("/mutual", getMutuales);
router.get("/mutual/:idmutual", getMutual);
router.post("/mutual", crearMutual)
router.delete("/mutual/:idmutual", borrarMutual)
router.get("/tarea/:mutualid", getPacientesMutuales);
router.get('/pacientesmutuales/:mutualid', getPacientesMutuales);
router.get('/imagenes/:idpaciente', getImagenes);








export default router;