import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api.js';
export default function Sedes(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({empresa_id:'',nombre:'',direccion:''});
  const load=async()=>setItems(await apiGet('/sedes'));
  useEffect(()=>{load();},[]);
  const save=async e=>{ e.preventDefault(); await apiPost('/sedes', form); setForm({empresa_id:'',nombre:'',direccion:''}); await load(); };
  return (<div>
    <h2>Sedes</h2>
    <form onSubmit={save} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
      <input placeholder='Empresa ID' value={form.empresa_id} onChange={e=>setForm({...form,empresa_id:e.target.value})} required/>
      <input placeholder='Nombre' value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/>
      <input placeholder='Dirección' value={form.direccion} onChange={e=>setForm({...form,direccion:e.target.value})}/>
      <button>Crear</button>
    </form>
    <table border='1' cellPadding='6' style={{marginTop:12,width:'100%'}}><thead><tr><th>ID</th><th>Nombre</th><th>Dirección</th></tr></thead><tbody>{items.map(it=>(<tr key={it.sede_id}><td>{it.sede_id}</td><td>{it.nombre}</td><td>{it.direccion}</td></tr>))}</tbody></table>
  </div>);
}
