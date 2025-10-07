import Image from "next/image";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";
import { projects } from "../data";

type Props = { params: { slug: string } };

export default function ProjectDetail({ params }: Props) {
  const data = projects.find((p) => p.slug === params.slug) ?? projects[0];

  return (
    <PageContainer>
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
            <div key={i} className="relative aspect-[4/3] rounded-md overflow-hidden">
              <Image src={src} alt="Project photo" fill className="object-cover" />
            </div>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}


