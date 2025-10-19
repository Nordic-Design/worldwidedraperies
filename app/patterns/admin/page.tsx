"use client";

import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";
import { RenderCustomSVG } from "../v1";

type CmsPattern = { slug: string; name: string; svgMarkup: string };

export default function AdminPatternsPage() {
  const [authed, setAuthed] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [svgMarkup, setSvgMarkup] = useState("<svg viewBox='0 0 400 240'><rect x='0' y='0' width='400' height='240' fill='{bg}'/><circle cx='200' cy='120' r='80' fill='{fg}' /><rect x='0' y='220' width='400' height='20' fill='{acc}'/></svg>");
  const [list, setList] = useState<CmsPattern[]>([]);
  const [previewColors] = useState({ bg: "#F9F9F6", fg: "#C5B8A5", acc: "#D4AF37" });

  async function load() {
    try {
      const res = await fetch("/api/cms/patterns", { cache: "no-store" });
      const data = await res.json();
      setList(data.patterns || []);
    } catch {
      setList([]);
    }
  }

  useEffect(() => {
    const flag = typeof window !== "undefined" ? sessionStorage.getItem("cmsAuthed") : null;
    if (flag === "1") setAuthed(true);
  }, []);
  useEffect(() => { if (authed) load(); }, [authed]);

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (u === "damen" && p === "wwdpatterns1") {
      setAuthed(true);
      if (typeof window !== "undefined") sessionStorage.setItem("cmsAuthed", "1");
    } else {
      alert("Invalid credentials");
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/cms/patterns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, name, svgMarkup }) });
    if (res.ok) {
      setSlug(""); setName("");
      await load();
    } else {
      const j = await res.json();
      alert(j.error || "Failed");
    }
  }

  if (!authed) {
    return (
      <PageContainer>
        <Section title="Admin Login" intro="Sign in to manage patterns.">
          <form onSubmit={login} className="max-w-sm space-y-3">
            <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <input value={p} onChange={e=>setP(e.target.value)} placeholder="Password" type="password" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <button className="inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--accent-gold)] text-black">Login</button>
          </form>
        </Section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Section title="Admin · Patterns" intro="Add SVG patterns using {bg}, {fg}, {acc} tokens.">
        <form onSubmit={submit} className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
          <div className="space-y-3">
            <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" required />
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" required />
            <textarea value={svgMarkup} onChange={e=>setSvgMarkup(e.target.value)} rows={10} className="px-3 py-2 rounded-md border border-slate-300 bg-white text-black w-full" />
            <button className="inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--accent-gold)] text-black">Save pattern</button>
          </div>
          <div className="bg-[var(--card-bg)] rounded-xl border border-[color:var(--brand-taupe)]/30 p-4">
            <div className="text-sm text-[var(--text-muted)] mb-2">Preview</div>
            <RenderCustomSVG markup={svgMarkup} bg={previewColors.bg} fg={previewColors.fg} acc={previewColors.acc} />
          </div>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Existing</h3>
          <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((p) => (
              <li key={p.slug} className="rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)]">
                <div className="p-3 font-medium">{p.name}</div>
                <div className="aspect-video">
                  <RenderCustomSVG markup={p.svgMarkup} bg={previewColors.bg} fg={previewColors.fg} acc={previewColors.acc} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageContainer>
  );
}


