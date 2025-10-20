"use client";

import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";

export default function FabricsAdmin() {
  const [authed, setAuthed] = useState(false);
  const [booted, setBooted] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [replace, setReplace] = useState(false);

  useEffect(()=>{
    const v = typeof window !== 'undefined' ? sessionStorage.getItem("cmsAuthed") : null;
    if (v === "1") setAuthed(true);
    setBooted(true);
  },[]);

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (u === "damen" && p === "wwdpatterns1") { setAuthed(true); sessionStorage.setItem("cmsAuthed","1"); }
    else alert("Invalid credentials");
  }

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    if (replace) fd.append("replace", "1");
    const res = await fetch("/api/fabrics/import", { method: "POST", body: fd });
    const j = await res.json();
    if (res.ok) setCount(j.count || 0); else alert(j.error || "Upload failed");
    await refresh();
  }

  async function refresh() {
    const r = await fetch("/api/fabrics/import", { cache: "no-store"});
    const j = await r.json();
    setItems(j.items || []);
  }

  useEffect(()=>{ if (authed) refresh(); }, [authed]);

  if (!booted) {
    return (
      <PageContainer>
        <Section title="Fabrics Admin" intro="Loading..." />
      </PageContainer>
    );
  }

  if (!authed) {
    return (
      <PageContainer>
        <Section title="Fabrics Admin" intro="Login to bulk import fabrics via CSV.">
          <form onSubmit={login} className="max-w-sm space-y-3">
            <input name="username" autoComplete="username" value={u} onChange={e=>setU(e.target.value)} placeholder="Username" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <input name="password" autoComplete="current-password" value={p} onChange={e=>setP(e.target.value)} type="password" placeholder="Password" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <button className="inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--accent-gold)] text-black">Login</button>
          </form>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section title="Bulk CSV Import" intro="Headers: slug,name,manufacturer,category,image,application,width,designTypes,fireCodes,content,railroaded">
        <form onSubmit={upload} className="space-y-3">
          <input type="file" accept=".csv" onChange={e=>setFile(e.target.files?.[0] || null)} className="block" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={replace} onChange={e=>setReplace(e.target.checked)} /> Replace existing</label>
          <button className="inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--accent-gold)] text-black">Upload</button>
          {count !== null ? <div className="text-[var(--text-muted)]">Imported fabrics: {count}</div> : null}
        </form>
      </Section>

      <Section title="Manage Fabrics" intro="Select rows and delete in bulk, or delete individually.">
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2"><input type="checkbox" checked={items.length>0 && items.every(i=>selected[i.slug])} onChange={e=>{
                  const v = e.target.checked; const next: Record<string, boolean> = {}; items.forEach(i=> next[i.slug]=v); setSelected(next);
                }} /></th>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Image</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.slug} className="border-t cursor-pointer" onClick={()=> location.href = `/fabrics/admin/${encodeURIComponent(i.slug)}` }>
                  <td className="p-2"><input type="checkbox" checked={!!selected[i.slug]} onChange={e=> setSelected({...selected, [i.slug]: e.target.checked})} /></td>
                  <td className="p-2 underline">{i.name}</td>
                  <td className="p-2">{i.category}</td>
                  <td className="p-2"><img src={i.image} alt="" className="h-12 w-20 object-cover" /></td>
                  <td className="p-2"><button onClick={async(e)=>{ e.stopPropagation(); await fetch(`/api/fabrics/import?slug=${encodeURIComponent(i.slug)}`, { method: "DELETE"}); await refresh(); }} className="text-red-700 hover:underline">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button onClick={async()=>{ const slugs = Object.keys(selected).filter(k=>selected[k]); if(!slugs.length) return; await fetch('/api/fabrics/import', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slugs })}); await refresh(); }} className="px-4 h-10 rounded-full border border-slate-300">Delete selected</button>
          <button onClick={refresh} className="px-4 h-10 rounded-full bg-[var(--accent-gold)] text-black">Refresh</button>
        </div>
      </Section>
    </PageContainer>
  );
}


