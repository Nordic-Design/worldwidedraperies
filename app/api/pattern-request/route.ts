import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs"; // force Node.js runtime on Vercel (not Edge)
import { sendPatternRequestEmail } from "@/app/lib/email";

export async function POST(req: NextRequest) {
  try {
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

    // Validate required fields
    if (!firstName || !lastName || !email || !patternName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email via SMTP
    await sendPatternRequestEmail({
      firstName,
      lastName,
      email,
      organization,
      notes,
      patternName,
      colors,
      fills,
      imageDataUrl,
    });

    console.log("Pattern request email sent successfully", {
      firstName,
      lastName,
      email,
      patternName,
    });

    return NextResponse.json({ ok: true, message: "Pattern request sent successfully" });
  } catch (error) {
    console.error("Error sending pattern request email:", error);
    return NextResponse.json(
      { error: "Failed to send pattern request" },
      { status: 500 }
    );
  }
}


