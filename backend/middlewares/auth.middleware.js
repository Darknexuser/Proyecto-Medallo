import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) return res.status(401).json({ mensaje: 'Token no proporcionado' });
  
  const token = authHeader.split(' ')[1]; // Extrae solo el token sin bearer
  
  try {
    // guarda el token para depuracion 
    console.log('Token recibido:', token);
    
    // verificamos el token 
    const decoded = jwt.verify(token, 'holi');
    
    // log para depuracion
    console.log('Token decodificado completo:', decoded);
    
    // asigna el usuario decodificado a req
    req.usuario = decoded;
    
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}