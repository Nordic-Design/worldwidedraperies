"use client";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";
import Modal from "../../components/Modal";
import { projects } from "../data";

type Props = { params: Promise<{ slug: string }> };

export default function ProjectDetail({ params }: Props) {
  const { slug } = use(params);
  const data = projects.find((p) => p.slug === slug) ?? projects[0];
  const router = useRouter();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function openAt(index: number) {
    setCurrentIndex(index);
    setGalleryOpen(true);
  }

  function prev() {
    setCurrentIndex((i) => (i - 1 + data.images.length) % data.images.length);
  }

  function next() {
    setCurrentIndex((i) => (i + 1) % data.images.length);
  }

  useEffect(() => {
    if (!galleryOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen, data.images.length]);

  function goBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/portfolio");
    }
  }

  return (
    <PageContainer>
      <div className="px-6 sm:px-10 lg:px-14 pt-6 flex justify-start">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300/70 bg-white/90 text-[var(--text-primary)] shadow-sm hover:bg-white hover:shadow-md transition-colors"
          aria-label="Back to previous page"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
      </div>
      <section className="px-6 sm:px-10 lg:px-14 py-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div className="relative h-[360px] rounded-md overflow-hidden">
          <Image src={data.hero} alt={data.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">{data.name}</h1>
          <p className="text-[var(--text-muted)] mt-2">{data.location}</p>
          <p className="text-[var(--text-muted)] mt-4">Scope: custom draperies, roller shades, and bedding. Installation completed on schedule.</p>
        </div>
      </section>

      <Section title="Gallery">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openAt(i)}
              className="relative aspect-[4/3] rounded-md overflow-hidden group cursor-zoom-in"
            
            >
              <Image src={src} alt="Project photo" fill className="object-cover transition-transform duration-200 group-hover:scale-[1.02]" />
            </button>
          ))}
        </div>
      </Section>

      <Modal open={galleryOpen} onClose={() => setGalleryOpen(false)} fullScreen>
        <div className="relative h-dvh w-screen bg-black">
          <button onClick={() => setGalleryOpen(false)} className="absolute top-4 right-4 z-10 px-4 h-10 rounded-full bg-white/90">Close</button>
          {/* Prev */}
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 grid place-items-center hover:bg-white"
          >
            <span className="text-black">‹</span>
          </button>
          {/* Next */}
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 grid place-items-center hover:bg-white"
          >
            <span className="text-black">›</span>
          </button>
          <div className="h-full w-full flex items-center justify-center p-4">
            <img src={data.images[currentIndex]} alt={`Image ${currentIndex+1} of ${data.name}`} className="max-h-full max-w-full object-contain" />
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}


