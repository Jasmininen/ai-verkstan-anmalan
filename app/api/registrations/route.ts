import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      selectedEvent,
      name,
      email,
      phone,
      company,
      orgNumber,
      invoiceEmail,
      reference,
      participants,
      message,
    } = body;

    if (!selectedEvent || !name || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("registrations").insert({
      selected_event: selectedEvent,
      name,
      email,
      phone,
      company,
      org_number: orgNumber,
      invoice_email: invoiceEmail,
      reference,
      participants,
      message,
    });

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        { error: "Could not save registration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}