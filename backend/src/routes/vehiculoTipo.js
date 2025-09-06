import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [r] = await pool.execute('INSERT INTO Vehiculo_Tipo (nombre, descripcion) VALUES (:nombre,:descripcion)', { nombre, descripcion });
    const [rows] = await pool.execute('SELECT * FROM Vehiculo_Tipo WHERE vehiculo_tipo_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando tipo' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT * FROM Vehiculo_Tipo ORDER BY vehiculo_tipo_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando tipos' }); }
});

export default router;
