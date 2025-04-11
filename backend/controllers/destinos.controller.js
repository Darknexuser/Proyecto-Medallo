import { db } from '../config/db.js';

export const crearDestino = async (req, res) => {
  const { tipo } = req.usuario;

  if (tipo !== 'Administrador') {
    return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden crear destinos.' });
  }

  const { nombre, descripcion, ubicacion, precio, duracion } = req.body;

  if (!nombre || !precio || !duracion) {
    return res.status(400).json({ error: 'Faltan datos obligatorios: nombre, precio o fecha' });
  }

  try {
    const [resultado] = await db.execute(
      `INSERT INTO Destinos (nombre, descripcion, ubicacion, precio, duracion)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, descripcion, ubicacion, precio, duracion]
    );

    res.status(201).json({ mensaje: 'Destino creado con éxito', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el destino', detalle: error.message });
  }
};
