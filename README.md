# Proyecto-Medallo
Este proyecto es el backend para una plataforma de agencia de turismo. Permite a los usuarios registrarse, iniciar sesión, crear reservas y gestionar destinos, con roles de acceso diferenciados (`Administrador`, `Cliente` y `Vendedor`).

# Tecnologías utilizadas

- *Node.js* con *Express*
- *MySQL* para base de datos relacional
- *JWT* (JSON Web Token) para autenticación
- *bcrypt* para encriptación de contraseñas
- *dotenv* para variables de entorno
- *Postman* para pruebas de endpoints


# Estructura del proyecto
ProyectoMedallo/ ├── controllers/ # logica para usuarios, reservas y destinos ├── middlewares/ # autenticacion con JWT y verificación de roles ├── config/ # conexion a la base de datos ├── routes/ # endpoints organizados por recurso ├── services/ # Funciones auxiliares como autenticacion ├── server.js # Punto de entrada del servidor

#Funcionalidades

# autenticacion y roles

- Registro de usuarios (por defecto: tipo `Cliente`)
- Inicio de sesión con generación de token JWT
- Middleware de protección de rutas (`verificarToken`)
- Roles: `Cliente`, `Vendedor`, `Administrador`
- Acceso restringido a rutas por rol (`verificarRol('Administrador')`, etc.)

# Destinos

-  Solo *Administrador* puede:
  - Crear destinos
  - Editar destinos
  - Eliminar destinos
-  Todos los usuarios autenticados pueden:
  - Ver la lista de destinos disponibles

# Reservas

- Los usuarios autenticados pueden:
  - Crear una nueva reserva (ligada a su `id_usuario`)
  - Consultar todas sus reservas personales
  - Eliminar una reserva propia


# Instalación y ejecución

# 1. Clona el repositorio

```bash
git clone https://github.com/Darknexuser/Proyecto-Medallo.git
cd PROYECTOMEDALLO-backend

#istalar dependencias
npm install

#configura el archivo .env
PORT=3000
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=agenciaturismo
JWT_SECRET=

#ejecuta el servidor
npm run dev

#endpoints principales
auth
metodo post ruta /api/login descripcion: inicio de sesion 
metodp post ruta /api/usuarios: crear nuevo usuario 
#reservas (requiere login)
metodo post /api/reservas descripcion: crear cualquier reserva 
metodo get /api/reservas descripcion: obtener reservas de usuarios 
metodo delete /api/reservas/:id descripcion: eliminar reserva del usuario 
#destinos
metodo get, ruta: /api/destinos, cualquier rol, listar destinos disponibles 
metodo post /api/destinos, administrador, crear un nuevo dsstino 
metodo put /api/destinos/:id, administrador, editar un destino existente 
metodo delete /api/destinos/:id, administrador, eliminar un destino 

#Consideraciones
Todos los tokens deben enviarse en el encabezado:
Authorization: Bearer <token>

Solo los Administradores pueden gestionar destinos.

Los Clientes solo pueden ver y gestionar sus propias reservas.

Asegúrate de que tu base de datos agenciaturismo tenga las tablas correctas.

BY: dina 
note: todavia esta en construccion 