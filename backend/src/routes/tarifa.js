import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { tipo_vehiculo, precio_hora, precio_dia, precio_mes, descripcion } = req.body;
    const [r] = await pool.execute('INSERT INTO Tarifa (tipo_vehiculo, precio_hora, precio_dia, precio_mes, descripcion) VALUES (:tipo_vehiculo,:precio_hora,:precio_dia,:precio_mes,:descripcion)', { tipo_vehiculo, precio_hora, precio_dia, precio_mes, descripcion });
    const [rows] = await pool.execute('SELECT * FROM Tarifa WHERE tarifa_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando tarifa' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT t.*, vt.nombre AS tipo_nombre FROM Tarifa t LEFT JOIN Vehiculo_Tipo vt ON vt.vehiculo_tipo_id = t.tipo_vehiculo ORDER BY t.tarifa_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando tarifas' }); }
});

export default router;
