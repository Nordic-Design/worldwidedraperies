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
        <div className="relative h-[420px] lg:h-[500px] w-full max-w-full rounded-lg overflow-hidden shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1706971261067-39de4f602498?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2V3aW5nJTIwZHJhcGVzfGVufDB8fDB8fHww"
            alt="Sewing custom drapery"
            fill
            className="object-cover object-[60%_80%]"
          />
        </div>
      </section>

      <Section title="Our Family" intro="A third‑generation workroom built on craft and service.">
        <div className="grid gap-10">
          {/* Section 1 */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative h-[260px] rounded-lg overflow-hidden bg-[var(--brand-stone)]">
              <Image src="/assets/Project Portfolio/Perry Hotel Naples FL Public Areas.png" alt="Family beginnings" fill className="object-cover" />
            </div>
            <p className="text-[var(--text-muted)]">
              Founded in 1968 by Jose and Nidia Leal, Worldwide Draperies has been family‑owned and operated for more than five decades. What began as a small residential workshop rooted in passion, craftsmanship, and attention to detail has evolved into a trusted leader in custom window treatments and soft goods for the hospitality industry.
            </p>
          </div>
          {/* Section 2 */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <p className="order-2 md:order-1 text-[var(--text-muted)]">
              Through the vision and leadership of the second generation, the company grew beyond its residential beginnings — expanding its capabilities, embracing innovation, and earning a reputation for excellence on a national scale. Today, with the third generation continuing the tradition, our story remains one of growth, integrity, and innovation.
            </p>
            <div className="order-1 md:order-2 relative h-[260px] rounded-lg overflow-hidden bg-[var(--brand-stone)]">
              <Image src="/assets/Project Portfolio/JW Marriott New Orleans LA - Board Room.png" alt="Second generation growth" fill className="object-cover" />
            </div>
          </div>
          {/* Section 3 */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative h-[260px] rounded-lg overflow-hidden bg-[var(--brand-stone)]">
              <Image src="/assets/Project Portfolio/Ritz Carlton Turks and Caicos - Suite.jpg" alt="Craftsmanship today" fill className="object-cover" />
            </div>
            <p className="text-[var(--text-muted)]">
              We proudly carry forward our family’s legacy by blending timeless craftsmanship with modern design and technology. Every piece we create reflects our commitment to quality and care — bringing our clients’ visions to life with precision, creativity, quality and care.
            </p>
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


