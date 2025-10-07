"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";
import { PATTERNS } from "../data";

export default function PatternEditor() {
  const router = useRouter();
  const params = useParams() as { slug?: string };
  const slug = params?.slug ?? PATTERNS[0].slug;
  const pattern = useMemo(() => PATTERNS.find(p => p.slug === slug) ?? PATTERNS[0], [slug]);
  const [colors, setColors] = useState<string[]>(["#D4AF37", "#C5B8A5", "#4A4A4A"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fills, setFills] = useState<Record<string, string>>({});

  function onRegionClick(id: string) {
    const chosen = colors[activeIndex];
    setFills(prev => ({ ...prev, [id]: chosen }));
  }

  return (
    <PageContainer>
      <Section title={pattern.name} intro="Pick up to 3 colors, then click on the pattern to apply them.">
        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
          <div className="space-y-4">
            <button onClick={() => router.back()} className="text-sm underline">← Back</button>
            <div>
              <div className="text-sm text-[var(--text-muted)] mb-2">Your colors (max 3)</div>
              <div className="flex items-center gap-3">
                {colors.map((c, i) => (
                  <button key={i} aria-label={`color ${i+1}`} onClick={() => setActiveIndex(i)} style={{ background: c }} className={`h-9 w-9 rounded-full ring-2 ${activeIndex===i?"ring-[var(--accent-gold)]":"ring-transparent"}`} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                "#111111","#4A4A4A","#777777","#C5B8A5","#E7D9C4","#D4AF37","#8B5E3C","#9AA6A4","#F9F9F6"
              ].map(hex => (
                <button key={hex} onClick={() => setColors(prev => prev.map((c, i)=> i===activeIndex? hex : c))} style={{ background: hex }} className="h-8 rounded-md border border-black/5" />
              ))}
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[color:var(--brand-taupe)]/30 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
            <svg viewBox="0 0 400 240" className="w-full h-[360px]">
              {pattern.regions.map(r => (
                <path key={r.id} d={r.d} fill={fills[r.id] ?? "#ffffff"} stroke="#e5e7eb" onClick={() => onRegionClick(r.id)} className="cursor-pointer" />
              ))}
            </svg>
            <div className="mt-4 text-sm text-[var(--text-muted)]">Click a color, then click a region to apply. You can reapply any time.</div>
            <div className="mt-4">
              <button onClick={() => router.push(`/patterns/${pattern.slug}/finalize?fills=${encodeURIComponent(JSON.stringify(fills))}&colors=${encodeURIComponent(JSON.stringify(colors))}`)} className="px-5 py-2 rounded-full bg-[var(--accent-gold)] text-black">Continue</button>
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}


