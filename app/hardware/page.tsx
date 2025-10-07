import PageContainer from "../components/PageContainer";
import Section from "../components/Section";

export default function HardwarePage() {
  return (
    <PageContainer>
      <Section title="Hardware" intro="Tracks and mounts with color/finish options to meet design and performance needs." />

      <Section title="Mount Types">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Ceiling Mount", "Wall Mount", "Decorative Hardware", "H‑Tracks (Blk/Brnz/Gold)"].map((t) => (
            <div key={t} className="rounded-md border border-slate-200/60 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)]">{t}</div>
          ))}
        </div>
      </Section>

      <Section title="Operation">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Motorized", "Cord Operated", "Wand", "Manual"].map((t) => (
            <div key={t} className="rounded-md border border-slate-200/60 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)]">{t}</div>
          ))}
        </div>
        <p className="text-[var(--text-muted)] mt-4">Other offerings and finishes available upon request.</p>
      </Section>
    </PageContainer>
  );
}


