import { Router } from "express";
import {
  getTarea,
  getTareas,
  crearTarea,
  borrarTarea,
  editarTarea,
  getPacInac,
  crearTurno,
  getTurnos,
  borrarTurno
} from "../controladores/tareas.controladores.js";

const router = Router();

router.get("/tarea", getTareas);

router.get("/turno", getTurnos);

router.get("/inac", getPacInac);


// router.get("/turno/:idpaciente", getTurnoNombre)

router.get("/tarea/:idpaciente", getTarea);

router.post("/tarea", crearTarea);

router.post("/turno", crearTurno)

router.put("/tarea/:idpaciente", editarTarea);

router.delete("/tarea/:idpaciente", borrarTarea);
router.delete("/turno/:idturnos", borrarTurno)


export default router;
