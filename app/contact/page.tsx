"use client";

import PageContainer from "../components/PageContainer";
import { useState } from "react";
import Section from "../components/Section";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <PageContainer>
      <section className="px-6 sm:px-10 lg:px-14 py-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Contact Us</h1>
          <p className="mt-3 text-[var(--text-muted)] max-w-2xl">
            Ready to see your design come to life? Share your details and we’ll guide you through receiving a personalized sample of your custom pattern.
          </p>

          {!submitted ? (
            <form
              className="mt-8 grid grid-cols-1 gap-4 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input required placeholder="First name" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input required placeholder="Last name" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input placeholder="Organization" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input required type="email" placeholder="Email address" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input placeholder="Phone number" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <textarea placeholder="Questions or Comments" rows={5} className="px-3 py-2 rounded-md border border-slate-300 bg-white text-black" />
              <button className="mt-2 inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--brand-olive)] text-white hover:bg-[#4e6032]">Submit</button>
            </form>
          ) : (
            <div className="mt-8 p-6 rounded-md bg-[var(--brand-stone)] max-w-xl">
              Thank you! We’ll be in touch shortly.
            </div>
          )}
        </div>

        <div className="bg-[var(--brand-stone)] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-black">Contact</h2>
          <div className="mt-4 space-y-2 text-black">
            <p>701 W 20TH ST</p>
            <p>HIALEAH, FLORIDA 33010, US</p>
            <p>O: 305.887.9611 X 1204</p>
            <p>F: 305.883.1350</p>
            <p>Toll-Free: 1.888.282.3188</p>
            <p>Email: info@wwdrape.com</p>
          </div>
          <div className="mt-6 text-sm text-black">
            Copyright 2025 Worldwide Draperies
          </div>
          <img src="https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1600&auto=format&fit=crop&q=60" alt="Worldwide Draperies" className="mt-6" />
        </div>
      </section>

      <Section title="Showroom & Hours" intro="Visit or schedule an appointment for product demos and sampling.">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-md border border-slate-200/60 bg-[var(--card-bg)] p-4">
            <div className="font-medium text-[var(--text-primary)]">Showroom</div>
            <div className="text-[var(--text-muted)] mt-1">705 West 20th Street, Hialeah, FL 33010</div>
          </div>
          <div className="rounded-md border border-slate-200/60 bg-[var(--card-bg)] p-4">
            <div className="font-medium text-[var(--text-primary)]">Hours</div>
            <div className="text-[var(--text-muted)] mt-1">Mon–Fri 8:00am–5:00pm ET</div>
          </div>
        </div>
      </Section>

      <Section title="FAQs">
        <div className="space-y-4">
          {[
            { q: "Do you work outside Florida?", a: "Yes. We manufacture in Florida and install worldwide, including cruise ships." },
            { q: "Can you meet brand standards?", a: "We regularly build to hospitality and cruise line specifications and submit samples for approval." },
            { q: "Lead times?", a: "Typical lead times are 4–8 weeks depending on scope and material availability." },
          ].map((f) => (
            <div key={f.q} className="bg-[var(--card-bg)] border border-slate-200/60 rounded-md p-4">
              <div className="font-medium text-[var(--text-primary)]">{f.q}</div>
              <div className="text-[var(--text-muted)] mt-1">{f.a}</div>
            </div>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}


