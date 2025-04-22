export const soloAdmin = (req, res, next) => {
    if (req.usuario?.tipo !== 'Administrador') {
      return res.status(403).json({ error: 'Acceso denegado: Solo para administradores' });
    }
    next();
  };