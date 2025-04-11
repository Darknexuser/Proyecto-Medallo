import { Router } from 'express';
import { crearDestino } from '../controllers/destinos.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

//ruta para crear destinos (solo admins)
router.post('/crear', verificarToken, crearDestino);

export default router;
