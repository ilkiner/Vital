"use server";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const preference = String(formData.get("preference") ?? "").trim();

  if (!name || !phone || !message) {
    return { status: "error", message: "Zəhmət olmasa bütün məcburi sahələri doldurun." };
  }

  const prefLabel =
    preference === "whatsapp"
      ? "WhatsApp vasitəsilə cavab almaq istəyir"
      : "E-poçt ilə cavab almaq istəyir";

  const emailBody = `
ƏLAQƏ FORMU — VitaLife Klinika
================================
TERCİH: ${prefLabel}
================================

Ad Soyad : ${name}
Telefon  : ${phone}
E-poçt   : ${email || "—"}

Mesaj:
${message}
  `.trim();

  try {
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "info@vitalife.az";

    if (RESEND_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from: "VitaLife Klinika <noreply@vitalife.az>",
          to: [TO_EMAIL],
          subject: `Yeni müraciət: ${name} (${preference === "whatsapp" ? "WhatsApp" : "E-poçt"})`,
          text: emailBody,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    }
    // If no RESEND_KEY configured, silently succeed (dev mode)
    return { status: "success" };
  } catch (err) {
    console.error("Contact form error:", err);
    return { status: "error", message: "Göndərmə zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin." };
  }
}
