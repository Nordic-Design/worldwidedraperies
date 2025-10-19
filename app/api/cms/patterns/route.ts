import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const PUBLIC_PATH = path.join(process.cwd(), "public", "cms-patterns.json");
const TMP_PATH = "/tmp/cms-patterns.json"; // writable on many serverless platforms

async function readFirstExisting(): Promise<{ patterns: any[] }> {
  // Prefer /tmp (serverless write location), then fall back to public
  for (const p of [TMP_PATH, PUBLIC_PATH]) {
    try {
      const raw = await fs.readFile(p, "utf8");
      return JSON.parse(raw || "{\"patterns\":[]}");
    } catch {}
  }
  return { patterns: [] };
}

async function writeBest(data: any) {
  // Try public first (works locally), fall back to /tmp in read-only envs
  try {
    await fs.writeFile(PUBLIC_PATH, JSON.stringify(data, null, 2), "utf8");
    return;
  } catch {}
  await fs.writeFile(TMP_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  const json = await readFirstExisting();
  return NextResponse.json(json);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slug, name, svgMarkup } = body || {};
  if (!slug || !name || !svgMarkup) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const data = await readFirstExisting();
  const list = (data.patterns || []) as any[];
  if (list.find((p) => p.slug === slug)) return NextResponse.json({ error: "Slug exists" }, { status: 409 });
  list.push({ slug, name, svgMarkup });
  await writeBest({ patterns: list });
  return NextResponse.json({ ok: true });
}


