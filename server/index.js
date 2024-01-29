import express, { json } from "express";
import { PORT, PORT2 } from "./config.js";
import cors from "cors";
import indexRoutes from "./rutas/tareas.rutas.js";
import taskRoutes from "./rutas/tareas.rutas.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(taskRoutes);
app.use(indexRoutes);

app.listen(PORT);
app.listen(PORT2);

console.log(`Server en el puerto ${PORT}`);
console.log(`Server en el puerto ${PORT2}`);


