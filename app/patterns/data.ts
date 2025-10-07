export type PatternRegion = {
  id: string;
  name: string;
  d: string; // SVG path data
};

export type PatternDef = {
  slug: string;
  name: string;
  preview: string;
  regions: PatternRegion[];
};

// Utilities to build intricate regions using rectangles (optimized for our canvas renderer)
function rectPath(x: number, y: number, w: number, h: number): string {
  return `M${x} ${y} H${x + w} V${y + h} H${x} Z`;
}

function gridRegions(rows: number, cols: number, slug: string, inset = 0): PatternRegion[] {
  const W = 400 - inset * 2;
  const H = 240 - inset * 2;
  const cellW = W / cols;
  const cellH = H / rows;
  const out: PatternRegion[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = `${slug}-${r}-${c}`;
      const x = inset + c * cellW;
      const y = inset + r * cellH;
      out.push({ id, name: `Region ${r + 1}-${c + 1}`, d: rectPath(Math.round(x), Math.round(y), Math.ceil(cellW), Math.ceil(cellH)) });
    }
  }
  return out;
}

export const PATTERNS: PatternDef[] = [
  { slug: "geometric-weave", name: "Geometric Weave", preview: "https://images.unsplash.com/photo-1701964619775-b18422290cf9?w=900&auto=format&fit=crop&q=60", regions: gridRegions(6, 10, "geo") },
  { slug: "diamond-grid", name: "Diamond Grid", preview: "https://images.unsplash.com/photo-1614332245815-9097a27754a7?w=900&auto=format&fit=crop&q=60", regions: gridRegions(8, 12, "diamond") },
  { slug: "chevron", name: "Chevron", preview: "https://images.unsplash.com/photo-1604335399106-699ec79b3f0f?w=900&auto=format&fit=crop&q=60", regions: gridRegions(7, 14, "chevron") },
  { slug: "windowpane", name: "Windowpane", preview: "https://images.unsplash.com/photo-1616401786263-3f8e3dbf4b81?w=900&auto=format&fit=crop&q=60", regions: gridRegions(5, 10, "window") },
  { slug: "basketweave", name: "Basketweave", preview: "https://images.unsplash.com/photo-1615485737641-3f5b1f69d0e5?w=900&auto=format&fit=crop&q=60", regions: gridRegions(9, 9, "basket") },
  { slug: "herringbone", name: "Herringbone", preview: "https://images.unsplash.com/photo-1592878896635-87a63099e79f?w=900&auto=format&fit=crop&q=60", regions: gridRegions(6, 16, "herring") },
  { slug: "lattice", name: "Lattice", preview: "https://images.unsplash.com/photo-1623059406597-3a78dac827ad?w=900&auto=format&fit=crop&q=60", regions: gridRegions(10, 10, "lattice") },
  { slug: "mosaic", name: "Mosaic", preview: "https://images.unsplash.com/photo-1614332245815-9097a27754a7?w=900&auto=format&fit=crop&q=60", regions: gridRegions(12, 12, "mosaic") },
  { slug: "striae", name: "Striae", preview: "https://images.unsplash.com/photo-1591047139829-d91c8d0b2a4c?w=900&auto=format&fit=crop&q=60", regions: gridRegions(4, 20, "striae") },
  { slug: "panelled", name: "Panelled", preview: "https://images.unsplash.com/photo-1613553491441-c4c5b62dbcf2?w=900&auto=format&fit=crop&q=60", regions: gridRegions(3, 8, "panel", 10) },
  { slug: "micro-tiles", name: "Micro Tiles", preview: "https://images.unsplash.com/photo-1604335389349-7c7d6c0e5472?w=900&auto=format&fit=crop&q=60", regions: gridRegions(16, 24, "micro") },
  { slug: "banded", name: "Banded", preview: "https://images.unsplash.com/photo-1556909172-54557e99d1d4?w=900&auto=format&fit=crop&q=60", regions: gridRegions(8, 4, "banded") },
];
