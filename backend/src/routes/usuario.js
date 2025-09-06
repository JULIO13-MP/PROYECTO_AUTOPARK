import { Router } from 'express';
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/register', async (req, res) => {
  try {
    const { empresa_id, rol_id, nombre, username, correo, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const [r] = await pool.execute('INSERT INTO Usuario (empresa_id, rol_id, nombre, username, correo, password) VALUES (:empresa_id,:rol_id,:nombre,:username,:correo,:password)', { empresa_id, rol_id, nombre, username, correo, password: hash });
    const [rows] = await pool.execute('SELECT usuario_id, empresa_id, rol_id, nombre, username, correo FROM Usuario WHERE usuario_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error registrando usuario' }); }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.execute('SELECT * FROM Usuario WHERE username = :username', { username });
    if (!rows.length) return res.status(401).json({ error: 'Credenciales inválidas' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ usuario_id: user.usuario_id, rol_id: user.rol_id }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error en login' }); }
});

export default router;
