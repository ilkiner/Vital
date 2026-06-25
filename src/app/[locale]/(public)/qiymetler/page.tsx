import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { priceList } from "@/lib/pricing-data";
import PricingAccordion from "./PricingAccordion";

const totalItems = priceList.reduce((sum, cat) => sum + cat.items.length, 0);

export const metadata: Metadata = { title: "Qiymətlər" };

export default async function PricingPage() {
  const locale = (await getLocale()) as "az" | "ru";
  const contactHref = locale === "ru" ? "/ru/elaqe" : "/elaqe";

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
            {locale === "az" ? "Qiymət Cədvəli" : "Прайс-лист"}
          </h1>
          <p className="mt-3 text-sm text-white/60 max-w-lg">
            {locale === "az"
              ? "Bütün qiymətlər ₼ (AZN) ilə göstərilib. Ətraflı məlumat üçün bizimlə əlaqə saxlayın."
              : "Все цены указаны в ₼ (AZN). Для получения подробной информации свяжитесь с нами."}
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
        <div className="container-page max-w-3xl">
          {/* Stat chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              {
                label: locale === "az" ? "Analiz növü" : "Видов анализов",
                value: totalItems,
              },
              {
                label: locale === "az" ? "Kateqoriya" : "Категорий",
                value: priceList.length,
              },
              {
                label: locale === "az" ? "Nəticə müddəti" : "Срок результата",
                value: locale === "az" ? "1–3 gün" : "1–3 дня",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 bg-white border border-[var(--color-border)] rounded-2xl px-4 py-3"
              >
                <span className="font-bold text-[1.1rem] tabular-nums" style={{ color: "var(--color-primary)" }}>
                  {stat.value}
                </span>
                <span className="text-[0.78rem] text-[var(--color-text-muted)]">{stat.label}</span>
              </div>
            ))}
          </div>

          <PricingAccordion
            categories={priceList}
            locale={locale}
            contactHref={contactHref}
          />

          <p className="text-[0.78rem] text-[var(--color-text-muted)] text-center pt-8">
            {locale === "az"
              ? "* Qiymətlər müayinə nəticəsinə əsasən dəyişə bilər. Dəqiq məbləğ üçün klinikaya müraciət edin."
              : "* Цены могут изменяться в зависимости от результатов осмотра. За точной суммой обращайтесь в клинику."}
          </p>
        </div>
      </div>
    </div>
  );
}
