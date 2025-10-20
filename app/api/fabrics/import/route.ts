import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const PUBLIC_DB = path.join(process.cwd(), "public", "fabrics-db.json");
const TMP_DB = "/tmp/fabrics-db.json";

async function readDb() {
  for (const p of [TMP_DB, PUBLIC_DB]) {
    try { return JSON.parse(await fs.readFile(p, "utf8") || "{\"items\":[]}"); } catch {}
  }
  return { items: [] };
}
async function writeDb(data: any) {
  try { await fs.writeFile(PUBLIC_DB, JSON.stringify(data, null, 2), "utf8"); return; } catch {}
  await fs.writeFile(TMP_DB, JSON.stringify(data, null, 2), "utf8");
}

function csvToRows(csv: string): string[][] {
  return csv.trim().split(/\r?\n/).map(line => {
    // naive CSV split; supports quoted fields
    const out: string[] = [];
    let cur = "", inQ = false;
    for (let i=0;i<line.length;i++) {
      const ch = line[i];
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { out.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    out.push(cur.trim());
    return out;
  });
}

// Expected headers: slug,name,manufacturer,category,image,application,width,designTypes,fireCodes,content,railroaded
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Missing CSV file" }, { status: 400 });
  const text = await file.text();
  const rows = csvToRows(text);
  const [header, ...data] = rows;
  const idx = (k: string) => header.indexOf(k);
  const replace = (String(form.get("replace")) === "1");
  const db = replace ? { items: [] as any[] } : await readDb();
  const bySlug: Record<string, any> = Object.fromEntries(db.items.map((x: any)=>[x.slug, x]));
  for (const r of data) {
    if (!r.length) continue;
    const item = {
      slug: r[idx("slug")],
      name: r[idx("name")],
      manufacturer: r[idx("manufacturer")],
      category: r[idx("category")],
      image: r[idx("image")],
      specs: {
        application: r[idx("application")],
        width: r[idx("width")],
        designTypes: r[idx("designTypes")],
        fireCodes: r[idx("fireCodes")],
        content: r[idx("content")],
        railroaded: r[idx("railroaded")],
      },
    };
    if (!item.slug) continue;
    bySlug[item.slug] = item;
  }
  const next = { items: Object.values(bySlug) };
  await writeDb(next);
  return NextResponse.json({ ok: true, count: (next.items as any[]).length });
}

export async function GET() {
  const db = await readDb();
  // Additionally scan the WWD_fabrics directory for images to auto-populate
  try {
    const base = path.join(process.cwd(), "public", "assets", "WWD_fabrics");
    const groups: Array<{dir:string, category:string}> = [
      { dir: "printed_collection", category: "Patterns" },
      { dir: "sheer_vol1", category: "Sheers" },
      { dir: "dyed_blackouts", category: "Dyed Blackouts" },
      { dir: "stock_blackouts", category: "Blackouts" },
    ];
    const found: any[] = [];
    for (const g of groups) {
      const p = path.join(base, g.dir);
      try {
        const files = await fs.readdir(p);
        for (const f of files) {
          if (!/\.(jpg|jpeg|png|webp)$/i.test(f)) continue;
          const name = f.replace(/\.(jpg|jpeg|png|webp)$/i, "");
          const slug = `${g.dir}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const image = `/assets/WWD_fabrics/${g.dir}/${encodeURIComponent(f)}`;
          found.push({ slug, name, manufacturer: "Worldwide Draperies", category: g.category, image, specs: { application: "Drapery", width: "118\"", designTypes: g.category, fireCodes: "NFPA701", content: "Polyester", railroaded: "Yes" } });
        }
      } catch {}
    }
    const bySlug: Record<string, any> = Object.fromEntries((db.items||[]).map((x:any)=>[x.slug,x]));
    for (const x of found) bySlug[x.slug] = bySlug[x.slug] || x;
    return NextResponse.json({ items: Object.values(bySlug), db: db.items, scanned: found });
  } catch {
    return NextResponse.json({ items: db.items, db: db.items, scanned: [] });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  let slug = url.searchParams.get("slug");
  let slugs: string[] | undefined;
  try {
    const body = await req.json();
    slugs = body?.slugs;
    if (!slug) slug = body?.slug;
  } catch {}
  const data = await readDb();
  if (slugs && slugs.length) {
    const next = { items: (data.items||[]).filter((p:any)=> !slugs!.includes(p.slug)) };
    await writeDb(next);
    return NextResponse.json({ ok: true, count: next.items.length });
  }
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const next = { items: (data.items||[]).filter((p:any)=> p.slug !== slug) };
  await writeDb(next);
  return NextResponse.json({ ok: true, count: next.items.length });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, name, manufacturer, category, image, specs } = body || {};
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    const db = await readDb();
    const items = (db.items || []) as any[];
    const idx = items.findIndex((i) => i.slug === slug);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const prev = items[idx];
    const next = {
      ...prev,
      ...(name !== undefined ? { name } : {}),
      ...(manufacturer !== undefined ? { manufacturer } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(image !== undefined ? { image } : {}),
      ...(specs !== undefined ? { specs: { ...prev.specs, ...specs } } : {}),
    };
    items[idx] = next;
    await writeDb({ items });
    return NextResponse.json({ ok: true, item: next });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Update failed" }, { status: 500 });
  }
}


