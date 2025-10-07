import Image from "next/image";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";

export default function ProductsPage() {
  return (
    <PageContainer>
      <Section title="Draperies" intro="Images of drapery styles (Pinch, Ripplefold, fullnesses) with descriptions and reference fullness sizes.">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            {[
              { t: "Pinch Pleat", d: "Classic tailored pleats offering structured elegance." },
              { t: "Ripplefold", d: "Contemporary soft waves with consistent folds." },
              { t: "Grommet / Inverted", d: "Modern headings for casual or refined looks." },
            ].map((i) => (
              <div key={i.t} className="bg-[var(--card-bg)] border border-[color:var(--brand-taupe)]/30 rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                <div className="font-medium text-[var(--text-primary)]">{i.t}</div>
                <p className="text-sm text-[var(--text-muted)]">{i.d}</p>
              </div>
            ))}
            <div className="rounded-xl border border-[color:var(--brand-taupe)]/30 p-5 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
              <div className="font-medium text-[var(--text-primary)]">Fullness Sizes (reference)</div>
              <p className="text-sm text-[var(--text-muted)] mt-2">Standard options: 1.5x · 2x · 2.5x · 3x. Project‑specific recommendations available.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["https://images.unsplash.com/photo-1628428988931-14bc33099075?w=800&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1628428988931-14bc33099075?w=800&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1628428988931-14bc33099075?w=800&auto=format&fit=crop&q=60","https://images.unsplash.com/photo-1628428988931-14bc33099075?w=800&auto=format&fit=crop&q=60"].map((src,i)=>(
              <div key={i} className="relative aspect-[4/3] rounded-md overflow-hidden">
                <Image src={src} alt="Drapery style" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Roller Shades" intro="Images of inside & outside mount shades; types of cassettes, bottom rails, etc.">
        <div className="grid lg:grid-cols-3 gap-4">
          {["Inside Mount","Outside Mount","Dual Shades","Cassette Options","Bottom Rails","Side Channels"].map((t)=> (
            <div key={t} className="rounded-xl border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">{t}</div>
          ))}
        </div>
        <p className="text-[var(--text-muted)] mt-4">(Rob content from Bandalux) — we can integrate vendor assets and specs here.</p>
      </Section>

      <Section title="Roman Shades" intro="Images of different roman styles and construction options.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Flat","Hobbled","Relaxed","Batten Front/Back"].map((t)=>(
            <div key={t} className="rounded-xl border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">{t}</div>
          ))}
        </div>
      </Section>

      <Section title="Valances" intro="Images of upholstered/wood styles and trim details.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Upholstered","Wood","Patterned","Banding/Trim"].map((t)=>(
            <div key={t} className="rounded-xl border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">{t}</div>
          ))}
        </div>
      </Section>

      <Section title="Upholstery" intro="Images of headboards, benches, cushions, and re‑upholstery." />

      <Section title="Specialty Window Treatments" intro="Cards only: faux/wood blinds, louvers, vertical blinds.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Faux/Wood Blinds","Louvers","Vertical Blinds"].map((t)=>(
            <div key={t} className="rounded-xl border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] p-4 text-center text-[var(--text-primary)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">{t}</div>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}


