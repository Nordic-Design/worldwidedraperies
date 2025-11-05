"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import PageContainer from "./components/PageContainer";
import Section from "./components/Section";
import Modal from "./components/Modal";
import HeroVideo from "./components/HeroVideo";

export default function Home() {
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [zoomAlt, setZoomAlt] = useState<string>("");

  function openZoom(src: string, alt: string) {
    setZoomImg(src);
    setZoomAlt(alt);
    setZoomOpen(true);
  }

  return (
    <PageContainer>
      <HeroVideo fallbackImage="https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1600&auto=format&fit=crop&q=60" src="/hero.mp4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="hero-heading text-white text-5xl sm:text-6xl font-semibold tracking-tight max-w-3xl"
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
              className="inline-block mt-8 bg-[var(--accent-gold)] hover:bg-[#A7A889] text-white px-6 py-3 rounded-full shadow-sm hover:brightness-95 transition-colors"
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
        title="What We Do"
        className="bg-[var(--brand-stone)] text-black rounded-xl"
        intro="Comprehensive soft-goods manufacturing for hospitality and cruise lines. Our team supports projects from quoting through installation."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "Custom Draperies", d: "Pinch pleat, ripplefold, blackout, sheer, and more.", img: "https://images.unsplash.com/photo-1754611362309-71297e9f42fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=983" },
            { t: "Window Treatments", d: "Manual and motorized roller shades and Roman shades.", img: "https://images.unsplash.com/photo-1754613307941-029aa358987e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1013" },
            { t: "Bedding", d: "Quilted and non‑quilted bedspreads, decorative accents.", img: "https://images.unsplash.com/photo-1606855637183-ea2a00b6f15f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=800" },
            { t: "Cornices", d: "Upholstered and wood cornices custom‑made in house.", img: "https://images.unsplash.com/photo-1614622600918-f04b86c9648f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374" },
            { t: "Re‑Upholstery", d: "Refresh seating, headboards, and cushions.", img: "https://images.unsplash.com/photo-1607646175036-fdba5063cfed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632" },
            { t: "Drapery Installation", d: "Professional measurement and installation worldwide.", img: "https://images.unsplash.com/photo-1688901629411-a9228f144396?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=718" },
            { t: "Marine Specialists", d: "Experienced technicians for cruise ship projects.", img: "https://images.unsplash.com/photo-1597317146415-c017eaa7e259?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
            { t: "Roller Shades", d: "Sourcing and installing industry‑leading systems.", img: "/assets/Project Portfolio/Perry Hotel Naples FL.png" },
          ].map((item) => (
            <div key={item.t} className="bg-[var(--card-bg)] rounded-lg p-5 border border-slate-200/60">
              <div className="text-lg font-medium text-[var(--text-primary)]">{item.t}</div>
              <p className="text-sm text-[var(--text-muted)] mt-2">{item.d}</p>
              <button type="button" className="relative h-40 w-full cursor-zoom-in" onClick={() => openZoom(item.img, item.t)}>
                <Image src={item.img} alt={item.t} fill className="object-cover" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a href="/contact" className="inline-flex items-center px-6 py-3 rounded-full bg-[var(--accent-gold)] text-white hover:brightness-95 hover:bg-[#A7A889]">Start your project</a>
        </div>
      </Section>

      <Section
        title="Industries"
        intro="From luxury resorts to cruise fleets, we manufacture at scale while honoring bespoke design."
      >
        <div className="grid md:grid-cols-3 gap-6 text-white">
          {[
            { t: "Hotels & Resorts", img: "/assets/Project Portfolio/The Bellevue Hotel Philadelphia PA - Public Area.png" },
            { t: "Cruise Ships", img: "/assets/Project Portfolio/Carnival Cruise Lines Horizon - Suite.png" },
            { t: "Multi‑family", img: "/assets/Project Portfolio/Andaz Miami Beach FL - Suite.png" },
          ].map((c) => (
            <div key={c.t} className="bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-sm">
              <button type="button" className="relative h-40 w-full cursor-zoom-in" onClick={() => openZoom(c.img, c.t)}>
                <Image src={c.img} alt={c.t} fill className="object-cover" />
              </button>
              <div className="p-4">
                <div className="text-lg text-black font-medium">{c.t}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Our Process" className="bg-[var(--brand-stone)] text-black rounded-xl" intro="A reliable, end‑to‑end partnership that safeguards timelines and budgets.">
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
      <Modal open={zoomOpen} onClose={() => setZoomOpen(false)} fullScreen>
        <div className="relative h-dvh w-screen bg-black">
          <button onClick={() => setZoomOpen(false)} className="absolute top-4 right-4 z-10 px-4 h-10 rounded-full bg-white/90">Close</button>
          <div className="h-full w-full flex items-center justify-center p-4">
            {zoomImg ? (
              <img src={zoomImg} alt={zoomAlt} className="h-full w-full object-contain" />
            ) : null}
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
