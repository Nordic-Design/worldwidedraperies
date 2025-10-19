"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";
import { FABRICS } from "./data";

const FILTERS = ["All", "Patterns", "Sheers", "Blackouts", "Dyed"] as const;

export default function FabricsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = useMemo(() => (
    filter === "All" ? FABRICS : FABRICS.filter(f => f.category === filter)
  ), [filter]);

  return (
    <PageContainer>
      <Section title="Fabrics" intro="Our textiles, fabrics, and draperies showcase exquisite shades. Contact us for custom options based on our collection of patterns and base materials.">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-[var(--text-muted)]">Filter By:</span>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 h-9 rounded-full border ${filter===f?"bg-[var(--brand-olive)] text-white border-transparent":"border-slate-300"}`}>{f}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(f => (
            <Link key={f.slug} href={`/fabrics/${f.slug}`} className="block rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
              <div className="relative aspect-[4/3]">
                <Image src={f.image} alt={f.name} fill className="object-cover" />
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


