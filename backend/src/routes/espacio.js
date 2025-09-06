import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { zona_id, numero, estado } = req.body;
    const [r] = await pool.execute('INSERT INTO Espacio (zona_id, numero, estado) VALUES (:zona_id,:numero,:estado)', { zona_id, numero, estado: estado ?? 'libre' });
    const [rows] = await pool.execute('SELECT * FROM Espacio WHERE espacio_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando espacio' }); }
});

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT e.*, z.nombre AS zona_nombre FROM Espacio e LEFT JOIN Zona z ON z.zona_id = e.zona_id ORDER BY e.espacio_id DESC');
    res.json(rows);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error listando espacios' }); }
});

export default router;
