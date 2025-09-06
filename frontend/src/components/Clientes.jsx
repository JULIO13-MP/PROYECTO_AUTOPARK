import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api.js';
export default function Clientes(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({empresa_id:'',doc_tipo:'',doc_num:'',nombre:'',apellido:'',email:'',telefono:''});
  const load=async()=>setItems(await apiGet('/clientes'));
  useEffect(()=>{load();},[]);
  const save=async e=>{ e.preventDefault(); await apiPost('/clientes', form); setForm({empresa_id:'',doc_tipo:'',doc_num:'',nombre:'',apellido:'',email:'',telefono:''}); await load(); };
  return (<div>
    <h2>Clientes</h2>
    <form onSubmit={save} style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8}}>
      <input placeholder='Empresa ID' value={form.empresa_id} onChange={e=>setForm({...form,empresa_id:e.target.value})} required/>
      <input placeholder='Doc tipo' value={form.doc_tipo} onChange={e=>setForm({...form,doc_tipo:e.target.value})}/>
      <input placeholder='Doc num' value={form.doc_num} onChange={e=>setForm({...form,doc_num:e.target.value})}/>
      <input placeholder='Nombre' value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/>
      <input placeholder='Apellido' value={form.apellido} onChange={e=>setForm({...form,apellido:e.target.value})}/>
      <input placeholder='Teléfono' value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})}/>
      <button style={{gridColumn:'1/7'}}>Crear</button>
    </form>
    <table border='1' cellPadding='6' style={{marginTop:12,width:'100%'}}><thead><tr><th>ID</th><th>Nombre</th><th>Doc</th></tr></thead><tbody>{items.map(it=>(<tr key={it.cliente_id}><td>{it.cliente_id}</td><td>{it.nombre} {it.apellido}</td><td>{it.doc_tipo} {it.doc_num}</td></tr>))}</tbody></table>
  </div>);
}
