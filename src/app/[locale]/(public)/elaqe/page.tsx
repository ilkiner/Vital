import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Əlaqə" };

export default async function ContactPage() {
  const locale = (await getLocale()) as "az" | "ru";

  return (
    <div>
      {/* Header */}
      <div className="bg-[var(--color-primary)] relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="container-page relative z-10 py-14 md:py-16">
          <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-500)] mb-2">
            VitaLife Klinika
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-white">
            {locale === "az" ? "Bizimlə Əlaqə" : "Связаться с нами"}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0 40V20C360 40 720 0 1080 24C1260 36 1380 12 1440 16V40H0Z" fill="#FAFAF8" />
          </svg>
        </div>
      </div>

      <div className="bg-[var(--color-surface-alt)] section-padding">
        <div className="container-page max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT — Info */}
            <div className="space-y-8">

              {/* Contact details */}
              <section>
                <SectionLabel>{locale === "az" ? "Əlaqə məlumatları" : "Контактные данные"}</SectionLabel>
                <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm divide-y divide-[var(--color-border-light)]">
                  <ContactItem icon={<PhoneIcon />}>
                    <div className="flex flex-col gap-0.5">
                      <a href={`tel:${siteConfig.contact.phone}`}
                        className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200">
                        {siteConfig.contact.phone}
                      </a>
                      <a href={`tel:${siteConfig.contact.mobile}`}
                        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200">
                        {siteConfig.contact.mobile}
                      </a>
                    </div>
                  </ContactItem>
                  <ContactItem icon={<WhatsAppIcon />}>
                    <a href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                      target="_blank" rel="noopener noreferrer"
                      className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200">
                      {siteConfig.contact.mobile}
                    </a>
                  </ContactItem>
                  <ContactItem icon={<EmailIcon />}>
                    <a href={`mailto:${siteConfig.contact.email}`}
                      className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200">
                      {siteConfig.contact.email}
                    </a>
                  </ContactItem>
                  <ContactItem icon={<MapPinIcon />}>
                    <p className="text-[0.88rem] text-[var(--color-text-muted)] leading-relaxed">
                      {siteConfig.contact.address[locale]}
                    </p>
                  </ContactItem>
                </div>
              </section>

              {/* Hours */}
              <section>
                <SectionLabel>{locale === "az" ? "İş saatları" : "Часы работы"}</SectionLabel>
                <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
                  {siteConfig.hours.map((row, i) => {
                    const isClosed = row.time.includes("Bağlı") || row.time.includes("Закрыто");
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-5 py-4 ${
                          i < siteConfig.hours.length - 1 ? "border-b border-[var(--color-border-light)]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full flex-none ${isClosed ? "bg-red-300" : "bg-[var(--color-primary-500)]"}`} />
                          <span className="text-[0.88rem] font-medium text-[var(--color-text)]">
                            {locale === "az" ? row.az : row.ru}
                          </span>
                        </div>
                        <span className={`text-[0.85rem] font-semibold tabular-nums ${isClosed ? "text-[var(--color-text-muted)]" : "text-[var(--color-primary-600)]"}`}>
                          {row.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Map */}
              <section>
                <SectionLabel>{locale === "az" ? "Xəritə" : "Карта"}</SectionLabel>
                <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm bg-[var(--color-primary-muted)] flex items-center justify-center" style={{ height: 220 }}>
                  {siteConfig.googleMapsEmbedUrl.includes("PLACEHOLDER") ? (
                    <div className="text-center px-6">
                      <MapPinIcon className="w-8 h-8 text-[var(--color-primary-500)] mx-auto mb-2 opacity-60" />
                      <p className="text-[0.8rem] text-[var(--color-text-muted)]">
                        {siteConfig.contact.address[locale]}
                      </p>
                    </div>
                  ) : (
                    <iframe
                      src={siteConfig.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="VitaLife Klinika xəritə"
                    />
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT — Form */}
            <div>
              <SectionLabel>{locale === "az" ? "Mesaj göndərin" : "Написать нам"}</SectionLabel>
              <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
                <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-500) 100%)" }} />
                <div className="px-6 md:px-8 py-7">
                  <ContactForm locale={locale} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-primary-500)] whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-[var(--color-border-light)]" />
    </div>
  );
}

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 px-5 py-4">
      <div className="flex-none w-9 h-9 rounded-full bg-[var(--color-primary-muted)] flex items-center justify-center text-[var(--color-primary)]">
        {icon}
      </div>
      <div className="flex-1 pt-1.5">{children}</div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
