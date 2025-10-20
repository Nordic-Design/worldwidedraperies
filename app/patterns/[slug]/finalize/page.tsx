"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PageContainer from "../../../components/PageContainer";
import Section from "../../../components/Section";
import { V1_PATTERNS, RenderCustomSVG } from "../../v1";

export default function FinalizePattern() {
  const router = useRouter();
  const params = useParams() as { slug?: string };
  const sp = useSearchParams();
  const fills = useMemo(() => JSON.parse(sp.get("fills") || "{}"), [sp]);
  const colors = useMemo(() => JSON.parse(sp.get("colors") || "[]"), [sp]);
  const slug = params?.slug ?? V1_PATTERNS[0].slug;
  const pattern = useMemo(() => V1_PATTERNS.find(p=>p.slug===slug) ?? V1_PATTERNS[0], [slug]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cmsMarkup, setCmsMarkup] = useState<string>("");
  const [imageDataUrl, setImageDataUrl] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 400; canvas.height = 240;
    const [bg, fg, acc] = colors as string[];
    ctx.fillStyle = bg || "#ffffff"; ctx.fillRect(0,0,400,240);
    ctx.fillStyle = fg || "#cccccc"; ctx.fillRect(0,0,400,120);
    ctx.fillStyle = acc || "#999999"; ctx.fillRect(0,200,400,40);
    setImageDataUrl(canvas.toDataURL("image/png"));
  }, [colors]);

  // If this slug is a CMS pattern, fetch its markup so we can render the same design preview
  useEffect(() => {
    if (V1_PATTERNS.find(p => p.slug === slug)) return; // built-in v1 pattern
    (async () => {
      try {
        const res = await fetch("/api/cms/patterns", { cache: "no-store" });
        const data = await res.json();
        const rec = (data?.patterns || []).find((p: any) => p.slug === slug);
        if (rec?.svgMarkup) setCmsMarkup(rec.svgMarkup);
      } catch {}
    })();
  }, [slug]);

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
            <button className="mt-2 inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--accent-gold)] text-white">Send request</button>
          </form>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[color:var(--brand-taupe)]/30 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
            <div className="text-sm text-[var(--text-muted)] mb-2">{pattern.name} · Colors: {colors.slice(0,3).join(", ")}</div>
            <div className="w-full h-[620px] rounded overflow-hidden">
              {V1_PATTERNS.find(p => p.slug === slug) ? (
                // Render built-in v1 pattern with selected colors
                <pattern.Component bg={(colors[0] as string) || "#F9F9F6"} fg={(colors[1] as string) || "#C5B8A5"} acc={(colors[2] as string) || "#D4AF37"} />
              ) : cmsMarkup ? (
                <RenderCustomSVG markup={cmsMarkup} bg={(colors[0] as string) || "#F9F9F6"} fg={(colors[1] as string) || "#C5B8A5"} acc={(colors[2] as string) || "#D4AF37"} />
              ) : null}
            </div>
            {/* Hidden canvas used to generate an image for email attachment */}
            <canvas ref={canvasRef} className="hidden" />
            {imageDataUrl ? <img src={imageDataUrl} alt="preview" className="hidden" /> : null}
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}


