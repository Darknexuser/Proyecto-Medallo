import { db } from '../config/db.js';
import { generateToken } from '../services/auth.service.js';
import { verifyPassword } from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//registrar usuario 

export const registrarUsuario = async (req, res) => {
  const { nombre, correo, contraseña, tipo } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const [result] = await db.execute(
      'INSERT INTO Usuarios (nombre, correo, contraseña, tipo) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, tipo]
    );

    res.status(201).json({ mensaje: 'Usuario creado correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

// inicio de sesion

export const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
    const usuario = rows[0];

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const validPassword = await verifyPassword(contraseña, usuario.contraseña);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const payload = {
      id: usuario.id_usuario,
      tipo: usuario.tipo
    };

    console.log("Payload antes de generar token:", payload);
    const token = generateToken(payload);

    // Verificación del token solo para pruebas (puedes quitarla después si todo funciona)
    try {
      const decodedForTest = jwt.verify(token, 'holi');
      console.log("Token verificado de prueba:", decodedForTest);
    } catch (e) {
      console.error("Error al verificar el token generado:", e);
    }

    return res.json({ token }); // <<-- Este es el único return del controlador
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};