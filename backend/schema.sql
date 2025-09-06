-- Schema generated to match provided ERD
CREATE DATABASE IF NOT EXISTS parking_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE parking_db;

CREATE TABLE IF NOT EXISTS Empresa (
  empresa_id INT AUTO_INCREMENT PRIMARY KEY,
  ruc VARCHAR(50) UNIQUE,
  razon_social VARCHAR(255),
  nombre_comercial VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Sede (
  sede_id INT AUTO_INCREMENT PRIMARY KEY,
  empresa_id INT,
  nombre VARCHAR(255),
  direccion VARCHAR(255),
  FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Cliente (
  cliente_id INT AUTO_INCREMENT PRIMARY KEY,
  empresa_id INT,
  doc_tipo VARCHAR(50),
  doc_num VARCHAR(100),
  nombre VARCHAR(120),
  apellido VARCHAR(120),
  email VARCHAR(150),
  telefono VARCHAR(50),
  FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Vehiculo_Tipo (
  vehiculo_tipo_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80),
  descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Vehiculo (
  vehiculo_id INT AUTO_INCREMENT PRIMARY KEY,
  placa VARCHAR(50) UNIQUE,
  vehiculo_tipo_id INT,
  color VARCHAR(50),
  FOREIGN KEY (vehiculo_tipo_id) REFERENCES Vehiculo_Tipo(vehiculo_tipo_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Zona (
  zona_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120),
  descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Espacio (
  espacio_id INT AUTO_INCREMENT PRIMARY KEY,
  zona_id INT,
  numero VARCHAR(50),
  estado VARCHAR(20) DEFAULT 'libre',
  FOREIGN KEY (zona_id) REFERENCES Zona(zona_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Tarifa (
  tarifa_id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_vehiculo INT,
  precio_hora DECIMAL(10,2),
  precio_dia DECIMAL(10,2),
  precio_mes DECIMAL(10,2),
  descripcion VARCHAR(255),
  FOREIGN KEY (tipo_vehiculo) REFERENCES Vehiculo_Tipo(vehiculo_tipo_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Ticket (
  ticket_id INT AUTO_INCREMENT PRIMARY KEY,
  espacio_id INT,
  vehiculo_id INT,
  tarifa_id INT,
  fecha_entrada DATETIME,
  fecha_salida DATETIME NULL,
  estado VARCHAR(50) DEFAULT 'abierto',
  monto_total DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (espacio_id) REFERENCES Espacio(espacio_id),
  FOREIGN KEY (vehiculo_id) REFERENCES Vehiculo(vehiculo_id),
  FOREIGN KEY (tarifa_id) REFERENCES Tarifa(tarifa_id)
);

CREATE TABLE IF NOT EXISTS Metodo_Pago (
  metodo_pago_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Pago (
  pago_id INT AUTO_INCREMENT PRIMARY KEY,
  metodo_pago_id INT,
  ticket_id INT,
  monto DECIMAL(12,2),
  referencia VARCHAR(255),
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (metodo_pago_id) REFERENCES Metodo_Pago(metodo_pago_id),
  FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
);

CREATE TABLE IF NOT EXISTS Rol (
  rol_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Usuario (
  usuario_id INT AUTO_INCREMENT PRIMARY KEY,
  empresa_id INT,
  rol_id INT,
  nombre VARCHAR(120),
  username VARCHAR(100) UNIQUE,
  correo VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id),
  FOREIGN KEY (rol_id) REFERENCES Rol(rol_id)
);

CREATE TABLE IF NOT EXISTS Sesion_Caja (
  sesion_caja_id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  saldo_inicial DECIMAL(12,2) DEFAULT 0,
  fecha_abierto DATETIME,
  fecha_cierre DATETIME NULL,
  saldo_cierre DECIMAL(12,2) NULL,
  estado BOOLEAN DEFAULT 1,
  FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);

CREATE TABLE IF NOT EXISTS Movimiento_Caja (
  movimiento_caja_id INT AUTO_INCREMENT PRIMARY KEY,
  sesion_caja_id INT,
  pago_id INT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  tipo VARCHAR(50),
  descripcion VARCHAR(255),
  monto DECIMAL(12,2),
  FOREIGN KEY (sesion_caja_id) REFERENCES Sesion_Caja(sesion_caja_id),
  FOREIGN KEY (pago_id) REFERENCES Pago(pago_id)
);

CREATE TABLE IF NOT EXISTS Reserva (
  reserva_id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  vehiculo_tipo_id INT,
  empresa_id INT,
  espacio_id INT,
  inicio_reserva DATETIME,
  fin_reserva DATETIME,
  estado VARCHAR(50),
  anticipo DECIMAL(10,2)
);
