import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/user.model.js';
import 'dotenv/config';

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const newUser = await createUser(nombre, email, password);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};
