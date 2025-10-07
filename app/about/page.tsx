import Image from "next/image";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";

export default function AboutPage() {
  return (
    <PageContainer>
      <section className="px-6 sm:px-10 lg:px-14 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">About Us</h1>
          <p className="mt-4 text-[var(--text-muted)] max-w-xl">
            Since 1968, Worldwide Draperies has manufactured elegant, durable drapery and bedding for hospitality and maritime spaces. Our team partners with designers and brands to deliver tailored solutions—from concept to installation.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { label: "Years", value: "55+" },
              { label: "Projects", value: "10k+" },
              { label: "Countries", value: "25+" },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--brand-stone)] rounded-md p-4 text-center">
                <div className="text-2xl font-semibold text-[var(--brand-ink)]">{s.value}</div>
                <div className="text-sm text-slate-700">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[360px] rounded-lg overflow-hidden shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1706971261067-39de4f602498?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2V3aW5nJTIwZHJhcGVzfGVufDB8fDB8fHww"
            alt="Sewing custom drapery"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <Section
        title="What We Do"
        intro="From custom draperies to motorized shades and bedding, we build soft‑goods that meet the demands of hospitality and marine environments."
      >
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-[var(--text-primary)]">
          {[
            "Custom Draperies",
            "Window Treatments (manual & motorized)",
            "Bedding (quilted / non‑quilted)",
            "Upholstered & Wood Cornices",
            "Re‑Upholstery",
            "Professional Installation",
          ].map((i) => (
            <li key={i} className="bg-[var(--card-bg)] border border-slate-200/60 rounded-md p-4">{i}</li>
          ))}
        </ul>
      </Section>

      <Section title="Our Values" intro="Three generations strong: craftsmanship, reliability, and partnership.">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Craftsmanship", d: "Experienced seamstresses and technicians produce enduring results." },
            { t: "Reliability", d: "Budgets honored, schedules met, details documented." },
            { t: "Partnership", d: "We collaborate with designers and brands as an extension of the team." },
          ].map((v) => (
            <div key={v.t} className="bg-[var(--card-bg)] border border-slate-200/60 rounded-md p-5">
              <div className="text-lg font-medium text-[var(--text-primary)]">{v.t}</div>
              <p className="text-sm text-[var(--text-muted)] mt-2">{v.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Materials & Compliance" intro="Performance fabrics and constructions to meet hospitality specifications.">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[var(--text-primary)]">
          {["Blackout & Dimout", "Sheers", "FR Rated", "IMO / Marine", "Antimicrobial", "Acoustic", "Sustainable", "Custom Prints"].map((t) => (
            <li key={t} className="bg-[var(--card-bg)] border border-slate-200/60 rounded-md p-4">{t}</li>
          ))}
        </ul>
      </Section>

      <Section
        title="Worldwide Installation"
        intro="Our field team provides on‑site measurements and installs anywhere your project takes you—on land or at sea."
        className="bg-[var(--brand-stone)] text-black rounded-xl"
      >
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="text-black">
            We coordinate schedules with property teams, adhere to security protocols, and deliver punch‑list support through project handoff.
          </div>
          <div className="relative h-[280px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1712172424864-1778f0cd34e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5zdGFsbGluZyUyMGN1cnRhaW5zfGVufDB8fDB8fHww"
              alt="Technician installing curtains"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}


