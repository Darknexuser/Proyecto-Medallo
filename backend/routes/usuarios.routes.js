import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta protegida
router.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'perfil accedido correctamente',
    usuario: req.usuario, // esto viene del token
  });
});

export default router;


/*
import express from 'express';
import { obtenerPerfilUsuario } from '../controllers/usuarios.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// ruta protegida (solo acceden usuarios con token valido)
router.get('/perfil', verificarToken, obtenerPerfilUsuario);

export default router;
*/