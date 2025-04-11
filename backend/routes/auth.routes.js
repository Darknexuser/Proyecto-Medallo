import { Router } from 'express';
import { registrarUsuario, loginUser } from '../controllers/auth.controller.js';


const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUser);

export default router;
