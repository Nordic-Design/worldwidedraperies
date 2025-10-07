"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PageContainer from "../../../components/PageContainer";
import Section from "../../../components/Section";
import { PATTERNS } from "../../data";

export default function FinalizePattern() {
  const router = useRouter();
  const params = useParams() as { slug?: string };
  const sp = useSearchParams();
  const fills = useMemo(() => JSON.parse(sp.get("fills") || "{}"), [sp]);
  const colors = useMemo(() => JSON.parse(sp.get("colors") || "[]"), [sp]);
  const slug = params?.slug ?? PATTERNS[0].slug;
  const pattern = useMemo(() => PATTERNS.find(p=>p.slug===slug) ?? PATTERNS[0], [slug]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");

  useEffect(() => {
    // Render a very simple canvas thumbnail of the colored regions
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 400; canvas.height = 240;
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0,0,400,240);
    // naive mapping for demo: rectangles from data.ts path strings
    pattern.regions.forEach((r) => {
      const fill = fills[r.id] || "#ffffff";
      // Parse only our rectangle paths (M x y Hx V y ...)
      const match = r.d.match(/M(\d+) (\d+) H(\d+) V(\d+) H(\d+) Z/);
      if (match) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        const x2 = parseInt(match[3]);
        const y2 = parseInt(match[4]);
        ctx.fillStyle = fill;
        ctx.fillRect(x, y, x2 - x, y2 - y);
      }
    });
    setImageDataUrl(canvas.toDataURL("image/png"));
  }, [fills, pattern.regions]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("patternName", pattern.name);
    form.append("colors", JSON.stringify(colors));
    form.append("fills", JSON.stringify(fills));
    if (imageDataUrl) form.append("imageDataUrl", imageDataUrl);
    await fetch("/api/pattern-request", { method: "POST", body: form });
    router.push("/contact");
  }

  return (
    <PageContainer>
      <Section title="Finalize" intro="Review your design and send it with your inquiry.">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">
          <form onSubmit={submit} className="space-y-3">
            <input required name="firstName" placeholder="First name" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <input required name="lastName" placeholder="Last name" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <input required type="email" name="email" placeholder="Email" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <input name="organization" placeholder="Organization" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black w-full" />
            <textarea name="notes" placeholder="Notes" rows={5} className="px-3 py-2 rounded-md border border-slate-300 bg-white text-black w-full" />
            <button className="mt-2 inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--accent-gold)] text-black">Send request</button>
          </form>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[color:var(--brand-taupe)]/30 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
            <div className="text-sm text-[var(--text-muted)] mb-2">{pattern.name} · Colors: {colors.slice(0,3).join(", ")}</div>
            <canvas ref={canvasRef} className="w-full h-[360px] bg-white rounded" />
            {imageDataUrl ? <img src={imageDataUrl} alt="preview" className="hidden" /> : null}
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}


