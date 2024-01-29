import { pool } from "../db.js";


///! LISTADO COMPLETO ACTIVOS

export const getTareas = async (req, res) => {
  
  try {
    const [result] = await pool.query(
      `SELECT * FROM pacientes WHERE estatus= 1 ORDER BY apellido, nombre`    
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///////LISTADO DE PACIENTES NO ACTIVOS
export const getPacInac = async (req, res) => {
  
  try {
    const [result] = await pool.query(
      "SELECT * FROM pacientes WHERE estatus= 0 ORDER BY apellido, nombre "
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


////!listado de turnos

export const getTurnos = async (req, res) => {
  
  try {
    const [result] = await pool.query(
      "SELECT * FROM pacientes  INNER JOIN turnos ON pacientes.idpaciente=turnos.pacienteid"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// //! combinar turno con nombre
// export const getTurnoNombre = async (req, res) => {
  
//   try {
//     const [result] = await pool.query(
//       "SELECT nombre, apellido FROM pacientes INNER JOIN turnos ON pacientes.idpaciente=turnos.pacienteid WHERE pacienteid=?"
//     );
//     res.json(result);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


///!TRAER UNA SOLO PACIENTE
export const getTarea = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM pacientes WHERE idpaciente= ?", [
      req.params.idpaciente,
    ]);

    if (result.length === 0) {
      return res.status(404).json("No existe el id");
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! ingresar un paciente
export const crearTarea = async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;
    const result = await pool.query(
      "INSERT INTO pacientes  (nombre, apellido, telefono) VALUES (?,?,?)",
      [nombre, apellido, telefono]
    );
    res.send("creando tareas");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ! crear un turno

export const crearTurno = async (req, res) => {
  try {
    const { fecha, pacienteid, fechafin, observac } = req.body;
    const result = await pool.query(
      "INSERT INTO turnos  (fecha, pacienteid, fechafin, observac) VALUES (?,?,?,?)",
      [fecha, pacienteid, fechafin, observac]
    );
    res.send("creando turno");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
///////E!DITAR PACIENTE PARA CORRECCIONES

export const editarTarea = async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;
    const [result] = await pool.query("UPDATE pacientes SET ? WHERE idpaciente= ?", [
      req.body,
      req.params.idpaciente,
    ]);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




export const borrarTarea = async (req, res) => {
  try {
   
    const [result] = await pool.query("UPDATE pacientes SET estatus=0 WHERE idpaciente= ?", 
    [
      req.params.idpaciente,
    ]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//! borrar un turno

export const borrarTurno = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM turnos WHERE idturnos= ?", 
    [
      req.params.idturnos,
    ]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};