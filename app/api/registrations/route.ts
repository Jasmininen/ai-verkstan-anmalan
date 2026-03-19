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
        <div style="margin:0; padding:0; background-color:#f4f1ea;">
          <div style="max-width:640px; margin:0 auto; padding:40px 20px;">
            <div style="background-color:#4a4a4a; border-radius:24px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12);">
              <div style="padding:40px 32px 24px 32px; text-align:center; border-bottom:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#b7d9b2; font-family:Arial, sans-serif;">
                  AI-verkstan
                </p>
                <h1 style="margin:16px 0 0 0; font-size:32px; line-height:1.2; color:#ffffff; font-family:Arial, sans-serif;">
                  Tack för din anmälan
                </h1>
              </div>

              <div style="padding:32px;">
                <p style="margin:0 0 16px 0; font-size:16px; line-height:1.7; color:#f3f3f3; font-family:Arial, sans-serif;">
                  Hej ${name},
                </p>

                <p style="margin:0 0 16px 0; font-size:16px; line-height:1.7; color:#dddddd; font-family:Arial, sans-serif;">
                  Vi har tagit emot din anmälan till
                  <strong style="color:#ffffff;">${selectedEvent}</strong>.
                </p>

                <p style="margin:0 0 24px 0; font-size:16px; line-height:1.7; color:#dddddd; font-family:Arial, sans-serif;">
                  Vi återkommer snart med bekräftelse och praktisk information.
                </p>

                <div style="margin:24px 0; padding:24px; background-color:#5a5a5a; border-radius:20px;">
                  <h2 style="margin:0 0 16px 0; font-size:18px; color:#ffffff; font-family:Arial, sans-serif;">
                    Dina uppgifter
                  </h2>

                  <table role="presentation" style="width:100%; border-collapse:collapse;">
                    <tr>
                      <td style="padding:8px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Namn</td>
                      <td style="padding:8px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">E-post</td>
                      <td style="padding:8px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Företag</td>
                      <td style="padding:8px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${company}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0; font-size:14px; color:#b7d9b2; font-family:Arial, sans-serif;">Antal deltagare</td>
                      <td style="padding:8px 0; font-size:14px; color:#ffffff; text-align:right; font-family:Arial, sans-serif;">${participants || "-"}</td>
                    </tr>
                  </table>
                </div>

                <p style="margin:0; font-size:16px; line-height:1.7; color:#dddddd; font-family:Arial, sans-serif;">
                  Vänliga hälsningar,<br />
                  <span style="color:#ffffff; font-weight:700;">AI-verkstan</span>
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <div style="margin:0; padding:0; background-color:#f4f1ea;">
          <div style="max-width:640px; margin:0 auto; padding:40px 20px;">
            <div style="background-color:#4a4a4a; border-radius:24px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.12);">
              <div style="padding:40px 32px 24px 32px; border-bottom:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#b7d9b2; font-family:Arial, sans-serif;">
                  Ny anmälan
                </p>
                <h1 style="margin:16px 0 0 0; font-size:30px; line-height:1.2; color:#ffffff; font-family:Arial, sans-serif;">
                  ${selectedEvent}
                </h1>
              </div>

              <div style="padding:32px;">
                <p style="margin:0 0 24px 0; font-size:16px; line-height:1.7; color:#dddddd; font-family:Arial, sans-serif;">
                  En ny anmälan har kommit in via formuläret.
                </p>

                <div style="padding:24px; background-color:#5a5a5a; border-radius:20px;">
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
              </div>
            </div>
          </div>
        </div>
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