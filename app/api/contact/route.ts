import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs"; // force Node.js runtime on Vercel (not Edge)
import { sendContactEmail } from "@/app/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { firstName, lastName, email, organization, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email
    await sendContactEmail({
      firstName,
      lastName,
      email,
      organization,
      phone,
      message,
    });

    return NextResponse.json({ ok: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

