import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api.js';
export default function Empresas(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({ruc:'',razon_social:'',nombre_comercial:''});
  const load=async()=>setItems(await apiGet('/empresas'));
  useEffect(()=>{load();},[]);
  const save=async e=>{ e.preventDefault(); await apiPost('/empresas', form); setForm({ruc:'',razon_social:'',nombre_comercial:''}); await load(); };
  return (<div>
    <h2>Empresas</h2>
    <form onSubmit={save} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
      <input placeholder='RUC' value={form.ruc} onChange={e=>setForm({...form,ruc:e.target.value})} required/>
      <input placeholder='Razón social' value={form.razon_social} onChange={e=>setForm({...form,razon_social:e.target.value})}/>
      <button>Crear</button>
    </form>
    <table border='1' cellPadding='6' style={{marginTop:12,width:'100%'}}><thead><tr><th>ID</th><th>RUC</th><th>Razón</th></tr></thead><tbody>{items.map(it=>(<tr key={it.empresa_id}><td>{it.empresa_id}</td><td>{it.ruc}</td><td>{it.razon_social}</td></tr>))}</tbody></table>
  </div>);
}
