import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api.js';
export default function Espacios(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({zona_id:'',numero:'',estado:'libre'});
  const load=async()=>setItems(await apiGet('/espacios'));
  useEffect(()=>{load();},[]);
  const save=async e=>{ e.preventDefault(); await apiPost('/espacios', form); setForm({zona_id:'',numero:'',estado:'libre'}); await load(); };
  return (<div>
    <h2>Espacios</h2>
    <form onSubmit={save} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
      <input placeholder='Zona ID' value={form.zona_id} onChange={e=>setForm({...form,zona_id:e.target.value})} required/>
      <input placeholder='Número' value={form.numero} onChange={e=>setForm({...form,numero:e.target.value})}/>
      <select value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})}><option>libre</option><option>ocupado</option><option>mantenimiento</option></select>
      <button>Crear</button>
    </form>
    <table border='1' cellPadding='6' style={{marginTop:12,width:'100%'}}><thead><tr><th>ID</th><th>Número</th><th>Estado</th></tr></thead><tbody>{items.map(it=>(<tr key={it.espacio_id}><td>{it.espacio_id}</td><td>{it.numero}</td><td>{it.estado}</td></tr>))}</tbody></table>
  </div>);
}
