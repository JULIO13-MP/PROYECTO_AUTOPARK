import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { ticket_id, metodo_pago_id, monto, referencia } = req.body;
    const [r] = await pool.execute('INSERT INTO Pago (metodo_pago_id, ticket_id, monto, referencia) VALUES (:metodo_pago_id,:ticket_id,:monto,:referencia)', { metodo_pago_id, ticket_id, monto, referencia });
    const [ticketRows] = await pool.execute('SELECT monto_total FROM Ticket WHERE ticket_id = :id', { id: ticket_id });
    if (ticketRows.length) {
      const totalTicket = Number(ticketRows[0].monto_total ?? 0);
      if (totalTicket && monto >= totalTicket) {
        await pool.execute('UPDATE Ticket SET estado = "pagado" WHERE ticket_id = :id', { id: ticket_id });
      }
    }
    const [rows] = await pool.execute('SELECT * FROM Pago WHERE pago_id = :id', { id: r.lastInsertId });
    res.status(201).json(rows[0]);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Error registrando pago' }); }
});

router.get('/', async (_req, res) => {
  try { const [rows] = await pool.execute('SELECT p.*, mp.nombre AS metodo FROM Pago p LEFT JOIN Metodo_Pago mp ON mp.metodo_pago_id = p.metodo_pago_id ORDER BY p.pago_id DESC'); res.json(rows); } catch (e){ console.error(e); res.status(500).json({ error: 'Error listando pagos' }); }
});

export default router;
