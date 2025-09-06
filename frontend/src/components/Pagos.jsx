import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api.js';
export default function Pagos(){
  const [pagos,setPagos]=useState([]);
  const [form,setForm]=useState({ticket_id:'',metodo_pago_id:'',monto:'',referencia:''});
  const load=async()=>setPagos(await apiGet('/pagos'));
  useEffect(()=>{load();},[]);
  const save=async e=>{ e.preventDefault(); await apiPost('/pagos', form); setForm({ticket_id:'',metodo_pago_id:'',monto:'',referencia:''}); await load(); };
  return (<div>
    <h2>Pagos</h2>
    <form onSubmit={save} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
      <input placeholder='Ticket ID' value={form.ticket_id} onChange={e=>setForm({...form,ticket_id:e.target.value})} required/>
      <input placeholder='Método ID' value={form.metodo_pago_id} onChange={e=>setForm({...form,metodo_pago_id:e.target.value})} required/>
      <input placeholder='Monto' value={form.monto} onChange={e=>setForm({...form,monto:e.target.value})} required/>
      <button>Registrar</button>
    </form>
    <table border='1' cellPadding='6' style={{marginTop:12,width:'100%'}}><thead><tr><th>ID</th><th>Ticket</th><th>Monto</th><th>Fecha</th></tr></thead><tbody>{pagos.map(p=>(<tr key={p.pago_id}><td>{p.pago_id}</td><td>{p.ticket_id}</td><td>{p.monto}</td><td>{p.fecha_creacion}</td></tr>))}</tbody></table>
  </div>);
}
