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
      // "SELECT * FROM pacientes WHERE idpaciente= ?",
      
     " SELECT pacientes.*, mutual.nombremutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual WHERE pacientes.idpaciente = ?",
      
      
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
      mutualid,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO pacientes  (nombre, apellido, telefono, calle, numero, patologia, patasoc, fechacirugia, mutualid) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        nombre,
        apellido,
        telefono,
        calle,
        numero,
        patologia,
        patasosc,
        fechacirugia,
        mutualid,
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
      mutualid
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


//!historial de turnos
export const historialTurnos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT turnos.fecha, pacientes.nombre, pacientes.apellido FROM turnos JOIN pacientes ON turnos.pacienteid = pacientes.idpaciente WHERE turnos.pacienteid = ?",
      [req.params.pacienteid]
    );
    res.json(result)
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
      // `SELECT * FROM mutual  ORDER BY  nombremutual`
      "SELECT mutual.idmutual, mutual.nombremutual, COUNT(pacientes.idpaciente) AS cantidadpacientes FROM  mutual LEFT JOIN  pacientes ON mutual.idmutual = pacientes.mutualid GROUP BY mutual.idmutual, mutual.nombremutual"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
    23;
  }
};

//! LISTADO COMPLETO DE pacientes por mutual

export const getPacientesMutuales = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT  pacientes.*, mutual.nombremutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual WHERE mutual.idmutual = ?", [
        req.params.mutualid,
      ]

        
    //  " SELECT pacientes.*, mutual.nombremutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual WHERE pacientes.idpaciente = ?",
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

// ! crear una mutal

export const crearMutual = async (req, res) => {
  try {
    const { nombremutual } = req.body;
    const result = await pool.query(
      "INSERT INTO mutual  (nombremutual) VALUES (?)",
      [nombremutual]
    );
    res.send("creando mutual");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! borrar una mutual

export const borrarMutual= async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM mutual WHERE idmutual= ?", [
      req.params.idmutual,
    ]);
    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//!LLAMAR imagenes de un paciente
export const getImagenes = async (req, res) => {
  try {
    const [results] = await pool.query(
       "SELECT pacientes.*, imagenes.imagen, imagenes.descripcion FROM pacientes JOIN imagenes ON pacientes.idpaciente = imagenes.pacienteid WHERE imagenes.pacienteid = ?;",
      [req.params.idpaciente]
    );

    if (results.length === 0) {
      return res.status(404).json("No existen imágenes para el ID de paciente proporcionado");
    }
    res.json(results); // Devolver todos los resultados en lugar del primer resultado solamente
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// "SELECT  pacientes.*, mutual.nombremutual FROM pacientes JOIN mutual ON pacientes.mutualid = mutual.idmutual WHERE mutual.idmutual = ?", [