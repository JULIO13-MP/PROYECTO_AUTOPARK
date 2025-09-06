import React, { useState } from 'react';
import Empresas from './components/Empresas.jsx';
import Sedes from './components/Sedes.jsx';
import Clientes from './components/Clientes.jsx';
import Vehiculos from './components/Vehiculos.jsx';
import Espacios from './components/Espacios.jsx';
import Tickets from './components/Tickets.jsx';
import Pagos from './components/Pagos.jsx';

export default function App(){
  const [tab, setTab] = useState('empresas');
  return (
    <div style={{padding:16,fontFamily:'system-ui, sans-serif'}}>
      <h1>Parking System — Panel</h1>
      <div style={{display:'flex',gap:8, marginBottom:12}}>
        {['empresas','sedes','clientes','vehiculos','espacios','tickets','pagos'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 10px'}}>{t}</button>
        ))}
      </div>
      <div>
        {tab==='empresas' && <Empresas/>}
        {tab==='sedes' && <Sedes/>}
        {tab==='clientes' && <Clientes/>}
        {tab==='vehiculos' && <Vehiculos/>}
        {tab==='espacios' && <Espacios/>}
        {tab==='tickets' && <Tickets/>}
        {tab==='pagos' && <Pagos/>}
      </div>
    </div>
  );
}
