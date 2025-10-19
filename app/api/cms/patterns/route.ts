import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "public", "cms-patterns.json");

async function ensureFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, JSON.stringify({ patterns: [] }, null, 2), "utf8");
  }
}

export async function GET() {
  await ensureFile();
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: NextRequest) {
  await ensureFile();
  const body = await req.json();
  const { slug, name, svgMarkup } = body || {};
  if (!slug || !name || !svgMarkup) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const raw = await fs.readFile(DATA_PATH, "utf8");
  const data = JSON.parse(raw || "{}");
  const list = (data.patterns || []) as any[];
  if (list.find((p) => p.slug === slug)) return NextResponse.json({ error: "Slug exists" }, { status: 409 });
  list.push({ slug, name, svgMarkup });
  await fs.writeFile(DATA_PATH, JSON.stringify({ patterns: list }, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}


