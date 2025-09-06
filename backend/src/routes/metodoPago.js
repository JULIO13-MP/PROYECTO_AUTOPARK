import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;
    const [r] = await pool.execute('INSERT INTO Metodo_Pago (nombre) VALUES (:nombre)', { nombre });
    const [rows] = await pool.execute('SELECT * FROM Metodo_Pago WHERE metodo_pago_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando método' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT * FROM Metodo_Pago ORDER BY metodo_pago_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando métodos' }); }
});

export default router;
