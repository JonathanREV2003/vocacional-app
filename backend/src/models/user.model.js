import pool from '../models/postgres.js';
import bcrypt from 'bcrypt';

export const createUser = async (nombre, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const rol = 'usuario'; // estático
  const query = `
    INSERT INTO usuario (nombre, email, password_hash, rol)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nombre, email, rol;
  `;
  const values = [nombre, email, hashedPassword, rol];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
  return rows[0];
};
