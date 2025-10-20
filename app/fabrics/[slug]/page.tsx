"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";
import { FABRICS } from "../data";

export default function FabricDetail() {
  const params = useParams() as { slug?: string };
  const [fabric, setFabric] = useState(FABRICS.find(f => f.slug === params?.slug) ?? FABRICS[0]);
  useEffect(()=>{ (async () => {
    try {
      const res = await fetch(`/api/fabrics/import`, { cache: "no-store"});
      const j = await res.json();
      const r = (j.items || []).find((x: any)=> x.slug === params?.slug);
      if (r) setFabric(r);
    } catch {}
  })(); }, [params?.slug]);
  return (
    <PageContainer>
      <section className="px-6 sm:px-10 lg:px-14 py-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div className="relative aspect-[4/3] rounded-md overflow-hidden">
          <Image src={fabric.image} alt={fabric.name} fill className="object-cover" />
        </div>
        <div>
          <div className="text-sm text-[var(--text-muted)] flex items-center gap-2">
            <Link href="/fabrics" className="underline">View All</Link>
            <span>›</span>
            <span>{fabric.category}</span>
            <span>›</span>
            <span>{fabric.name}</span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold text-[var(--text-primary)]">{fabric.name}</h1>
          <div className="mt-2 text-[var(--text-muted)]">{fabric.manufacturer || "Worldwide Draperies"}</div>

          <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-[var(--text-muted)] uppercase tracking-wide">Application</div>
              <div>{fabric.specs.application}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] uppercase tracking-wide">Width</div>
              <div>{fabric.specs.width}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[var(--text-muted)] uppercase tracking-wide">Design Types</div>
              <div>{fabric.specs.designTypes}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] uppercase tracking-wide">Fire Codes</div>
              <div>{fabric.specs.fireCodes}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] uppercase tracking-wide">Content</div>
              <div>{fabric.specs.content}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] uppercase tracking-wide">Railroaded</div>
              <div>{fabric.specs.railroaded}</div>
            </div>
          </div>

          <a href="/contact" className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-[var(--accent-gold)] text-black hover:brightness-95">Contact for quote</a>
        </div>
      </section>

      <Section title="" intro="" />
    </PageContainer>
  );
}


