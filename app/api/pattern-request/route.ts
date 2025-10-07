import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const firstName = String(form.get("firstName") || "");
  const lastName = String(form.get("lastName") || "");
  const email = String(form.get("email") || "");
  const organization = String(form.get("organization") || "");
  const notes = String(form.get("notes") || "");
  const patternName = String(form.get("patternName") || "");
  const colors = String(form.get("colors") || "[]");
  const fills = String(form.get("fills") || "{}");
  const imageDataUrl = String(form.get("imageDataUrl") || "");

  // Placeholder: implement real SMTP using your .env secrets
  // For now, we just log to server and return 200
  console.log("Pattern request", { firstName, lastName, email, organization, notes, patternName, colors, fills, hasImage: !!imageDataUrl });

  return NextResponse.json({ ok: true });
}


