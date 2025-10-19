import React from "react";

export type V1Pattern = {
  slug: string;
  name: string;
  previewBg?: string;
  Component: (props: { bg: string; fg: string; acc: string }) => JSX.Element;
};

function Stripes({ bg, fg, acc }: { bg: string; fg: string; acc: string }) {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect x="0" y="0" width="400" height="240" fill={bg} />
      {[...Array(12)].map((_, i) => (
        <rect key={i} x={i * 34} y={0} width={20} height={240} fill={i % 3 === 0 ? acc : fg} opacity={0.9} />
      ))}
    </svg>
  );
}

function Grid({ bg, fg, acc }: { bg: string; fg: string; acc: string }) {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect x="0" y="0" width="400" height="240" fill={bg} />
      {[...Array(20)].map((_, i) => (
        <rect key={`v-${i}`} x={i * 20} y={0} width={1} height={240} fill={fg} opacity={0.6} />
      ))}
      {[...Array(12)].map((_, i) => (
        <rect key={`h-${i}`} x={0} y={i * 20} width={400} height={1} fill={fg} opacity={0.6} />
      ))}
      <rect x={0} y={0} width={400} height={240} fill="none" stroke={acc} strokeWidth={3} opacity={0.7} />
    </svg>
  );
}

function Chevron({ bg, fg, acc }: { bg: string; fg: string; acc: string }) {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect x="0" y="0" width="400" height="240" fill={bg} />
      {[...Array(8)].map((_, i) => (
        <path key={i} d={`M0 ${i*30} L200 ${i*30+15} L400 ${i*30} L400 ${i*30+30} L200 ${i*30+15} L0 ${i*30+30} Z`} fill={i%2===0?fg:acc} opacity={0.85} />
      ))}
    </svg>
  );
}

function Dots({ bg, fg, acc }: { bg: string; fg: string; acc: string }) {
  const dots: JSX.Element[] = [];
  for (let y = 10; y < 240; y += 24) {
    for (let x = 10; x < 400; x += 24) {
      const useAcc = ((x + y) / 24) % 3 === 0;
      dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill={useAcc ? acc : fg} />);
    }
  }
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect x="0" y="0" width="400" height="240" fill={bg} />
      {dots}
    </svg>
  );
}

function Waves({ bg, fg, acc }: { bg: string; fg: string; acc: string }) {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect x="0" y="0" width="400" height="240" fill={bg} />
      {[...Array(6)].map((_, i) => (
        <path key={i} d={`M0 ${i*40+20} C 100 ${i*40-10}, 300 ${i*40+50}, 400 ${i*40+20}`} stroke={i%2===0?fg:acc} strokeWidth={8} fill="none" opacity={0.8} />
      ))}
    </svg>
  );
}

function Herringbone({ bg, fg, acc }: { bg: string; fg: string; acc: string }) {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect x="0" y="0" width="400" height="240" fill={bg} />
      {[...Array(12)].map((_, r) => (
        <g key={r} opacity={0.9}>
          {[...Array(10)].map((_, c) => (
            <path key={c} d={`M${c*40} ${r*20} l20 20 l20 -20`} stroke={r%2===0?fg:acc} strokeWidth={3} fill="none" />
          ))}
        </g>
      ))}
    </svg>
  );
}

export const V1_PATTERNS: V1Pattern[] = [
  { slug: "stripes", name: "Stripes", Component: Stripes },
  { slug: "grid", name: "Grid", Component: Grid },
  { slug: "chevron", name: "Chevron", Component: Chevron },
  { slug: "dots", name: "Dots", Component: Dots },
  { slug: "waves", name: "Waves", Component: Waves },
  { slug: "herringbone", name: "Herringbone", Component: Herringbone },
];

export function RenderCustomSVG({ markup, bg, fg, acc }: { markup: string; bg: string; fg: string; acc: string }) {
  const colored = markup.replaceAll("{bg}", bg).replaceAll("{fg}", fg).replaceAll("{acc}", acc);
  return <div dangerouslySetInnerHTML={{ __html: colored }} />;
}


