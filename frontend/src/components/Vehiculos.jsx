import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api.js';
export default function Vehiculos(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({placa:'',vehiculo_tipo_id:'',color:''});
  const load=async()=>setItems(await apiGet('/vehiculos'));
  useEffect(()=>{load();},[]);
  const save=async e=>{ e.preventDefault(); await apiPost('/vehiculos', form); setForm({placa:'',vehiculo_tipo_id:'',color:''}); await load(); };
  return (<div>
    <h2>Vehículos</h2>
    <form onSubmit={save} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
      <input placeholder='Placa' value={form.placa} onChange={e=>setForm({...form,placa:e.target.value})} required/>
      <input placeholder='Tipo ID' value={form.vehiculo_tipo_id} onChange={e=>setForm({...form,vehiculo_tipo_id:e.target.value})}/>
      <input placeholder='Color' value={form.color} onChange={e=>setForm({...form,color:e.target.value})}/>
      <button>Crear</button>
    </form>
    <table border='1' cellPadding='6' style={{marginTop:12,width:'100%'}}><thead><tr><th>ID</th><th>Placa</th><th>Tipo</th></tr></thead><tbody>{items.map(it=>(<tr key={it.vehiculo_id}><td>{it.vehiculo_id}</td><td>{it.placa}</td><td>{it.tipo_nombre||'-'}</td></tr>))}</tbody></table>
  </div>);
}
