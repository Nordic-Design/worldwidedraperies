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

      <Section title="Our Family" intro="A third‑generation workroom built on craft and service.">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="relative h-[280px] rounded-lg overflow-hidden">
            <Image src="/assets/Project Portfolio/The Bellevue Hotel Philadelphia PA - Public Area.png" alt="Team" fill className="object-cover" />
          </div>
          <div className="text-[var(--text-muted)]">
            We’re family‑owned and operated, with a close‑knit team who take pride in the details that make hospitality spaces feel elevated and comfortable.
          </div>
        </div>
      </Section>

      {/* Removed "What We Do" per notes */}

      <Section title="Our Values" className="bg-[var(--brand-stone)] text-black rounded-xl" intro="Three generations strong: craftsmanship, reliability, and partnership.">
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
    </PageContainer>
  );
}


