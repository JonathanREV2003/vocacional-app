import pool from '../models/postgres.js';

export const getAllLogin = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (error) {
    res.json({error: error.message});
  }
};

export const postLogin = async (req, res) => {
  const { nombre, email, password_hash, rol } = req.body;
  try {
    const result = await pool.query('INSERT INTO usuario (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, email, password_hash, rol]);
    console.log(result);

    res.json(result.rows[0]);

  } catch (error) {
    res.json({error: error.message});
  }
};

export const deleteLogin = async (req, res) => {
  const { id } = req.params; // borrar por ID
  try {
    const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente', usuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putLogin = async (req, res) => {
  const { id } = req.params; // actualizar por ID
  const { nombre, email, password_hash, rol } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuario SET nombre = $1, email = $2, password_hash = $3, rol = $4 WHERE id = $5 RETURNING *',
      [nombre, email, password_hash, rol, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado correctamente', usuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};