import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { placa, vehiculo_tipo_id, color } = req.body;
    const [r] = await pool.execute('INSERT INTO Vehiculo (placa, vehiculo_tipo_id, color) VALUES (:placa,:vehiculo_tipo_id,:color)', { placa, vehiculo_tipo_id, color });
    const [rows] = await pool.execute('SELECT * FROM Vehiculo WHERE vehiculo_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando vehículo' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT v.*, vt.nombre AS tipo_nombre FROM Vehiculo v LEFT JOIN Vehiculo_Tipo vt ON vt.vehiculo_tipo_id = v.vehiculo_tipo_id ORDER BY v.vehiculo_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando vehiculos' }); }
});

export default router;
