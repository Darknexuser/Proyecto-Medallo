export const perfilUsuario = (req, res) => {
  res.json({ mensaje: 'Perfil accedido correctamente', usuario: req.usuario });
};

/*
export const obtenerPerfilUsuario = (req, res) => {
    const usuario = req.usuario; // este usuario lo añade el middleware
    res.json({
      mensaje: 'Perfil del usuario',
      datos: usuario
    });
  };
  */