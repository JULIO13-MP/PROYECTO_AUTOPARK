import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/enter', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { vehiculo_id, espacio_id, tarifa_id } = req.body;
    await conn.beginTransaction();
    const [espRows] = await conn.execute('SELECT estado FROM Espacio WHERE espacio_id = :id FOR UPDATE', { id: espacio_id });
    if (!espRows.length) throw { code: 400, message: 'Espacio no existe' };
    if (espRows[0].estado === 'ocupado') throw { code: 400, message: 'Espacio ya ocupado' };
    const [r] = await conn.execute('INSERT INTO Ticket (espacio_id, vehiculo_id, tarifa_id, fecha_entrada, estado) VALUES (:espacio_id,:vehiculo_id,:tarifa_id,NOW(),"abierto")', { espacio_id, vehiculo_id, tarifa_id });
    await conn.execute('UPDATE Espacio SET estado = "ocupado" WHERE espacio_id = :id', { id: espacio_id });
    await conn.commit();
    const [ticketRows] = await conn.execute('SELECT * FROM Ticket WHERE ticket_id = :id', { id: r.lastInsertId });
    res.status(201).json(ticketRows[0]);
  } catch (e) {
    await conn.rollback();
    console.error(e);
    if (e && e.code && e.message) return res.status(e.code).json({ error: e.message });
    res.status(500).json({ error: 'Error registrando entrada' });
  } finally { conn.release(); }
});

router.post('/exit/:id', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const id = req.params.id;
    await conn.beginTransaction();
    const [rows] = await conn.execute('SELECT t.*, ta.precio_hora, e.espacio_id FROM Ticket t LEFT JOIN Tarifa ta ON ta.tarifa_id = t.tarifa_id LEFT JOIN Espacio e ON e.espacio_id = t.espacio_id WHERE t.ticket_id = :id FOR UPDATE', { id });
    if (!rows.length) throw { code: 404, message: 'Ticket no encontrado' };
    const ticket = rows[0];
    if (ticket.fecha_salida) throw { code: 400, message: 'Ticket ya cerrado' };
    const [diff] = await conn.execute('SELECT TIMESTAMPDIFF(MINUTE, fecha_entrada, NOW()) AS minutos');
    const minutos = diff[0].minutos ?? 0;
    const horas = Math.ceil(minutos/60) || 1;
    const precio_hora = Number(ticket.precio_hora ?? 0);
    const total = horas * precio_hora;
    await conn.execute('UPDATE Ticket SET fecha_salida = NOW(), monto_total = :total, estado = "cerrado" WHERE ticket_id = :id', { total, id });
    await conn.execute('UPDATE Espacio SET estado = "libre" WHERE espacio_id = :id', { id: ticket.espacio_id });
    await conn.commit();
    const [finalRows] = await conn.execute('SELECT * FROM Ticket WHERE ticket_id = :id', { id });
    res.json(finalRows[0]);
  } catch (e) {
    await conn.rollback();
    console.error(e);
    if (e && e.code && e.message) return res.status(e.code).json({ error: e.message });
    res.status(500).json({ error: 'Error cerrando ticket' });
  } finally { conn.release(); }
});

router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT t.*, v.placa, e.numero AS espacio_numero FROM Ticket t LEFT JOIN Vehiculo v ON v.vehiculo_id = t.vehiculo_id LEFT JOIN Espacio e ON e.espacio_id = t.espacio_id ORDER BY t.ticket_id DESC');
    res.json(rows);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error listando tickets' }); }
});

export default router;
