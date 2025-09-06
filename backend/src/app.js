import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import empresaRoutes from './routes/empresa.js';
import sedeRoutes from './routes/sede.js';
import clienteRoutes from './routes/cliente.js';
import vehiculoRoutes from './routes/vehiculo.js';
import vehiculoTipoRoutes from './routes/vehiculoTipo.js';
import zonaRoutes from './routes/zona.js';
import espacioRoutes from './routes/espacio.js';
import tarifaRoutes from './routes/tarifa.js';
import reservaRoutes from './routes/reserva.js';
import ticketRoutes from './routes/ticket.js';
import pagoRoutes from './routes/pago.js';
import metodoPagoRoutes from './routes/metodoPago.js';
import usuarioRoutes from './routes/usuario.js';
import sesionCajaRoutes from './routes/sesionCaja.js';
import movimientoCajaRoutes from './routes/movimientoCaja.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, name: 'Parking API Full' }));

app.use('/api/empresas', empresaRoutes);
app.use('/api/sedes', sedeRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/vehiculo-tipos', vehiculoTipoRoutes);
app.use('/api/zonas', zonaRoutes);
app.use('/api/espacios', espacioRoutes);
app.use('/api/tarifas', tarifaRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/metodos-pago', metodoPagoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/sesiones-caja', sesionCajaRoutes);
app.use('/api/movimientos-caja', movimientoCajaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
