import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { empresa_id, doc_tipo, doc_num, nombre, apellido, email, telefono } = req.body;
    const [r] = await pool.execute(
      'INSERT INTO Cliente (empresa_id, doc_tipo, doc_num, nombre, apellido, email, telefono) VALUES (:empresa_id,:doc_tipo,:doc_num,:nombre,:apellido,:email,:telefono)',
      { empresa_id, doc_tipo, doc_num, nombre, apellido, email, telefono }
    );
    const [rows] = await pool.execute('SELECT * FROM Cliente WHERE cliente_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando cliente' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT * FROM Cliente ORDER BY cliente_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando clientes' }); }
});

export default router;
