import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { sesion_caja_id, pago_id, tipo, descripcion, monto } = req.body;
    const [r] = await pool.execute('INSERT INTO Movimiento_Caja (sesion_caja_id, pago_id, tipo, descripcion, monto) VALUES (:sesion_caja_id,:pago_id,:tipo,:descripcion,:monto)', { sesion_caja_id, pago_id, tipo, descripcion, monto });
    const [rows] = await pool.execute('SELECT * FROM Movimiento_Caja WHERE movimiento_caja_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando movimiento' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT m.*, s.usuario_id FROM Movimiento_Caja m LEFT JOIN Sesion_Caja s ON s.sesion_caja_id = m.sesion_caja_id ORDER BY m.movimiento_caja_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando movimientos' }); }
});

export default router;
