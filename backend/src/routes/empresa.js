import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { ruc, razon_social, nombre_comercial } = req.body;
    const [r] = await pool.execute('INSERT INTO Empresa (ruc, razon_social, nombre_comercial) VALUES (:ruc,:razon_social,:nombre_comercial)', { ruc, razon_social, nombre_comercial });
    const [rows] = await pool.execute('SELECT * FROM Empresa WHERE empresa_id = :id',{ id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error creando empresa' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Empresa ORDER BY empresa_id DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'Error listando empresas' });
  }
});

export default router;
