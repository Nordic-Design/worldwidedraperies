"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";
import Modal from "../components/Modal";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState<{ t: string; img?: string }[]>([]);
  const touchStartX = useRef<number | null>(null);

  const productImages = useMemo(() => ({
    "Inside Mount": ["/assets/Specialty Items/Roller Shades/Roller Shade .png"],
    "Outside Mount": ["/assets/Specialty Items/Roller Shades/Healthcare Roller Shades.png"],
    "Dual Shades": ["/assets/Specialty Items/Roller Shades/Dual Roller Shade.png"],
    "Blackout Shades": ["/assets/Specialty Items/Roller Shades/Blackout Roller Shades.png"],
    "Flat": ["/assets/Specialty Items/Roman Shades/Cabot Citrus Farms Resort FL - GR.png"],
    "Hobbled": ["/assets/Specialty Items/Roman Shades/Hobbled Roman Shade.png"],
    "Relaxed": ["/assets/Specialty Items/Roman Shades/Relaxed Style Roman Shade.png"],
    "Laminated Flat Wood Valance": ["/assets/Specialty Items/Valance/Laminated Flat Wood Valance.png"],
    "Laminated Flat Wood Valance (Alt)": ["/assets/Specialty Items/Valance/Laminated Flat Wood Valance 2.png"],
    "Faux / Wood Blinds": ["/assets/Specialty Items/Faux Wood Blinds/Faux Wood Blinds.jpg"],
    "Aluminum Venetian Blinds": ["/assets/Specialty Items/Aluminum Venetian Blinds.png"],
    "Vertical Blinds": ["/assets/Specialty Items/Vertical Blinds/Vertical Blinds.jpg"],
    "Louvers (Plantation Shutters)": ["/assets/Specialty Items/Louvers - Plantation Style Shutters/Louver Shutters.png"],
  } as Record<string, string[]>), []);

  function buildCarousel(startTitle?: string) {
    const items: { t: string; img?: string }[] = [];
    // Draperies (with previews)
    [
      { t: "Pinch Pleat", img: "https://m.media-amazon.com/images/I/81AzAgrBjXL.jpg" },
      { t: "Ripplefold", img: "https://m.media-amazon.com/images/I/71Kt31YU8-L._AC_UF894,1000_QL80_.jpg" },
      { t: "Grommet / Inverted", img: "https://m.media-amazon.com/images/I/91FfebWAuVL.jpg" },
      { t: "Fullness Sizes (reference)", img: "/assets/ripplefold-fullness-chart.jpg" },
    ].forEach(i => items.push(i));
    // Roller Shades (with previews)
    [
      { t: "Inside Mount", img: "/assets/Specialty Items/Roller Shades/Roller Shade .png" },
      { t: "Outside Mount", img: "/assets/Specialty Items/Roller Shades/Healthcare Roller Shades.png" },
      { t: "Dual Shades", img: "/assets/Specialty Items/Roller Shades/Dual Roller Shade.png" },
      { t: "Blackout Shades", img: "/assets/Specialty Items/Roller Shades/Blackout Roller Shades.png" },
      { t: "Cassette Options", img: "https://m.media-amazon.com/images/I/71fzy67qYxL.jpg" },
      { t: "Bottom Rails", img: "https://m.media-amazon.com/images/I/71E9XW1eNoL._UF894,1000_QL80_.jpg" },
      { t: "Side Channels", img: "https://m.media-amazon.com/images/I/51KL+EDKyhL.jpg" },
    ].forEach(i => items.push(i));
    // Roman (with previews)
    [
      { t: "Flat", img: "/assets/Specialty Items/Roman Shades/Cabot Citrus Farms Resort FL - GR.png" },
      { t: "Hobbled", img: "/assets/Specialty Items/Roman Shades/Hobbled Roman Shade.png" },
      { t: "Relaxed", img: "/assets/Specialty Items/Roman Shades/Relaxed Style Roman Shade.png" },
      { t: "Batten Front/Back", img: "https://blindsdesigns.com/wp-content/uploads/2021/06/2013_DES_UG_Organica_Living-Room.jpeg" },
    ].forEach(i => items.push(i));
    // Valance
    [
      { t: "Laminated Flat Wood Valance", img: "/assets/Specialty Items/Valance/Laminated Flat Wood Valance.png" },
      { t: "Laminated Flat Wood Valance (Alt)", img: "/assets/Specialty Items/Valance/Laminated Flat Wood Valance 2.png" },
    ].forEach(i => items.push(i));
    // Upholstery (with previews)
    [
      { t: "Headboards", img: "https://www.thespruce.com/thmb/jtmr08z3MeW00C-Dh5fSLlSE5WI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/380891527_150208994823747_3069919294392514539_n-6b57151ba18e4d0b8d70bb2a56021c3d.jpg" },
      { t: "Benches", img: "https://www.theshadestore.com/blog/wp-content/uploads/the-shade-store-ripple-fold-drapery-luxe-linen-beige-madison-track-black-window-seat-ideas-wood-bench-drawers-content-2022-becca-tobin-475x500px.jpg.webp" },
      { t: "Cushions & Pillows", img: "https://shopdecorator.com/cdn/shop/products/LANDEN_0002_n22_320x320.jpg?v=1646924541" },
      { t: "Re‑Upholstery", img: "https://www.glamour-decorating.com/wp-content/uploads/2023/06/Furniture-upholsterer-Re-upholstery--1440x900.jpg" },
    ].forEach(i => items.push(i));
    // Specialty (with previews)
    [
      { t: "Faux / Wood Blinds", img: "/assets/Specialty Items/Faux Wood Blinds/Faux Wood Blinds.jpg" },
      { t: "Aluminum Venetian Blinds", img: "/assets/Specialty Items/Aluminum Venetian Blinds.png" },
      { t: "Vertical Blinds", img: "/assets/Specialty Items/Vertical Blinds/Vertical Blinds.jpg" },
      { t: "Louvers (Plantation Shutters)", img: "/assets/Specialty Items/Louvers - Plantation Style Shutters/Louver Shutters.png" },
    ].forEach(i => items.push(i));
    // Hardware section (with previews matching cards)
    [
      { t: "Ceiling Mount", img: "https://m.media-amazon.com/images/I/61RTo2eLM-L.jpg" },
      { t: "Wall Mount", img: "https://m.media-amazon.com/images/I/61fgIvqeicL._AC_UF1000,1000_QL80_.jpg" },
      { t: "Decorative Hardware", img: "https://www.curtarra.com/cdn/shop/files/hardware-2.jpg?v=6399803644631637833" },
      { t: "H‑Tracks (Blk/Brnz/Gold)", img: "https://waclighting.com/storage/waclighting-images/top_prod_image/HT4-BK_IMRO_2.jpg" },
      { t: "Motorized", img: "https://m.media-amazon.com/images/I/71c3JIym3kL.jpg" },
      { t: "Cord Operated", img: "https://www.forestgroup.com/user_files/images/block_thumbnail/CKS_klein.png" },
      { t: "Baton", img: "https://m.media-amazon.com/images/I/81XKoiq2pcL._UF894,1000_QL80_.jpg" },
      { t: "Manual", img: "https://m.media-amazon.com/images/I/51PvXdALtDL.jpg" },
    ].forEach(i => items.push(i));

    setCarouselItems(items);
    if (startTitle) {
      const idx = items.findIndex(i => i.t === startTitle);
      setCurrentIndex(idx >= 0 ? idx : 0);
    } else {
      setCurrentIndex(0);
    }
  }

  function openModal(title: string) {
    buildCarousel(title);
    setOpen(true);
  }

  // Keyboard navigation when modal is open
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setCurrentIndex((i)=> (i+1)%carouselItems.length);
      if (e.key === "ArrowLeft") setCurrentIndex((i)=> (i-1+carouselItems.length)%carouselItems.length);
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, carouselItems.length]);

  return (
    <PageContainer>
      <Section title="Draperies" intro="Core drapery headings and constructions. Click through our portfolio for real-world installs.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Pinch Pleat", img: "https://m.media-amazon.com/images/I/81AzAgrBjXL.jpg" },
            { t: "Ripplefold", img: "https://m.media-amazon.com/images/I/71Kt31YU8-L._AC_UF894,1000_QL80_.jpg" },
            { t: "Grommet / Inverted", img: "https://m.media-amazon.com/images/I/91FfebWAuVL.jpg" },
            { t: "Fullness Sizes (reference)", img: "/assets/ripplefold-fullness-chart.jpg" },
          ].map((item, i) => (
            <div key={i} className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`} onClick={() => item.img ? openModal(item.t) : undefined}>
              <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Roller Shades" intro="Inside/Outside mounts, dual shades, blackout and more.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Inside Mount", img: "/assets/Specialty Items/Roller Shades/Roller Shade .png" },
            { t: "Outside Mount", img: "/assets/Specialty Items/Roller Shades/Healthcare Roller Shades.png" },
            { t: "Dual Shades", img: "/assets/Specialty Items/Roller Shades/Dual Roller Shade.png" },
            { t: "Blackout Shades", img: "/assets/Specialty Items/Roller Shades/Blackout Roller Shades.png" },
            { t: "Cassette Options", img: "https://m.media-amazon.com/images/I/71fzy67qYxL.jpg" },
            { t: "Bottom Rails", img: "https://m.media-amazon.com/images/I/71E9XW1eNoL._UF894,1000_QL80_.jpg" },
            { t: "Side Channels", img: "https://m.media-amazon.com/images/I/51KL+EDKyhL.jpg" },
          ].map((item, i)=> (
            <div key={i} className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`} onClick={() => item.img ? openModal(item.t) : undefined}>
              <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Roman Shades" intro="Tailored styles and fabrications.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Flat", img: "/assets/Specialty Items/Roman Shades/Cabot Citrus Farms Resort FL - GR.png" },
            { t: "Hobbled", img: "/assets/Specialty Items/Roman Shades/Hobbled Roman Shade.png" },
            { t: "Relaxed", img: "/assets/Specialty Items/Roman Shades/Relaxed Style Roman Shade.png" },
            { t: "Batten Front/Back", img: "https://blindsdesigns.com/wp-content/uploads/2021/06/2013_DES_UG_Organica_Living-Room.jpeg" },
          ].map((item, i)=> (
            <div key={i} className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`} onClick={() => item.img ? openModal(item.t) : undefined}>
              <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" sizes="(max-width: 1024px) 25vw, 25vw" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Valances" intro="Upholstered and wood options with tailored trims.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Laminated Flat Wood Valance", img: "/assets/Specialty Items/Valance/Laminated Flat Wood Valance.png" },
            { t: "Laminated Flat Wood Valance (Alt)", img: "/assets/Specialty Items/Valance/Laminated Flat Wood Valance 2.png" },
          ].map((item, i)=>(
            <div key={i} className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`} onClick={() => item.img ? openModal(item.t) : undefined}>
              <div className="p-2 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" sizes="(max-width: 1024px) 25vw, 25vw" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Upholstery" intro="Headboards, benches, cushions, and re‑upholstery.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            t: "Headboards", 
            img: "https://www.thespruce.com/thmb/jtmr08z3MeW00C-Dh5fSLlSE5WI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/380891527_150208994823747_3069919294392514539_n-6b57151ba18e4d0b8d70bb2a56021c3d.jpg", 
            desc: "Custom sizes, shapes, and fabrics tailored for hospitality and marine settings." 
          },
          { 
            t: "Benches", 
            img: "https://www.theshadestore.com/blog/wp-content/uploads/the-shade-store-ripple-fold-drapery-luxe-linen-beige-madison-track-black-window-seat-ideas-wood-bench-drawers-content-2022-becca-tobin-475x500px.jpg.webp", 
            desc: "Durable and stylish benches, upholstered to blend with any interior scheme."
          },
          { 
            t: "Cushions & Pillows", 
            img: "https://shopdecorator.com/cdn/shop/products/LANDEN_0002_n22_320x320.jpg?v=1646924541", 
            desc: "Accent cushions and pillows in coordinated fabrics and trims."
          },
          { 
            t: "Re‑Upholstery", 
            img: "https://www.glamour-decorating.com/wp-content/uploads/2023/06/Furniture-upholsterer-Re-upholstery--1440x900.jpg", 
            desc: "Refresh and restore existing furniture with new upholstery and foams."
          },
        ].map((item, i) => (
          <div 
            key={i}
            className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`}
            onClick={() => item.img ? openModal(item.t) : undefined}
          >
            <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
            {item.img ? (
              <div className="relative aspect-[4/3]">
                <Image src={item.img} alt={item.t} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            ) : null}
            <div className="p-4 text-sm text-[var(--text-muted)]">{item.desc}</div>
          </div>
        ))}
      </div>
      </Section>
      <Section title="Hardware" intro="Tracks, mounts, and operations to suit your installation.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{t: "Ceiling Mount", img: "https://m.media-amazon.com/images/I/61RTo2eLM-L.jpg"}, {t: "Wall Mount", img: "https://m.media-amazon.com/images/I/61fgIvqeicL._AC_UF1000,1000_QL80_.jpg"}, {t: "Decorative Hardware", img: "https://www.curtarra.com/cdn/shop/files/hardware-2.jpg?v=6399803644631637833"}, {t: "H‑Tracks (Blk/Brnz/Gold)", img: "https://waclighting.com/storage/waclighting-images/top_prod_image/HT4-BK_IMRO_2.jpg"}].map((item) => (
            <div key={item.t} className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`} onClick={() => item.img ? openModal(item.t) : undefined}>
              <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" sizes="(max-width: 1024px) 25vw, 25vw" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{t: "Motorized", img: "https://m.media-amazon.com/images/I/71c3JIym3kL.jpg"}, {t: "Cord Operated", img: "https://www.forestgroup.com/user_files/images/block_thumbnail/CKS_klein.png"}, {t: "Wand", img: "https://m.media-amazon.com/images/I/81XKoiq2pcL._UF894,1000_QL80_.jpg"}, {t: "Manual", img: "https://m.media-amazon.com/images/I/51PvXdALtDL.jpg"}].map((item) => (
            <div key={item.t} className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`} onClick={() => item.img ? openModal(item.t) : undefined}>
              <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <p className="text-[var(--text-muted)] mt-4">Other offerings and finishes available upon request.</p>
      </Section>

      <Section title="Specialty Window Treatments" intro="Additional offerings for specific applications.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Faux / Wood Blinds", img: "/assets/Specialty Items/Faux Wood Blinds/Faux Wood Blinds.jpg" },
            { t: "Aluminum Venetian Blinds", img: "/assets/Specialty Items/Aluminum Venetian Blinds.png" },
            { t: "Vertical Blinds", img: "/assets/Specialty Items/Vertical Blinds/Vertical Blinds.jpg" },
            { t: "Louvers (Plantation Shutters)", img: "/assets/Specialty Items/Louvers - Plantation Style Shutters/Louver Shutters.png" },
          ].map((item, i)=>(
            <div key={i} className={`rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)] ${item.img ? "cursor-pointer" : ""}`} onClick={() => item.img ? openModal(item.t) : undefined}>
              <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Modal open={open} onClose={() => setOpen(false)} fullScreen>
        <div className="relative h-dvh w-screen bg-black" onTouchStart={(e)=>{ touchStartX.current = e.touches[0].clientX; }} onTouchEnd={(e)=>{ if(touchStartX.current===null) return; const dx = e.changedTouches[0].clientX - touchStartX.current; if (dx>40) setCurrentIndex((i)=> (i-1+carouselItems.length)%carouselItems.length); if (dx<-40) setCurrentIndex((i)=> (i+1)%carouselItems.length); touchStartX.current = null; }}>
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-10 px-4 h-10 rounded-full bg-white/90">Close</button>
          <button onClick={() => setCurrentIndex((i)=> (i-1+carouselItems.length)%carouselItems.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 px-4 h-10 rounded-full bg-white/80">Prev</button>
          <button onClick={() => setCurrentIndex((i)=> (i+1)%carouselItems.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 px-4 h-10 rounded-full bg-white/80">Next</button>
          <div className="h-full w-full flex items-center justify-center p-4">
            {carouselItems[currentIndex]?.img ? (
              // Use native img for broad remote URL support in the modal
              <img src={carouselItems[currentIndex]!.img!} alt={carouselItems[currentIndex]!.t} className="h-full w-full object-contain" />
            ) : (
              <div className="text-white text-lg">{carouselItems[currentIndex]?.t}</div>
            )}
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}


