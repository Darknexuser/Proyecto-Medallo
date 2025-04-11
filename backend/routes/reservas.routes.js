import { Router } from 'express';
import { crearReserva } from '../controllers/reservas.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { obtenerReservasUsuario } from '../controllers/reservas.controller.js';
import { actualizarReserva } from '../controllers/reservas.controller.js';
import { eliminarReserva } from '../controllers/reservas.controller.js';



const router = Router();

// ruta protegida para crear una reserva
router.post('/crear', verificarToken, crearReserva);
// ruta para leer reservas
router.get('/mis-reservas', verificarToken, obtenerReservasUsuario);
//ruta para actualizar reservas 
router.put('/actualizar/:id_reserva', verificarToken, actualizarReserva);
//ruta para eliminar una reserva
router.delete('/eliminar/:id_reserva', verificarToken, eliminarReserva);



export default router;
