import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { cliente_id, vehiculo_tipo_id, empresa_id, espacio_id, inicio_reserva, fin_reserva, estado, anticipo } = req.body;
    const [r] = await pool.execute(
      'INSERT INTO Reserva (cliente_id, vehiculo_tipo_id, empresa_id, espacio_id, inicio_reserva, fin_reserva, estado, anticipo) VALUES (:cliente_id,:vehiculo_tipo_id,:empresa_id,:espacio_id,:inicio_reserva,:fin_reserva,:estado,:anticipo)',
      { cliente_id, vehiculo_tipo_id, empresa_id, espacio_id, inicio_reserva, fin_reserva, estado, anticipo }
    );
    const [rows] = await pool.execute('SELECT * FROM Reserva WHERE reserva_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error creando reserva' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT r.*, c.nombre AS cliente_nombre, v.placa AS placa FROM Reserva r LEFT JOIN Cliente c ON c.cliente_id=r.cliente_id LEFT JOIN Vehiculo v ON v.vehiculo_id = r.espacio_id ORDER BY r.reserva_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando reservas' }); }
});

export default router;
