"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import PageContainer from "./components/PageContainer";
import Section from "./components/Section";
import HeroVideo from "./components/HeroVideo";

export default function Home() {
  return (
    <PageContainer>
      <HeroVideo fallbackImage="https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1600&auto=format&fit=crop&q=60" src="/hero.mp4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white text-5xl sm:text-6xl font-semibold tracking-tight max-w-3xl"
            >
              Timeless Drapery, Crafted for Hospitality
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-white/90 mt-4 max-w-2xl text-lg"
            >
              Bespoke drapery and bedding solutions trusted by the world’s finest hotels and cruise lines since 1968.
            </motion.p>
            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block mt-8 bg-[var(--accent-gold)] text-black px-6 py-3 rounded-full shadow-sm hover:brightness-95 transition-colors"
            >
              Get a consultation
            </motion.a>
          </div>
      </HeroVideo>

      <section className="px-6 sm:px-10 lg:px-14 py-14 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Introduction</h2>
          <p className="text-base text-[var(--text-muted)] mt-4 max-w-xl">
            With decades of expertise, we blend sophistication with functionality. Every stitch reflects craftsmanship, durability, and understated luxury.
          </p>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden shadow-sm">
          <Image
            src="/assets/Project Portfolio/Perry Hotel Naples FL.png"
            alt="Hotel room with tailored curtains"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <Section
        title="Products & Services"
        intro="Comprehensive soft-goods manufacturing for hospitality and cruise lines. Our team supports projects from quoting through installation."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "Custom Draperies", d: "Pinch pleat, ripplefold, blackout, sheer, and more." },
            { t: "Window Treatments", d: "Manual and motorized roller shades and Roman shades." },
            { t: "Bedding", d: "Quilted and non‑quilted bedspreads, decorative accents." },
            { t: "Cornices", d: "Upholstered and wood cornices custom‑made in house." },
            { t: "Re‑Upholstery", d: "Refresh seating, headboards, and cushions." },
            { t: "Drapery Installation", d: "Professional measurement and installation worldwide." },
            { t: "Marine Specialists", d: "Experienced technicians for cruise ship projects." },
            { t: "Roller Shades", d: "Sourcing and installing industry‑leading systems." },
          ].map((item) => (
            <div key={item.t} className="bg-[var(--card-bg)] rounded-lg p-5 border border-slate-200/60">
              <div className="text-lg font-medium text-[var(--text-primary)]">{item.t}</div>
              <p className="text-sm text-[var(--text-muted)] mt-2">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Industries"
        intro="From luxury resorts to cruise fleets, we manufacture at scale while honoring bespoke design."
        className="bg-[var(--brand-stone)] text-black"
      >
        <div className="grid md:grid-cols-3 gap-6 text-white">
          {[
            { t: "Hotels & Resorts", img: "/assets/Project Portfolio/The Bellevue Hotel Philadelphia PA - Public Area.png" },
            { t: "Cruise Ships", img: "/assets/Project Portfolio/Carnival Cruise Lines Horizon - Suite.png" },
            { t: "Healthcare", img: "/assets/Project Portfolio/JW Marriott New Orleans LA - Meeting Room.png" },
          ].map((c) => (
            <div key={c.t} className="bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image src={c.img} alt={c.t} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="text-lg text-black font-medium">{c.t}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Our Process" intro="A reliable, end‑to‑end partnership that safeguards timelines and budgets.">
        <ol className="grid md:grid-cols-4 gap-6 list-none">
          {[
            { n: "01", t: "Quote & Sampling", d: "We review specs, provide pricing, and develop samples." },
            { n: "02", t: "Measure & Plan", d: "Site measurements and installation planning by professionals." },
            { n: "03", t: "Manufacture", d: "State‑of‑the‑art workroom produces to spec and schedule." },
            { n: "04", t: "Install & Support", d: "Coordinated delivery and installation with post‑project support." },
          ].map((s) => (
            <li key={s.n} className="bg-[var(--card-bg)] rounded-lg p-5 border border-slate-200/60">
              <div className="text-sm text-[var(--text-muted)]">{s.n}</div>
              <div className="text-lg font-medium text-[var(--text-primary)] mt-1">{s.t}</div>
              <p className="text-sm text-[var(--text-muted)] mt-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="" className="py-16">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Ready to collaborate?</h3>
            <p className="text-[var(--text-muted)]">Share your project and we’ll prepare a tailored quote and sample plan.</p>
          </div>
          <a href="/contact" className="px-6 py-3 rounded-full bg-[var(--brand-olive)] text-white hover:bg-[#4e6032]">Start a conversation</a>
        </div>
      </Section>

      <section className="px-6 sm:px-10 lg:px-14 py-16 bg-[var(--brand-stone)]">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Hospitals", img: "/assets/Project Portfolio/JW Marriott New Orleans LA - Board Room.png" },
            { t: "Cruise Ships", img: "/assets/Project Portfolio/Carnival Cruise Line Horizon - Interior Cabin.jpg" },
            { t: "Custom Drapes", img: "/assets/Project Portfolio/Andaz Miami Beach FL - GR.png" },
          ].map((card) => (
            <div key={card.t} className="bg-[var(--card-bg)] rounded-lg p-5 shadow-sm">
              <div className="relative h-40 rounded-md overflow-hidden">
                <Image src={card.img} alt={card.t} fill className="object-cover" />
              </div>
              <h3 className="mt-4 text-xl font-medium">{card.t}</h3>
              <p className="text-[var(--text-muted)] mt-2 text-sm">
                Elegantly engineered textiles for demanding environments.
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
