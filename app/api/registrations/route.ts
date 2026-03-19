import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: email,
      subject: `Bekräftelse på din anmälan - ${selectedEvent}`,
      html: `
        <h2>Tack för din anmälan, ${name}!</h2>
        <p>Vi har tagit emot din anmälan till <strong>${selectedEvent}</strong>.</p>
        <p>Vi återkommer snart med mer information.</p>
      `,
    });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: [
        "info@aiverkstan.nu",
        "jasmine.dahlberg@axontech.se",
        "sandra@brusetkommunikation.se",
      ],
      subject: `Ny anmälan - ${selectedEvent}`,
      html: `
        <h2>Ny anmälan</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "-"}</p>
        <p><strong>Företag:</strong> ${company}</p>
        <p><strong>Organisationsnummer:</strong> ${orgNumber || "-"}</p>
        <p><strong>Fakturamejl:</strong> ${invoiceEmail || "-"}</p>
        <p><strong>Referens:</strong> ${reference || "-"}</p>
        <p><strong>Antal deltagare:</strong> ${participants || "-"}</p>
        <p><strong>Meddelande:</strong> ${message || "-"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}