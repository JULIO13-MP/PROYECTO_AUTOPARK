import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { empresa_id, nombre, direccion } = req.body;
    const [r] = await pool.execute('INSERT INTO Sede (empresa_id, nombre, direccion) VALUES (:empresa_id,:nombre,:direccion)', { empresa_id, nombre, direccion });
    const [rows] = await pool.execute('SELECT * FROM Sede WHERE sede_id = :id',{ id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando sede' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT * FROM Sede ORDER BY sede_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando sedes' }); }
});

export default router;
