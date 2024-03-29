import { pool } from "../db.js";

///!PACIENTES///////

//! LISTADO COMPLETO DE PACIENTES ACTIVOS

export const getTareas = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM pacientes WHERE estatus= 1 ORDER BY apellido, nombre`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};

///! LISTADO COMPLETO DE PACIENTES INACTIVOS

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

///!LLAMAR UN SOLO PACIENTE
export const getTarea = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM pacientes WHERE idpaciente= ?",
      [req.params.idpaciente]
    );

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
    const {
      nombre,
      apellido,
      telefono,
      calle,
      numero,
      patologia,
      patasosc,
      fechacirugia,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO pacientes  (nombre, apellido, telefono, calle, numero, patologia, patasoc,fechacirugia) VALUES (?,?,?,?,?,?,?,?)",
      [
        nombre,
        apellido,
        telefono,
        calle,
        numero,
        patologia,
        patasosc,
        fechacirugia,
      ]
    );
    res.send("creando tareas");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//!EDITAR PACIENTE PARA CORRECCIONES

export const editarTarea = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      telefono,
      calle,
      numero,
      patologia,
      patasosc,
      fechacirugia,
    } = req.body;
    const [result] = await pool.query(
      "UPDATE pacientes SET ? WHERE idpaciente= ?",
      [req.body, req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///! BORRAR UN PACIENTE PARCIALMENTE
export const borrarRegistro = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE pacientes SET estatus=0 WHERE idpaciente= ?",
      [req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///! REHABILITAR UN PACIENTE
export const volverRegistro = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE pacientes SET estatus=1 WHERE idpaciente= ?",
      [req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///!BORRAR UN PACIENTE DEFINITIVAMENTE
export const eliminarUnRegistro = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM pacientes WHERE idpaciente= ?",
      [req.params.idpaciente]
    );
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

///!TURNOS
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

//! borrar un turno

export const borrarTurno = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM turnos WHERE idturnos= ?", [
      req.params.idturnos,
    ]);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


///!ACTIVIDADES
////!listado de ACTIVIDADES

export const getActividades = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM actividades `
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};


// ! crear una actividad

export const crearActividad = async (req, res) => {
  try {
    const { fecha, fechafin, observac } = req.body;
    const result = await pool.query(
      "INSERT INTO actividades  (fecha, fechafin, observac) VALUES (?,?,?)",
      [fecha, fechafin, observac]
    );
    res.send("creando actividad");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! borrar una actividad

export const borrarActividad = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM actividades WHERE idactividad= ?", [
      req.params.idactividad,
    ]);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! LISTADO COMPLETO DE MUTUALES

export const getMutuales = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM mutual  ORDER BY  nombre`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};

//!LLAMAR UN SOLO MUTUAL
export const getMutual = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM mutual WHERE idmutual= ?",
      [req.params.idmutual]
    );

    if (result.length === 0) {
      return res.status(404).json("No existe el id");
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};