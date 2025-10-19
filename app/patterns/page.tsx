import Link from "next/link";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";
import { V1_PATTERNS, RenderCustomSVG } from "./v1";
import { Suspense } from "react";
import { promises as fs } from "fs";
import path from "path";

const swatches = [
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFicmljJTIwcGF0dGVybnN8ZW58MHx8MHx8fDA%3D",
 
];

export default function PatternsPage() {
  return (
    <PageContainer>
      <section className="px-6 sm:px-10 lg:px-14 py-12">
        <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Patterns</h1>
        <p className="mt-3 text-[var(--text-muted)] max-w-2xl">Choose a pattern to start customizing colors.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {V1_PATTERNS.map((p) => (
            <Link key={p.slug} href={`/patterns/${p.slug}`} className="block group rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
              <div className="aspect-video">{<p.Component bg="#F9F9F6" fg="#C5B8A5" acc="#D4AF37" />}</div>
              <div className="p-4 flex items-center justify-between">
                <div className="font-medium text-[var(--text-primary)]">{p.name}</div>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent-gold)] text-black">Customize</span>
              </div>
            </Link>
          ))}
        </div>

        <Suspense>
          <CmsPatterns />
        </Suspense>
      </section>

      <Section title="Categories" intro="A versatile library of textures to suit hospitality and marine spaces.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Sheers", "Blackout", "Dimout", "Patterned", "Solid", "Texture", "Performance", "Eco"].map((c) => (
            <div key={c} className="rounded-md border border-slate-200/60 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)]">{c}</div>
          ))}
        </div>
      </Section>

      <Section title="Request Samples" intro="Tell us your palette and performance needs—we’ll assemble a curated kit.">
        <ol className="grid md:grid-cols-3 gap-5 list-none">
          {[
            { n: "01", t: "Share Specs", d: "Colors, hand, FR/IMO, width, budget, timeline." },
            { n: "02", t: "Receive Options", d: "We pull from our library or source to brief." },
            { n: "03", t: "Refine & Ship", d: "We refine selections and ship labeled samples." },
          ].map((s) => (
            <li key={s.n} className="bg-[var(--card-bg)] border border-slate-200/60 rounded-md p-5">
              <div className="text-sm text-[var(--text-muted)]">{s.n}</div>
              <div className="text-lg font-medium text-[var(--text-primary)] mt-1">{s.t}</div>
              <p className="text-sm text-[var(--text-muted)] mt-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Finishes & Details" intro="Tailored headings and details that define the look.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Ripplefold", "Pinch Pleat", "Grommet", "Inverted Pleat", "Banding", "Piping", "Weighted Hems", "Lining"].map((t) => (
            <div key={t} className="rounded-md border border-slate-200/60 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)]">{t}</div>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}


async function fetchCms() {
  // Read from the JSON store directly on the server to avoid absolute URL issues
  try {
    const p = path.join(process.cwd(), "public", "cms-patterns.json");
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw || "{\"patterns\":[]}");
  } catch {
    return { patterns: [] } as any;
  }
}

async function CmsPatterns() {
  const data = await fetchCms();
  const list: { slug: string; name: string; svgMarkup: string }[] = data?.patterns || [];
  if (!list.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Community / CMS Patterns</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link key={p.slug} href={`/patterns/${p.slug}`} className="block group rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
            <div className="aspect-video">
              <RenderCustomSVG markup={p.svgMarkup} bg="#F9F9F6" fg="#C5B8A5" acc="#D4AF37" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="font-medium text-[var(--text-primary)]">{p.name}</div>
              <span className="text-xs px-2 py-1 rounded-full bg-[var(--accent-gold)] text-black">Customize</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

