import { db } from '../config/db.js';

//crear reserva
export const crearReserva = async (req, res) => {
  console.log("req.usuario completo:", req.usuario);
  
  // intentamos obtener el id 
  const id_usuario = req.usuario?.id || null;
  
  console.log("id_usuario extraído:", id_usuario);
  const { id_destino, fecha_reserva } = req.body;
  
    if (!id_destino || !fecha_reserva || !id_usuario) {
      return res.status(400).json({ error: 'Datos incompletos para la reserva' });
    }
  
    try {
      const [result] = await db.execute(
        'INSERT INTO Reservas (id_usuario, id_destino, fecha_reserva) VALUES (?, ?, ?)',
        [id_usuario, id_destino, fecha_reserva]
      );
  
      res.status(201).json({ mensaje: 'Reserva creada exitosamente', id_reserva: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la reserva', detalle: error.message });
    }
  };

  //leer reservas 
  export const obtenerReservasUsuario = async (req, res) => {
    const { id: id_usuario } = req.usuario;
  
    try {
      const [reservas] = await db.execute(
        `SELECT r.id_reserva, r.fecha_reserva, d.nombre AS destino
         FROM Reservas r
         JOIN Destinos d ON r.id_destino = d.id_destino
         WHERE r.id_usuario = ?`,
        [id_usuario]
      );
  
      res.json({ reservas });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las reservas', detalle: error.message });
    }
  };
  
  //actualizar reserva 
  export const actualizarReserva = async (req, res) => {
    const { id: id_usuario } = req.usuario;
    const { id_reserva } = req.params;
    const { id_destino, fecha_reserva } = req.body;
  
    if (!id_destino || !fecha_reserva) {
      return res.status(400).json({ error: 'Datos incompletos para actualizar' });
    }
  
    try {
      const [result] = await db.execute(
        `UPDATE Reservas 
         SET id_destino = ?, fecha_reserva = ?
         WHERE id_reserva = ? AND id_usuario = ?`,
        [id_destino, fecha_reserva, id_reserva, id_usuario]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Reserva no encontrada o no autorizada' });
      }
  
      res.json({ mensaje: 'Reserva actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la reserva', detalle: error.message });
    }
  };
  
  //eliminar una reserva 
  export const eliminarReserva = async (req, res) => {
    const { id: id_usuario } = req.usuario;
    const { id_reserva } = req.params;
  
    try {
      const [result] = await db.execute(
        'DELETE FROM Reservas WHERE id_reserva = ? AND id_usuario = ?',
        [id_reserva, id_usuario]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Reserva no encontrada o no autorizada' });
      }
  
      res.json({ mensaje: 'Reserva eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la reserva', detalle: error.message });
    }
  };
  