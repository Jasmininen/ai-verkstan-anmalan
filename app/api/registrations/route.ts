import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL as string;
const notificationEmails = process.env.REGISTRATION_NOTIFICATION_EMAILS as string;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY");
}

if (!resendFromEmail) {
  throw new Error("Missing RESEND_FROM_EMAIL");
}

if (!notificationEmails) {
  throw new Error("Missing REGISTRATION_NOTIFICATION_EMAILS");
}

const resend = new Resend(resendApiKey);

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

    const internalRecipients = notificationEmails
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    await resend.emails.send({
      from: resendFromEmail,
      to: email,
      subject: `Bekräftelse på din anmälan - ${selectedEvent}`,
      html: `
        <h2>Tack för din anmälan, ${name}!</h2>
        <p>Vi har tagit emot din anmälan till <strong>${selectedEvent}</strong>.</p>
        <p>Vi återkommer snart med bekräftelse och praktisk information.</p>
        <p>Vänliga hälsningar<br />AI-verkstan</p>
      `,
    });

    await resend.emails.send({
      from: resendFromEmail,
      to: internalRecipients,
      subject: `Ny anmälan - ${selectedEvent}`,
      html: `
        <h2>Ny anmälan har kommit in</h2>
        <ul>
          <li><strong>Tillfälle:</strong> ${selectedEvent}</li>
          <li><strong>Namn:</strong> ${name}</li>
          <li><strong>E-post:</strong> ${email}</li>
          <li><strong>Telefon:</strong> ${phone || "-"}</li>
          <li><strong>Företag:</strong> ${company}</li>
          <li><strong>Organisationsnummer:</strong> ${orgNumber || "-"}</li>
          <li><strong>Fakturamejl:</strong> ${invoiceEmail || "-"}</li>
          <li><strong>Referens:</strong> ${reference || "-"}</li>
          <li><strong>Antal deltagare:</strong> ${participants || "-"}</li>
          <li><strong>Meddelande:</strong> ${message || "-"}</li>
        </ul>
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