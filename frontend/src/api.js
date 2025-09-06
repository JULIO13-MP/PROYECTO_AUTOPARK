const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
export async function apiGet(path){ const res = await fetch(`${API_URL}${path}`); return res.json(); }
export async function apiPost(path, data){ const res = await fetch(`${API_URL}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }); return res.json(); }
export async function apiPut(path, data){ const res = await fetch(`${API_URL}${path}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }); return res.json(); }
export async function apiDel(path){ const res = await fetch(`${API_URL}${path}`, { method:'DELETE' }); return res.json(); }
