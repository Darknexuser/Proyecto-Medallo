import { Router } from 'express';
import { crearDestino } from '../controllers/destinos.controller.js';
import { obtenerDestinos } from '../controllers/destinos.controller.js';
import { eliminarDestino } from '../controllers/destinos.controller.js';
import { actualizarDestino } from '../controllers/destinos.controller.js';
import { soloAdmin } from '../middlewares/rol.middleware.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

//ruta para crear destinos (solo admins)
router.post('/crear', verificarToken, crearDestino, soloAdmin);
//ruta para obtener destinos 
router.get('/', obtenerDestinos);
//ruta para eliminar un destino 
router.delete('/:id', verificarToken, soloAdmin, eliminarDestino);
//ruta para actualizar un destino 
router.put('/:id', verificarToken, soloAdmin, actualizarDestino);



export default router;
