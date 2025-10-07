import Link from "next/link";
import PageContainer from "../components/PageContainer";
import Section from "../components/Section";
import { projects } from "./data";

export default function PortfolioPage() {
  return (
    <PageContainer>
      <Section title="Portfolio" intro="Solid Reputations & Prestigious Partnerships — a selection of installations across hotels, resorts, and cruise ships.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="rounded-md border border-slate-200/60 bg-[var(--card-bg)] p-4 hover:bg-slate-50/10">
              <div className="text-lg font-medium text-[var(--text-primary)]">{p.name}</div>
              <div className="text-sm text-[var(--text-muted)]">{p.location}</div>
            </Link>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}


