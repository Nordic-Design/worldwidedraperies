"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";
import { V1_PATTERNS, RenderCustomSVG } from "../v1";

export default function PatternEditorV1() {
  const router = useRouter();
  const params = useParams() as { slug?: string };
  const slug = params?.slug ?? V1_PATTERNS[0].slug;
  const builtIn = useMemo(() => V1_PATTERNS.find(p => p.slug === slug) ?? null, [slug]);
  const [cmsMarkup, setCmsMarkup] = useState<string>("");
  const [title, setTitle] = useState<string>(builtIn?.name || "Pattern");

  useEffect(() => {
    if (builtIn) { setCmsMarkup(""); setTitle(builtIn.name); return; }
    (async () => {
      try {
        const res = await fetch("/api/cms/patterns", { cache: "no-store" });
        const data = await res.json();
        const rec = (data?.patterns || []).find((p: any) => p.slug === slug);
        if (rec) { setCmsMarkup(rec.svgMarkup || ""); setTitle(rec.name || "Pattern"); }
      } catch {}
    })();
  }, [slug, builtIn]);

  const [bg, setBg] = useState("#F9F9F6");
  const [fg, setFg] = useState("#C5B8A5");
  const [acc, setAcc] = useState("#D4AF37");
  const [openPicker, setOpenPicker] = useState<null | "bg" | "fg" | "acc" >(null);

  const swatches = ["#111111","#4A4A4A","#777777","#C5B8A5","#E7D9C4","#D4AF37","#8B5E3C","#9AA6A4","#F9F9F6","#ffffff"];

  function selectColor(hex: string) {
    if (openPicker === "bg") setBg(hex);
    if (openPicker === "fg") setFg(hex);
    if (openPicker === "acc") setAcc(hex);
    setOpenPicker(null);
  }

  return (
    <PageContainer>
      <Section title={title} intro="Set background, foreground, and accent colors.">
        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
          <div className="space-y-4">
            <button onClick={() => router.back()} className="text-sm underline">← Back</button>
            <div className="space-y-3">
              {([
                { key: "bg", label: "Background", value: bg },
                { key: "fg", label: "Foreground", value: fg },
                { key: "acc", label: "Accent", value: acc },
              ] as const).map((c) => (
                <div key={c.key} className="relative">
                  <button onClick={() => setOpenPicker(openPicker===c.key?null:c.key)} className="w-full h-11 border rounded-md flex items-center justify-between px-3">
                    <span>{c.label}</span>
                    <span className="h-6 w-6 rounded-full border" style={{ background: c.value }} />
                  </button>
                  {openPicker === c.key ? (
                    <div className="absolute z-10 mt-2 p-2 rounded-md border bg-white grid grid-cols-5 gap-2">
                      {swatches.map(hex => (
                        <button key={hex} onClick={() => selectColor(hex)} className="h-8 w-8 rounded" style={{ background: hex }} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[color:var(--brand-taupe)]/30 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
            {builtIn ? (
              <builtIn.Component bg={bg} fg={fg} acc={acc} />
            ) : cmsMarkup ? (
              <RenderCustomSVG markup={cmsMarkup} bg={bg} fg={fg} acc={acc} />
            ) : null}
            <div className="mt-4 text-sm text-[var(--text-muted)]">Pick a swatch for Background, Foreground, and Accent. The picker closes after selection.</div>
            <div className="mt-4">
              <button onClick={() => router.push(`/patterns/${slug}/finalize?colors=${encodeURIComponent(JSON.stringify([bg, fg, acc]))}`)} className="px-5 py-2 rounded-full bg-[var(--accent-gold)] text-black">Continue</button>
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}


