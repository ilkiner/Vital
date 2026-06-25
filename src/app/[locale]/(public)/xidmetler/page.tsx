import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { FALLBACK_SERVICES } from "@/lib/fallback-data";
import ServicesAccordion from "./ServicesAccordion";

export const metadata: Metadata = { title: "Xidmətlər" };

type Service = {
  id: string;
  title_az: string;
  title_ru: string;
  description_az: string | null;
  description_ru: string | null;
  is_guest_service: boolean;
};

async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("services")
      .select("id, title_az, title_ru, description_az, description_ru, is_guest_service")
      .order("title_az");
    if (data && data.length > 0) return data as Service[];
  } catch {}
  return FALLBACK_SERVICES;
}

export default async function ServicesPage() {
  const locale = (await getLocale()) as "az" | "ru";
  const services = await getServices();

  const permanent = services.filter((s) => !s.is_guest_service);
  const guest     = services.filter((s) =>  s.is_guest_service);

  const permanentLabel = locale === "az" ? "Daimi xidmətlər"            : "Постоянные услуги";
  const guestLabel     = locale === "az" ? "Bakıdan gələn qonaq həkimlər" : "Приглашённые врачи из Баку";

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
            {locale === "az" ? "Xidmətlərimiz" : "Наши услуги"}
          </h1>
          <p className="mt-3 text-sm text-white/60 max-w-lg">
            {locale === "az"
              ? "Müasir avadanlıq və yüksək ixtisaslı mütəxəssislərlə geniş tibbi xidmətlər"
              : "Широкий спектр медицинских услуг с современным оборудованием и высококвалифицированными специалистами"}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0 40V20C360 40 720 0 1080 24C1260 36 1380 12 1440 16V40H0Z" fill="#FAFAF8" />
          </svg>
        </div>
      </div>

      <div className="bg-[var(--color-surface-alt)] section-padding">
        <div className="container-page max-w-3xl space-y-12">

          {/* Daimi xidmətlər */}
          {permanent.length > 0 && (
            <section>
              <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-text)] mb-6">
                {permanentLabel}
              </h2>
              <ServicesAccordion services={permanent} locale={locale} />
            </section>
          )}

          {/* Qonaq həkim xidmətləri */}
          {guest.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-text)]">
                  {guestLabel}
                </h2>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide bg-[var(--color-primary-muted)] text-[var(--color-primary)]">
                  {locale === "az" ? "Qonaq" : "Гость"}
                </span>
              </div>
              <ServicesAccordion services={guest} locale={locale} />
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
