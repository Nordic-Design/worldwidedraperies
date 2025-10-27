"use client";

import PageContainer from "../components/PageContainer";
import { useState } from "react";
import Section from "../components/Section";
import PdfAsImages from "../components/PdfAsImages";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      setError("Failed to send message. Please try again or email us directly at info@wwdrape.com");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <section className="px-6 sm:px-10 lg:px-14 py-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Contact Us</h1>
          <p className="mt-3 text-[var(--text-muted)] max-w-2xl">
            Ready to see your design come to life? Share your details and we'll guide you through receiving a personalized sample of your custom pattern.
          </p>

          {!submitted ? (
            <form
              className="mt-8 grid grid-cols-1 gap-4 max-w-xl"
              onSubmit={handleSubmit}
            >
              <input required name="firstName" placeholder="First name" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input required name="lastName" placeholder="Last name" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input name="organization" placeholder="Organization" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input required name="email" type="email" placeholder="Email address" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <input name="phone" placeholder="Phone number" className="h-11 px-3 rounded-md border border-slate-300 bg-white text-black" />
              <textarea name="message" placeholder="Questions or Comments" rows={5} className="px-3 py-2 rounded-md border border-slate-300 bg-white text-black" />
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button 
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex justify-center items-center h-11 px-5 rounded-full bg-[var(--brand-olive)] text-white hover:bg-[#4e6032] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          ) : (
            <div className="mt-8 p-6 rounded-md bg-[var(--brand-stone)] max-w-xl text-white">
              Thank you! We'll be in touch shortly.
            </div>
          )}
        </div>

        <div className="text-white bg-[var(--brand-stone)] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <div className="mt-4 space-y-2 text-white">
            <p>705 W 20TH ST</p>
            <p>HIALEAH, FLORIDA 33010, US</p>
            <p>O: 305.887.9611</p>
            <p>F: 305.883.1350</p>
            <p>Email: info@wwdrape.com</p>
          </div>
          <div className="mt-6 text-sm text-white">
            Copyright 2025 Worldwide Draperies
          </div>
          <img src="https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1600&auto=format&fit=crop&q=60" alt="Worldwide Draperies" className="mt-6" />
        </div>
      </section>

      {/* Removed Showroom & Hours per notes */}

      <Section title="Rep Territories" intro="View or download our representative territories map.">
        <div className="rounded-lg border border-slate-200/60 bg-[var(--card-bg)] p-4">
          <PdfAsImages src="/assets/Territory%20Map.pdf" />
          <div className="mt-3 flex items-center gap-3">
            <a href="/assets/Territory%20Map.pdf" target="_blank" rel="noopener" className="px-4 h-10 rounded-full bg-[var(--accent-gold)] text-white inline-flex items-center">Open PDF</a>
            <a href="/assets/Territory%20Map.pdf" download className="px-4 h-10 rounded-full border border-slate-300 text-[var(--text-primary)] inline-flex items-center">Download</a>
          </div>
        </div>
      </Section>

      {/* Removed FAQs per notes */}
    </PageContainer>
  );
}


