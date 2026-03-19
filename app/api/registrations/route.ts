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

    const attendeeHtml = `
      <div style="margin:0; padding:0; background-color:#f5f1e8;">
        <div style="max-width:680px; margin:0 auto; padding:32px 16px;">
          <div style="background-color:#4a4a4a; border-radius:28px; overflow:hidden; box-shadow:0 24px 80px rgba(0,0,0,0.16);">
            
            <div style="padding:20px 28px; border-bottom:1px solid rgba(255,255,255,0.08); text-align:center;">
              <div style="display:inline-block; padding:8px 14px; border-radius:999px; background-color:#5e5e5e; color:#b7d9b2; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; font-family:Arial, sans-serif;">
                AI-verkstan
              </div>

              <h1 style="margin:18px 0 8px 0; font-size:34px; line-height:1.15; color:#ffffff; font-family:Arial, sans-serif;">
                Du är anmäld
              </h1>

              <p style="margin:0; font-size:16px; line-height:1.7; color:#d7d7d7; font-family:Arial, sans-serif;">
                Vad roligt att du vill vara med.
              </p>
            </div>

            <div style="padding:32px 28px 36px 28px;">
              <p style="margin:0 0 16px 0; font-size:17px; line-height:1.8; color:#f3f3f3; font-family:Arial, sans-serif;">
                Hej ${name},
              </p>

              <p style="margin:0 0 16px 0; font-size:16px; line-height:1.8; color:#dddddd; font-family:Arial, sans-serif;">
                Vi har tagit emot din anmälan och ser fram emot att välkomna dig till AI-verkstan.
              </p>

              <div style="margin:26px 0; padding:22px 22px; background:linear-gradient(135deg,#e0b41e 0%, #f2cf60 100%); border-radius:20px;">
                <p style="margin:0; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:#4a3a00; font-family:Arial, sans-serif;">
                  Din bokning
                </p>
                <p style="margin:8px 0 0 0; font-size:24px; line-height:1.35; font-weight:700; color:#2f2f2f; font-family:Arial, sans-serif;">
                  ${selectedEvent}
                </p>
              </div>

              <p style="margin:0 0 22px 0; font-size:16px; line-height:1.8; color:#dddddd; font-family:Arial, sans-serif;">
                Din plats är nu säkrad. Inom kort får du ett mejl med all praktisk information inför dagen.
              </p>

              <div style="margin:24px 0; padding:24px; background-color:#5a5a5a; border-radius:22px;">
                <h2 style="margin:0 0 16px 0; font-size:18px; color:#ffffff; font-family:Arial, sans-serif;">
                  Sammanfattning av din anmälan
                </h2>

                <table role="presentation" style="width:100%; border-collapse:collapse;">
                  <tr>
                    <td style="padding:9px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Namn</td>
                    <td style="padding:9px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">E-post</td>
                    <td style="padding:9px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Företag</td>
                    <td style="padding:9px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Antal deltagare</td>
                    <td style="padding:9px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${participants || "-"}</td>
                  </tr>
                </table>
              </div>

              <div style="margin:32px 0 24px 0; text-align:center;">
                <a
                  href="https://www.aiverkstan.nu"
                  style="display:inline-block; background-color:#e0b41e; color:#2f2f2f; padding:15px 30px; border-radius:999px; font-weight:700; text-decoration:none; font-family:Arial, sans-serif; font-size:16px;"
                >
                  Besök AI-verkstan
                </a>
              </div>

              <p style="margin:0 0 14px 0; font-size:16px; line-height:1.8; color:#dddddd; font-family:Arial, sans-serif;">
                Läs mer på
                <a
                  href="https://www.aiverkstan.nu"
                  style="color:#e0b41e; text-decoration:none; font-weight:700;"
                >
                  aiverkstan.nu
                </a>
                .
              </p>

              <p style="margin:0 0 20px 0; font-size:15px; line-height:1.8; color:#cfcfcf; font-family:Arial, sans-serif;">
                Har du frågor? Svara bara på det här mejlet så hjälper vi dig vidare.
              </p>

              <p style="margin:0; font-size:16px; line-height:1.8; color:#dddddd; font-family:Arial, sans-serif;">
                Vi ser fram emot att träffa dig.<br /><br />
                Varma hälsningar,<br />
                <span style="color:#ffffff; font-weight:700;">Sandra och Jasmine</span><br />
                AI-verkstan
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const internalHtml = `
      <div style="margin:0; padding:0; background-color:#f5f1e8;">
        <div style="max-width:680px; margin:0 auto; padding:32px 16px;">
          <div style="background-color:#4a4a4a; border-radius:28px; overflow:hidden; box-shadow:0 24px 80px rgba(0,0,0,0.16);">

            <div style="padding:20px 28px; border-bottom:1px solid rgba(255,255,255,0.08); text-align:center;">
              <div style="display:inline-block; padding:8px 14px; border-radius:999px; background-color:#5e5e5e; color:#b7d9b2; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; font-family:Arial, sans-serif;">
                Ny anmälan
              </div>

              <h1 style="margin:18px 0 8px 0; font-size:32px; line-height:1.2; color:#ffffff; font-family:Arial, sans-serif;">
                ${selectedEvent}
              </h1>

              <p style="margin:0; font-size:16px; line-height:1.7; color:#d7d7d7; font-family:Arial, sans-serif;">
                En ny anmälan har kommit in via formuläret.
              </p>
            </div>

            <div style="padding:32px 28px 36px 28px;">
              <div style="margin:0 0 24px 0; padding:22px 22px; background:linear-gradient(135deg,#e0b41e 0%, #f2cf60 100%); border-radius:20px;">
                <p style="margin:0; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:#4a3a00; font-family:Arial, sans-serif;">
                  Tillfälle
                </p>
                <p style="margin:8px 0 0 0; font-size:24px; line-height:1.35; font-weight:700; color:#2f2f2f; font-family:Arial, sans-serif;">
                  ${selectedEvent}
                </p>
              </div>

              <div style="padding:24px; background-color:#5a5a5a; border-radius:22px;">
                <h2 style="margin:0 0 16px 0; font-size:18px; color:#ffffff; font-family:Arial, sans-serif;">
                  Anmälningsuppgifter
                </h2>

                <table role="presentation" style="width:100%; border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Namn</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">E-post</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Telefon</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${phone || "-"}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Företag</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Org.nr</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${orgNumber || "-"}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Fakturamejl</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${invoiceEmail || "-"}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Referens</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${reference || "-"}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Deltagare</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${participants || "-"}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif; vertical-align:top;">Meddelande</td>
                    <td style="padding:10px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${message || "-"}</td>
                  </tr>
                </table>
              </div>

              <div style="margin:28px 0 0 0; text-align:center;">
                <a
                  href="https://www.aiverkstan.nu"
                  style="display:inline-block; background-color:#e0b41e; color:#2f2f2f; padding:12px 24px; border-radius:999px; font-weight:700; text-decoration:none; font-family:Arial, sans-serif;"
                >
                  Öppna AI-verkstan
                </a>
              </div>

              <p style="margin:24px 0 0 0; font-size:15px; line-height:1.8; color:#dddddd; font-family:Arial, sans-serif;">
                Hälsningar,<br />
                <span style="color:#ffffff; font-weight:700;">Sandra och Jasmine</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: email,
      subject: `Bekräftelse på din anmälan - ${selectedEvent}`,
      html: attendeeHtml,
    });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: [
        "info@aiverkstan.nu",
        "jasmine.dahlberg@axontech.se",
        "sandra@brusetkommunikation.se",
      ],
      subject: `Ny anmälan - ${selectedEvent}`,
      html: internalHtml,
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