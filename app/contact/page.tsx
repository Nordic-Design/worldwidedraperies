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
            <p>Email: info@wwdrape.com</p>
          </div>
          <div className="mt-6 text-sm text-black">
            Copyright 2025 Worldwide Draperies
          </div>
          <img src="https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1600&auto=format&fit=crop&q=60" alt="Worldwide Draperies" className="mt-6" />
        </div>
      </section>

      {/* Removed Showroom & Hours per notes */}

      <Section title="Rep Territories" intro="Download and reference our representative territories map.">
        <div className="rounded-lg border border-slate-200/60 bg-[var(--card-bg)] p-4">
          {/* Replace the src below with your final map image once provided */}
          <img src="/rep-map.png" alt="Rep territories" className="w-full rounded-md" />
        </div>
      </Section>

      {/* Removed FAQs per notes */}
    </PageContainer>
  );
}


