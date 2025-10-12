import Image from "next/image";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";

export default function ProductsPage() {
  return (
    <PageContainer>
      <Section title="Draperies" intro="Core drapery headings and constructions. Click through our portfolio for real-world installs.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Pinch Pleat" },
            { t: "Ripplefold" },
            { t: "Grommet / Inverted" },
            { t: "Fullness Sizes (reference)" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
              <div className="p-4 font-medium text-[var(--text-primary)]">{item.t}</div>
              {/* No image available yet for these headings */}
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
            { t: "Cassette Options" },
            { t: "Bottom Rails" },
            { t: "Side Channels" },
          ].map((item, i)=> (
            <div key={i} className="rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
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

      <Section title="Roman Shades" intro="Tailored styles and fabrications.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Flat", img: "/assets/Specialty Items/Roman Shades/Cabot Citrus Farms Resort FL - GR.png" },
            { t: "Hobbled", img: "/assets/Specialty Items/Roman Shades/Hobbled Roman Shade.png" },
            { t: "Relaxed", img: "/assets/Specialty Items/Roman Shades/Relaxed Style Roman Shade.png" },
            { t: "Batten Front/Back" },
          ].map((item, i)=> (
            <div key={i} className="rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
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

      <Section title="Valances" intro="Upholstered and wood options with tailored trims.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Laminated Flat Wood Valance", img: "/assets/Specialty Items/Valance/Laminated Flat Wood Valance.png" },
            { t: "Laminated Flat Wood Valance (Alt)", img: "/assets/Specialty Items/Valance/Laminated Flat Wood Valance 2.png" },
          ].map((item, i)=>(
            <div key={i} className="rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
              <div className="p-2 font-medium text-[var(--text-primary)]">{item.t}</div>
              {item.img ? (
                <div className="relative aspect-[4/3]">
                  <Image src={item.img} alt={item.t} fill className="object-cover" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Upholstery" intro="Images of headboards, benches, cushions, and re‑upholstery." />

      <Section title="Specialty Window Treatments" intro="Additional offerings for specific applications.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Faux / Wood Blinds", img: "/assets/Specialty Items/Faux Wood Blinds/Faux Wood Blinds.jpg" },
            { t: "Aluminum Venetian Blinds", img: "/assets/Specialty Items/Aluminum Venetian Blinds.png" },
            { t: "Vertical Blinds", img: "/assets/Specialty Items/Vertical Blinds/Vertical Blinds.jpg" },
            { t: "Louvers (Plantation Shutters)", img: "/assets/Specialty Items/Louvers - Plantation Style Shutters/Louver Shutters.png" },
          ].map((item, i)=>(
            <div key={i} className="rounded-xl overflow-hidden border border-[color:var(--brand-taupe)]/30 bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
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
    </PageContainer>
  );
}


