import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Crear zona
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Insertar zona
    const [result] = await pool.execute(
      'INSERT INTO Zona (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );

    // Obtener la fila recién insertada
    const [rows] = await pool.execute(
      'SELECT * FROM Zona WHERE zona_id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error creando zona' });
  }
});

// Listar zonas
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM Zona ORDER BY zona_id DESC'
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error listando zonas' });
  }
});

export default router;
