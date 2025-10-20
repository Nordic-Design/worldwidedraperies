"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "../../../components/PageContainer";
import Section from "../../../components/Section";

export default function EditFabric() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const [item, setItem] = useState<any | null>(null);
  const [authed, setAuthed] = useState(false);

  useEffect(()=>{ if (sessionStorage.getItem("cmsAuthed") === "1") setAuthed(true); },[]);
  useEffect(()=>{ (async ()=>{
    if (!authed) return;
    const r = await fetch('/api/fabrics/import', { cache: 'no-store' });
    const j = await r.json();
    const it = (j.items||[]).find((x:any)=> x.slug===slug);
    setItem(it||null);
  })(); }, [slug, authed]);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!item) return;
    const res = await fetch('/api/fabrics/import', { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(item) });
    const j = await res.json();
    if (!res.ok) return alert(j.error||'Save failed');
    router.push('/fabrics/admin');
  }

  if (!authed) {
    return (
      <PageContainer>
        <Section title="Unauthorized" intro="Please login via /fabrics/admin." />
      </PageContainer>
    );
  }

  if (!item) {
    return (
      <PageContainer>
        <Section title="Loading" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section title={`Edit · ${item.name}`}>
        <form onSubmit={save} className="grid lg:grid-cols-2 gap-4">
          <label className="text-sm">Name<input value={item.name||''} onChange={e=>setItem({...item, name:e.target.value})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm">Manufacturer<input value={item.manufacturer||''} onChange={e=>setItem({...item, manufacturer:e.target.value})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm">Category<input value={item.category||''} onChange={e=>setItem({...item, category:e.target.value})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm lg:col-span-2">Image URL<input value={item.image||''} onChange={e=>setItem({...item, image:e.target.value})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>

          <label className="text-sm">Application<input value={item.specs?.application||''} onChange={e=>setItem({...item, specs:{...item.specs, application:e.target.value}})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm">Width<input value={item.specs?.width||''} onChange={e=>setItem({...item, specs:{...item.specs, width:e.target.value}})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm">Design Types<input value={item.specs?.designTypes||''} onChange={e=>setItem({...item, specs:{...item.specs, designTypes:e.target.value}})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm">Fire Codes<input value={item.specs?.fireCodes||''} onChange={e=>setItem({...item, specs:{...item.specs, fireCodes:e.target.value}})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm">Content<input value={item.specs?.content||''} onChange={e=>setItem({...item, specs:{...item.specs, content:e.target.value}})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>
          <label className="text-sm">Railroaded<input value={item.specs?.railroaded||''} onChange={e=>setItem({...item, specs:{...item.specs, railroaded:e.target.value}})} className="mt-1 h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" /></label>

          <div className="lg:col-span-2 flex items-center gap-3 mt-2">
            <button className="px-5 h-11 rounded-full bg-[var(--accent-gold)] text-black">Save</button>
            <button type="button" onClick={()=>router.back()} className="px-5 h-11 rounded-full border border-slate-300">Cancel</button>
          </div>
        </form>
      </Section>
    </PageContainer>
  );
}


