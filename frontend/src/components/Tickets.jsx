import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api.js';
export default function Tickets(){
  const [sessions,setSessions]=useState([]);
  const [vehicles,setVehicles]=useState([]);
  const [espacios,setEspacios]=useState([]);
  const [form,setForm]=useState({vehiculo_id:'',espacio_id:'',tarifa_id:''});
  const load=async()=>{ const [s,v,e]=await Promise.all([apiGet('/tickets'), apiGet('/vehiculos'), apiGet('/espacios')]); setSessions(s); setVehicles(v); setEspacios(e); };
  useEffect(()=>{load();},[]);
  const enter=async e=>{ e.preventDefault(); await apiPost('/tickets/enter', form); setForm({vehiculo_id:'',espacio_id:'',tarifa_id:''}); await load(); };
  const exitTicket=async (id)=>{ await apiPost(`/tickets/exit/${id}`,{}); await load(); };
  return (<div>
    <h2>Tickets</h2>
    <form onSubmit={enter} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
      <select value={form.vehiculo_id} onChange={e=>setForm({...form,vehiculo_id:e.target.value})}><option value=''>--Vehículo--</option>{vehicles.map(v=><option key={v.vehiculo_id} value={v.vehiculo_id}>{v.placa}</option>)}</select>
      <select value={form.espacio_id} onChange={e=>setForm({...form,espacio_id:e.target.value})}><option value=''>--Espacio--</option>{espacios.map(s=><option key={s.espacio_id} value={s.espacio_id}>{s.numero} ({s.estado})</option>)}</select>
      <input placeholder='Tarifa ID' value={form.tarifa_id} onChange={e=>setForm({...form,tarifa_id:e.target.value})}/>
      <button>Registrar entrada</button>
    </form>
    <h3 style={{marginTop:12}}>Todos</h3>
    <table border='1' cellPadding='6' style={{width:'100%'}}><thead><tr><th>ID</th><th>Placa</th><th>Espacio</th><th>Entrada</th><th>Salida</th><th>Acciones</th></tr></thead><tbody>{sessions.map(s=>(<tr key={s.ticket_id}><td>{s.ticket_id}</td><td>{s.placa||'-'}</td><td>{s.espacio_numero||'-'}</td><td>{s.fecha_entrada}</td><td>{s.fecha_salida||'-'}</td><td>{!s.fecha_salida && <button onClick={()=>exitTicket(s.ticket_id)}>Cerrar</button>}</td></tr>))}</tbody></table>
  </div>);
}
