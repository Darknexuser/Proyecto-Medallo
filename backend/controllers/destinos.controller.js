import { db } from '../config/db.js';

export const crearDestino = async (req, res) => {
  const { tipo } = req.usuario;

  if (tipo !== 'Administrador') {
    return res.status(403).json({ error: 'Acceso denegado. Solo administradores pueden crear destinos.' });
  }

  const { nombre, descripcion, ubicacion, precio, duracion } = req.body;

  if (!nombre || !precio || !duracion) {
    return res.status(400).json({ error: 'Faltan datos obligatorios: nombre, precio o duracion' });
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

export const obtenerDestinos = async (req, res) => {
  try {
    const [destinos] = await db.execute('SELECT * FROM Destinos');
    res.json({ destinos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los destinos', detalle: error.message });
  }
};

// ACTUALIZAR DESTINOS 
export const actualizarDestino = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE Destinos SET nombre = ?, descripcion = ?, precio = ? WHERE id_destino = ?',
      [nombre, descripcion, precio, id]
    );
    res.json({ mensaje: 'Destino actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar destino', detalle: error.message });
  }
};

// eliminar destinos 
export const eliminarDestino = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM Destinos WHERE id_destino = ?', [id]);
    res.json({ mensaje: 'Destino eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar destino', detalle: error.message });
  }
};
