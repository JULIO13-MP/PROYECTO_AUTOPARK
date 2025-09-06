import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/open', async (req, res) => {
  try {
    const { usuario_id, saldo_inicial } = req.body;
    const [r] = await pool.execute('INSERT INTO Sesion_Caja (usuario_id, saldo_inicial, fecha_abierto, estado) VALUES (:usuario_id,:saldo_inicial,NOW(),1)', { usuario_id, saldo_inicial });
    const [rows] = await pool.execute('SELECT * FROM Sesion_Caja WHERE sesion_caja_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error abriendo sesión' }); }
});

router.post('/close/:id', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const id = req.params.id;
    await conn.beginTransaction();
    const [movs] = await conn.execute('SELECT IFNULL(SUM(monto),0) AS total_movimiento FROM Movimiento_Caja WHERE sesion_caja_id = :id', { id });
    const totalMov = Number(movs[0].total_movimiento ?? 0);
    const [ses] = await conn.execute('SELECT saldo_inicial FROM Sesion_Caja WHERE sesion_caja_id = :id FOR UPDATE', { id });
    if (!ses.length) throw { code: 404, message: 'Sesión no encontrada' };
    const saldoInicial = Number(ses[0].saldo_inicial ?? 0);
    const saldoCierre = saldoInicial + totalMov;
    await conn.execute('UPDATE Sesion_Caja SET fecha_cierre = NOW(), saldo_cierre = :saldo, estado = 0 WHERE sesion_caja_id = :id', { saldo: saldoCierre, id });
    await conn.commit();
    const [final] = await conn.execute('SELECT * FROM Sesion_Caja WHERE sesion_caja_id = :id', { id });
    res.json(final[0]);
  } catch (e) {
    await conn.rollback();
    console.error(e);
    if (e && e.code && e.message) return res.status(e.code).json({ error: e.message });
    res.status(500).json({ error: 'Error cerrando sesión' });
  } finally { conn.release(); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT * FROM Sesion_Caja ORDER BY sesion_caja_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando sesiones' }); }
});

export default router;
