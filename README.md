# Parking System — Full stack (Node.js + React + MySQL)

Carpeta generada:
- backend/: API Node.js + Express con rutas para Empresa, Sede, Cliente, Vehículo, Vehículo Tipo, Zona, Espacio, Tarifa, Reserva, Ticket (entrada/salida), Pago, Método de pago, Usuario (register/login), Sesión de Caja, Movimiento Caja.
- frontend/: React (Vite) panel muy básico con CRUD mínimo para varios módulos.

Instrucciones rápidas:
1. Importa schema: `mysql -u root -p < backend/schema.sql` o usa un cliente para ejecutar `backend/schema.sql`.
2. Backend:
   - Copia `backend/.env.example` a `backend/.env` y ajusta credenciales.
   - `cd backend && npm install && npm run dev`
3. Frontend:
   - `cd frontend && npm install && npm run dev`
4. Abre `http://localhost:5173` para el frontend. API por defecto en `http://localhost:4000/api`.

Notas:
- Asegúrate de que nombres de tablas en MySQL coincidan (uso mayúsculas exactamente como en schema.sql).
- Este proyecto es un starter para desarrollar y ampliar (validaciones, autenticación completa, manejo de errores, tests).
