"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "../../components/PageContainer";
import Section from "../../components/Section";
import { RenderCustomSVG } from "../v1";

export default function PatternEditorV1() {
  const router = useRouter();
  const params = useParams() as { slug?: string };
  const slug = params?.slug as string;
  const [cmsMarkup, setCmsMarkup] = useState<string>("");
  const [title, setTitle] = useState<string>("Pattern");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/cms/patterns", { cache: "no-store" });
        const data = await res.json();
        const rec = (data?.patterns || []).find((p: any) => p.slug === slug);
        if (rec) { setCmsMarkup(rec.svgMarkup || ""); setTitle(rec.name || "Pattern"); }
      } catch {}
    })();
  }, [slug]);

  const [bg, setBg] = useState("#F9F9F6");
  const [fg, setFg] = useState("#C5B8A5");
  const [acc, setAcc] = useState("#D4AF37");
  const [openPicker, setOpenPicker] = useState<null | "bg" | "fg" | "acc" >(null);

  const swatches = [
    '#FFFFFF', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#000000',
    '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C',
    '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F',
    '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C',
    '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92',
    '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E',
    '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1',
    '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B',
    '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064',
    '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40',
    '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20',
    '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E',
    '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717',
    '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17',
    '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00',
    '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100',
    '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C',
    '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723',
    '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
  ];

  function selectColor(hex: string) {
    if (openPicker === "bg") setBg(hex);
    if (openPicker === "fg") setFg(hex);
    if (openPicker === "acc") setAcc(hex);
    setOpenPicker(null);
  }

  return (
    <PageContainer>
      <Section title={title} intro="Set background, foreground, and accent colors.">
        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
          <div className="space-y-4">
            <button onClick={() => router.back()} className="text-sm underline">← Back</button>
            <div className="space-y-3">
              {([
                { key: "bg", label: "Background", value: bg },
                { key: "fg", label: "Foreground", value: fg },
                { key: "acc", label: "Accent", value: acc },
              ] as const).map((c) => (
                <div key={c.key} className="relative">
                  <button onClick={() => setOpenPicker(openPicker===c.key?null:c.key)} className="w-full h-11 border rounded-md flex items-center justify-between px-3">
                    <span>{c.label}</span>
                    <span className="h-6 w-6 rounded-full border" style={{ background: c.value }} />
                  </button>
                  {openPicker === c.key ? (
                    <div className="absolute w-[50vw] flex flex-wrap gap-2 z-10 mt-2 p-2 rounded-md border bg-white  gap-2">
                      {swatches.map(hex => (
                        <button key={Math.random() + (hex)} onClick={() => selectColor(hex)} className="h-8 w-8 rounded" style={{ background: hex }} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card-bg)] rounded-xl border border-[color:var(--brand-taupe)]/30 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
            {cmsMarkup ? (
              <RenderCustomSVG markup={cmsMarkup} bg={bg} fg={fg} acc={acc} />
            ) : null}
            <div className="mt-4 text-sm text-[var(--text-muted)]">Pick a swatch for Background, Foreground, and Accent. The picker closes after selection.</div>
            <div className="mt-4">
              <button onClick={() => router.push(`/patterns/${slug}/finalize?colors=${encodeURIComponent(JSON.stringify([bg, fg, acc]))}`)} className="px-5 py-2 rounded-full bg-[var(--accent-gold)] text-white">Continue</button>
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}


