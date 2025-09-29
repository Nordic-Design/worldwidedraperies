import PageContainer from "../components/PageContainer";
import Section from "../components/Section";

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
        <p className="mt-3 text-[var(--text-muted)] max-w-2xl">
          Explore a curated selection of textures and colors. A full customization tool is coming soon.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {swatches.map((src, idx) => (
            <div key={idx} className="aspect-video rounded-md overflow-hidden bg-[var(--brand-stone)]" style={{backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 p-6 bg-[var(--card-bg)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Pattern Customization</h2>
              <p className="text-[var(--text-muted)]">Personalize colors, textures, and trim. Launching soon.</p>
            </div>
            <button className="px-5 py-2 rounded-full border border-slate-300 text-white hover:bg-slate-50">Coming soon…</button>
          </div>
        </div>
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


