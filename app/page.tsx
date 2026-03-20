"use client";

import { FormEvent, useState } from "react";

export default function Home() {
const [selectedEvent, setSelectedEvent] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitMessage, setSubmitMessage] = useState("");
const [submitError, setSubmitError] = useState("");
const [showSuccessModal, setShowSuccessModal] = useState(false);

  function openModal(eventName: string) {
    setSelectedEvent(eventName);
    setSubmitMessage("");
    setSubmitError("");
  }

  function closeModal() {
    setSelectedEvent("");
    setSubmitMessage("");
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      selectedEvent: formData.get("selectedEvent"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      orgNumber: formData.get("orgNumber"),
      invoiceEmail: formData.get("invoiceEmail"),
      reference: formData.get("reference"),
      participants: formData.get("participants"),
      message: formData.get("message"),
    };

    try {
     const response = await fetch("/api/registrations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const rawText = await response.text();

let result: { error?: string; success?: boolean } = {};

try {
  result = JSON.parse(rawText);
} catch {
  console.error("API returned non-JSON:", rawText);
  throw new Error("Servern skickade ett oväntat svar. Kontrollera terminalen.");
}

if (!response.ok) {
  throw new Error(result.error || "Något gick fel.");
}

      form.reset();
      setSubmitMessage("");
      setSubmitError("");
      setSelectedEvent("");
      setShowSuccessModal(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Något gick fel när anmälan skulle skickas.";

      setSubmitError(message);
      setSubmitMessage("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#3f3f3f] text-white">
      <div className="mx-auto max-w-[1180px] border-x border-[#d9d9d9]">
        <section className="px-6 pb-12 pt-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl text-center">
          
          <img
  src="/logo.png"
  alt="AI-verkstan logga"
className="mx-auto mb-10 mt-4 w-[280px] sm:w-[340px] md:w-[400px]"/>

          

<h1 className="mx-auto max-w-3xl text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
  Du har börjat nosa på AI.
  <br className="hidden sm:block" />
  Nu är det dags att få affärsvärde på riktigt.
</h1>

           <p className="mx-auto mt-6 max-w-2xl text-base italic leading-7 text-[#d0d0d0] sm:text-lg md:text-xl">
  En praktisk heldag för småföretagare som vill gå från nyfiken användning
  till struktur, tidsvinst och konkret nytta i vardagen.
</p>



            
          </div>

               <section
            id="datum"
            className="mx-auto mt-20 max-w-5xl border-t border-[#5a5a5a] pt-10"
          >
          
            <h2 className="text-center text-3xl font-semibold leading-tight text-white md:text-4xl">
  Välj tillfälle
</h2>

           <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-7 text-[#e7e7e7] sm:text-lg">
  Samma innehåll vid båda tillfällena – välj det som passar din kalender.
</p>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
<div className="rounded-[24px] bg-[#444444] p-6">
                    <p className="text-2xl font-semibold text-white">
                  12 maj – Ystegårn
                </p>
                <p className="mt-2 text-base font-medium text-[#b7d9b2]">
                  AI-bootcamp för småföretagare
                </p>
                <p className="mt-4 text-base leading-7 text-[#e7e7e7]">
                  Ystegårn Café & Bistro
                </p>
                <a
                  href="https://www.ystegarncafe.se/"
                  target="_blank"
                  rel="noreferrer"
className="mt-4 inline-block text-sm font-medium text-[#d8d8d8] underline underline-offset-4"
                >
                  Läs mer om platsen
                </a>

                <button
                  type="button"
                  onClick={() => openModal("12 maj – Ystegårn")}
                  className="mt-8 w-full rounded-full bg-[#e0b41e] px-6 py-4 text-lg font-semibold text-[#2f2f2f] transition hover:opacity-95"
                >
                  Anmäl dig till 12 maj
                </button>
              </div>

<div className="rounded-[24px] border border-[#666666] bg-[#444444] p-6">
                  <p className="text-2xl font-semibold text-white">
                  20 maj – Orbaden
                </p>
                <p className="mt-2 text-base font-medium text-[#b7d9b2]">
                  AI-bootcamp för småföretagare
                </p>
                <p className="mt-4 text-base leading-7 text-[#e7e7e7]">
                  Orbaden
                </p>
                <a
                  href="https://orbaden.se/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-white underline underline-offset-4"
                >
                  Läs mer om platsen
                </a>

                <button
                  type="button"
                  onClick={() => openModal("20 maj – Orbaden")}
                  className="mt-8 w-full rounded-full bg-[#e0b41e] px-6 py-4 text-lg font-semibold text-[#2f2f2f] transition hover:opacity-95"
                >
                  Anmäl dig till 20 maj
                </button>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-4xl border-t border-[#5a5a5a] pt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
              Känner du igen dig?
            </p>
<h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
  AI är en del av din vardag.
  <br />
  Men det skapar ännu inte riktig effekt.
</h2>

            <div className="mt-8 space-y-5 text-lg leading-8 text-[#e7e7e7]">
<p>Du använder redan AI i någon form.</p>
              <p>Men i verkligheten blir det ofta så här:</p>
            </div>

           <ul className="space-y-3 text-[#e7e7e7]">
  <li>Det blir spretigt</li>
  <li>Det sparar inte så mycket tid som du hoppats</li>
  <li>Du vet att potentialen finns – men inte hur du får ut den</li>
  <li>Det saknas struktur i hur du använder AI</li>
</ul>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white">
              Det är inte du som gör fel. Du saknar bara ett sätt att använda AI
              som faktiskt fungerar i vardagen.
            </p>
          </section>

<section className="mx-auto mt-16 max-w-4xl pt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
              Förflyttningen
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
  Ett mer strukturerat sätt att arbeta
</h2>

          <p className="mt-6 text-[#e7e7e7]">
  Det här handlar inte om fler verktyg.
  <br />
  Det handlar om att arbeta på ett sätt som håller – även när tempot är högt.
</p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
<div className="rounded-[20px] bg-[#444444] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#b7d9b2]">
                  Du går från
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-[#f4f4f4]">
                  <li>• testande utan riktning</li>
                  <li>• manuellt jobb och stress</li>
                  <li>• många idéer men låg effekt</li>
                </ul>
              </div>

<div className="rounded-[20px] bg-[#444444] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#b7d9b2]">
                  Till
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-[#f4f4f4]">
                  <li>• struktur och tydlighet</li>
                  <li>• smart stöd i vardagen</li>
                  <li>• konkret affärsnytta</li>
                </ul>
              </div>
            </div>

            <ul className="mt-10 space-y-4 text-base leading-7 text-[#f4f4f4] sm:text-lg">
              <li>• Du vet exakt hur AI kan användas i din verksamhet</li>
              <li>• Du får ett konkret arbetssätt som kan spara tid direkt</li>
              <li>• Du blir tydligare i vad som faktiskt driver affär</li>
              <li>• Du börjar bygga ett digitalt stöd som faktiskt avlastar</li>
            </ul>
          </section>

<section className="mx-auto mt-20 max-w-4xl border-t border-[#5a5a5a] pt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
              Reflektioner från tidigare workshop
            </p>

           <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
  Det märks direkt i arbetet
</h2>
<p className="mt-4 text-[#cfcfcf]">
  Erfarenheter från tidigare workshops
</p>

            <div className="mt-10 space-y-5">
<blockquote className="pl-1 text-2xl italic leading-9 text-[#f4f4f4]">
                  “Min tröskel för att använda AI har sänkts rejält.”
              </blockquote>

<blockquote className="pl-1 text-2xl italic leading-9 text-[#f4f4f4]">
                  “Nu känner jag att jag faktiskt kan börja.”
              </blockquote>


<blockquote className="pl-1 text-2xl italic leading-9 text-[#f4f4f4]">
                  “Små steg kan skapa värde direkt.”
              </blockquote>

<blockquote className="pl-1 text-2xl italic leading-9 text-[#f4f4f4]">
                  “Jag ser tydligt hur vi kan spara tid.”
              </blockquote>

<blockquote className="pl-1 text-2xl italic leading-9 text-[#f4f4f4]">
                  “Vi började bygga en AI-assistent direkt.”
              </blockquote>
            </div>

            <p className="mt-8 text-lg leading-8 text-white">
              Det här är inte teori. Det är ett nytt sätt att arbeta.
            </p>
          </section>

          <section className="mx-auto mt-20 max-w-4xl border-t border-[#5a5a5a] pt-10">
           <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
  Så arbetar vi under dagen
</h2>
            <div className="mt-8 space-y-10">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Tydlighet slår volym
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#e7e7e7]">
                  Du vässar ditt budskap, ditt erbjudande och din riktning.
                  Slutar lägga tid på marknadsföring som inte ger effekt.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Bygg en smartare arbetsstruktur
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#e7e7e7]">
                  Du ser var din tid faktiskt går, vad som skapar värde och vad
                  du inte längre behöver bära själv.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white">
                  AI i praktiken
                </h3>
                <p className="mt-3 text-lg leading-8 text-[#e7e7e7]">
                  Du bygger din egen AI-assistent som fungerar som ett konkret
                  stöd i din vardag och i din verksamhet.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-4xl border-t border-[#5a5a5a] pt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
              För vem?
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
  För dig som vill ta nästa steg
</h2>
            <ul className="mt-8 space-y-4 text-base leading-7 text-[#f4f4f4] sm:text-lg">
              <li>• har testat AI men inte fått riktig effekt ännu</li>
              <li>• vill jobba smartare, inte bara mer</li>
              <li>• vill ha struktur och riktning i verksamheten</li>
              <li>• vill använda AI på ett konkret sätt i ditt eget företag</li>
            </ul>

            <p className="mt-8 text-base leading-7 text-[#cfcfcf] sm:text-lg">
              Det här är inte för dig som är helt ny och bara vill “förstå AI
              från början”.
            </p>
          </section>

          <section className="mx-auto mt-20 max-w-4xl border-t border-[#5a5a5a] pt-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
                  Praktisk information
                </p>
                <div className="mt-6 space-y-3 text-lg leading-8 text-[#f4f4f4]">
                  <p>Heldag kl. 09–17</p>
                  <p>Begränsat antal platser</p>
                  <p>Ta med egen dator</p>
                  <p>
                    För dig som har testat AI men vill få verklig nytta av det
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
                  Investering
                </p>
                <div className="mt-6 space-y-3 text-lg leading-8 text-[#f4f4f4]">
                  <p>4 495 kr exkl. moms för en person</p>
                  <p>7 495 kr exkl. moms för två personer från samma företag</p>
                </div>
              </div>
            </div>
          </section>

     

          <section className="mx-auto mt-20 max-w-4xl border-t border-[#5a5a5a] pt-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
              Trygghet
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Du är i gott sällskap
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#e7e7e7]">
              Du deltar i en liten grupp företagare som vill utveckla sina
              verksamheter, jobba smartare och ta nästa steg med AI på ett
              konkret sätt.
            </p>
          </section>
        </section>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-[#4a4a4a] px-6 pb-8 pt-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:px-8 sm:pb-10 sm:pt-8 md:px-10 md:pb-12 md:pt-10">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
  <div>
    <p className="text-sm uppercase tracking-[0.25em] text-[#b7d9b2]">
      Anmälan
    </p>

    <h2 className="mt-3 text-3xl font-semibold text-white">
      {selectedEvent}
    </h2>

    <p className="mt-4 max-w-xl text-base leading-7 text-[#dddddd]">
      Fyll i dina uppgifter så återkommer vi med bekräftelse, praktisk
      information och underlag för fakturering.
    </p>
  </div>

  <button
    type="button"
    onClick={closeModal}
    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-xl text-white transition hover:bg-white/10"
    aria-label="Stäng anmälan"
  >
    ×
  </button>
</div>

<div className="rounded-[24px] bg-black/10 px-5 py-4">
  <p className="text-sm font-medium text-[#b7d9b2]">
    Din plats är inte bekräftad ännu
  </p>
  <p className="mt-2 text-sm leading-6 text-[#dddddd]">
    När du skickar in formuläret återkommer vi personligen med bekräftelse,
    nästa steg och praktisk information.
  </p>
</div>

<form onSubmit={handleSubmit} className="mt-8 space-y-6">            <div>
                <label
                  htmlFor="selectedEvent"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Valt tillfälle
                </label>
                <input
                  id="selectedEvent"
                  name="selectedEvent"
                  type="text"
                  value={selectedEvent}
                  readOnly
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Namn
                </label>
              <input
  id="name"
  name="name"
  type="text"
  placeholder="Ditt namn"
  required
  className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
/>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  E-post
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="din@email.se"
                  required
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Telefonnummer"
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Företag
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Företagsnamn"
                  required
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

<div className="pt-2">
  <p className="text-sm uppercase tracking-[0.2em] text-[#b7d9b2]">
    Faktureringsuppgifter
  </p>
</div>

              <div>
                <label
                  htmlFor="orgNumber"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Organisationsnummer
                </label>
                <input
                  id="orgNumber"
                  name="orgNumber"
                  type="text"
                  placeholder="556123-4567"
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

              <div>
                <label
                  htmlFor="invoiceEmail"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Fakturamejl
                </label>
                <input
                  id="invoiceEmail"
                  name="invoiceEmail"
                  type="email"
                  placeholder="faktura@foretag.se"
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

              <div>
                <label
                  htmlFor="reference"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
Referens eller märkning
                </label>
                <input
                  id="reference"
                  name="reference"
                  type="text"
                  placeholder="Till exempel kostnadsställe, PO-nummer eller referensperson"
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

              <div>
                <label
                  htmlFor="participants"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Antal deltagare
                </label>
                <select
                  id="participants"
                  name="participants"
                  defaultValue="1 person"
className="w-full rounded-full border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                >
                  <option>1 person</option>
                  <option>2 personer</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#f4f4f4]"
                >
                  Meddelande
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Skriv gärna om du har frågor eller något vi behöver veta."
className="w-full rounded-[24px] border border-white/10 bg-white/95 px-5 py-4 text-base text-[#2f2f2f] outline-none transition focus:border-[#e0b41e]"
                />
              </div>

<div className="pt-2">
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full rounded-full bg-[#e0b41e] px-6 py-4 text-lg font-semibold text-[#2f2f2f] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {isSubmitting ? "Skickar anmälan..." : "Skicka anmälan"}
  </button>

  <p className="mt-4 text-center text-sm leading-6 text-[#cfcfcf]">
    Vi återkommer med bekräftelse så snart vi har tagit emot din anmälan.
  </p>

  {submitMessage && (
    <p className="mt-4 text-center text-sm leading-6 text-[#b7d9b2]">
      {submitMessage}
    </p>
  )}

  {submitError && (
    <p className="mt-4 text-center text-sm leading-6 text-[#ffb4b4]">
      {submitError}
    </p>
  )}
</div>

</form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-[#4a4a4a] p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b7d9b2]">
              Tack
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white">
              Din anmälan är skickad
            </h2>

            <p className="mt-4 text-base leading-7 text-[#dddddd]">
              Vi har tagit emot din anmälan och återkommer snart med bekräftelse
              och praktisk information.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-8 w-full rounded-full bg-[#e0b41e] px-6 py-4 text-lg font-semibold text-[#2f2f2f] transition hover:opacity-95"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </main>
  );
}