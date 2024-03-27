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
  getActividades
} from "../controladores/tareas.controladores.js";

const router = Router();

router.get("/tarea", getTareas);

router.get("/actividad", getActividades)

router.get("/turno", getTurnos);

router.get("/inac", getPacInac);


router.get("/tarea/:idpaciente", getTarea);

router.post("/tarea", crearTarea);

router.post("/turno", crearTurno)

router.post("/actividad", crearActividad)


router.put("/tarea/:idpaciente", editarTarea);

router.delete("/tarea/:idpaciente", borrarRegistro);
router.delete("/turno/:idturnos", borrarTurno)
router.delete("/actividad/:idactividad", borrarActividad)

router.delete("/inac/:idpaciente", eliminarUnRegistro)
router.put("/inac/:idpaciente", volverRegistro)


export default router;