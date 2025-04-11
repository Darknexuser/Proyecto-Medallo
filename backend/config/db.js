import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let db;

try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('conexion exitosa a la base de datos');
} catch (error) {
  console.error('Error al conectar con la base de datos:', error.message);
  process.exit(1); // detiene la ejecucion si no hay conexión
}

export { db };
