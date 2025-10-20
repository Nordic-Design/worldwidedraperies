"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";
import { FABRICS } from "./data";

const FILTERS = ["All", "Patterns", "Sheers", "Blackouts", "Dyed Blackouts", "Dyed"] as const;

export default function FabricsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [remote, setRemote] = useState<typeof FABRICS>([] as any);
  useEffect(() => { (async () => {
    try {
      const res = await fetch(`/api/fabrics/import`, { cache: "no-store"});
      const j = await res.json();
      setRemote(j.items || []);
    } catch { setRemote([] as any); }
  })(); }, []);

  // Prefer remote items when present to avoid static placeholders
  const all = useMemo(()=> (remote && remote.length ? remote : FABRICS), [remote]);
  const filtered = useMemo(() => (
    filter === "All" ? all as any : all.filter(f => f.category === filter)
  ), [filter, all]);

  return (
    <PageContainer>
      <Section title="Fabrics" intro="Our textiles, fabrics, and draperies showcase exquisite shades. Contact us for custom options based on our collection of patterns and base materials.">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-[var(--text-muted)]">Filter By:</span>
          {Array.from(new Set(["All", ...all.map((x:any)=> x.category)])).map((f: any) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 h-9 rounded-full border ${filter===f?"bg-[var(--brand-olive)] text-white border-transparent":"border-slate-300"}`}>{f}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((f: any) => (
            <Link key={f.slug} href={`/fabrics/${f.slug}`} className="block rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
              <div className="aspect-[4/3]">
                <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-medium text-[var(--text-primary)]">{f.name}</div>
                <div className="text-sm text-[var(--text-muted)]">{f.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}


