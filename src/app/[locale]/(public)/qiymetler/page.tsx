import { getLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export const metadata: Metadata = { title: "Qiymətlər" };

type PricingRow = {
  id: string;
  treatment_name_az: string;
  treatment_name_ru: string;
  price: string | null;
  services: {
    title_az: string;
    title_ru: string;
  } | null;
};

type GroupedPricing = {
  serviceTitle: string;
  rows: Array<{ id: string; name: string; price: string | null }>;
};

const MOCK_PRICING: PricingRow[] = [
  { id: "p1",  treatment_name_az: "İlkin müayinə",           treatment_name_ru: "Первичный осмотр",               price: "40 ₼",  services: { title_az: "Dermatoloji Müayinə",    title_ru: "Дерматологическое обследование" } },
  { id: "p2",  treatment_name_az: "Dermatoskopiya",          treatment_name_ru: "Дерматоскопия",                  price: "60 ₼",  services: { title_az: "Dermatoloji Müayinə",    title_ru: "Дерматологическое обследование" } },
  { id: "p3",  treatment_name_az: "Lazer müalicəsi",         treatment_name_ru: "Лазерное лечение",               price: null,    services: { title_az: "Dermatoloji Müayinə",    title_ru: "Дерматологическое обследование" } },
  { id: "p4",  treatment_name_az: "Kardioloq müayinəsi",     treatment_name_ru: "Консультация кардиолога",        price: "50 ₼",  services: { title_az: "Kardioloji Xidmətlər",   title_ru: "Кардиологические услуги" } },
  { id: "p5",  treatment_name_az: "EKQ",                     treatment_name_ru: "ЭКГ",                            price: "25 ₼",  services: { title_az: "Kardioloji Xidmətlər",   title_ru: "Кардиологические услуги" } },
  { id: "p6",  treatment_name_az: "ExoKQ (EXO)",             treatment_name_ru: "Эхокардиография (ЭхоКГ)",       price: "80 ₼",  services: { title_az: "Kardioloji Xidmətlər",   title_ru: "Кардиологические услуги" } },
  { id: "p7",  treatment_name_az: "Holter monitorinq",       treatment_name_ru: "Холтер-мониторирование",         price: "120 ₼", services: { title_az: "Kardioloji Xidmətlər",   title_ru: "Кардиологические услуги" } },
  { id: "p8",  treatment_name_az: "Nevroloji müayinə",       treatment_name_ru: "Неврологическая консультация",   price: "50 ₼",  services: { title_az: "Nevroloji Müalicə",       title_ru: "Неврологическое лечение" } },
  { id: "p9",  treatment_name_az: "EEQ",                     treatment_name_ru: "ЭЭГ",                            price: "70 ₼",  services: { title_az: "Nevroloji Müalicə",       title_ru: "Неврологическое лечение" } },
  { id: "p10", treatment_name_az: "ENMQ",                    treatment_name_ru: "ЭНМГ",                           price: "90 ₼",  services: { title_az: "Nevroloji Müalicə",       title_ru: "Неврологическое лечение" } },
  { id: "p11", treatment_name_az: "Ortoped konsultasiyası",  treatment_name_ru: "Консультация ортопеда",          price: "50 ₼",  services: { title_az: "Ortopedik Xidmətlər",    title_ru: "Ортопедические услуги" } },
  { id: "p12", treatment_name_az: "PRP terapiyası",          treatment_name_ru: "PRP-терапия",                    price: null,    services: { title_az: "Ortopedik Xidmətlər",    title_ru: "Ортопедические услуги" } },
];

async function getPricing(): Promise<PricingRow[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("pricing")
      .select("id, treatment_name_az, treatment_name_ru, price, services(title_az, title_ru)")
      .order("treatment_name_az");
    if (data && data.length > 0) return data as unknown as PricingRow[];
  } catch {}
  return MOCK_PRICING;
}

function groupPricing(rows: PricingRow[], locale: "az" | "ru"): GroupedPricing[] {
  const map = new Map<string, GroupedPricing>();
  for (const row of rows) {
    const svcTitle =
      locale === "az"
        ? (row.services?.title_az ?? "Digər")
        : (row.services?.title_ru ?? "Прочее");
    if (!map.has(svcTitle)) {
      map.set(svcTitle, { serviceTitle: svcTitle, rows: [] });
    }
    map.get(svcTitle)!.rows.push({
      id: row.id,
      name: locale === "az" ? row.treatment_name_az : row.treatment_name_ru,
      price: row.price,
    });
  }
  return Array.from(map.values());
}

export default async function PricingPage() {
  const locale = (await getLocale()) as "az" | "ru";
  const pricingRows = await getPricing();
  const groups = groupPricing(pricingRows, locale);

  const contactHref = locale === "ru" ? "/ru/elaqe" : "/elaqe";
  const askPrice = locale === "az" ? "Qiymət üçün soruşun" : "Спросите цену";
  const askBtn = locale === "az" ? "Soruş" : "Узнать";

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
        <div className="container-page max-w-3xl space-y-10">
          {groups.map((group) => (
            <section key={group.serviceTitle}>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-primary-500)] whitespace-nowrap">
                  {group.serviceTitle}
                </span>
                <div className="flex-1 h-px bg-[var(--color-border-light)]" />
              </div>

              {/* Table card */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
                {group.rows.map((row, i) => (
                  <div
                    key={row.id}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i < group.rows.length - 1 ? "border-b border-[var(--color-border-light)]" : ""
                    }`}
                  >
                    <span className="text-[0.9rem] text-[var(--color-text)] flex-1 pr-4">
                      {row.name}
                    </span>
                    <div className="flex items-center gap-3 flex-none">
                      {row.price ? (
                        <span className="font-semibold text-[var(--color-primary)] tabular-nums text-[0.9rem]">
                          {row.price}
                        </span>
                      ) : (
                        <span className="text-[0.8rem] text-[var(--color-text-subtle)] italic">
                          {askPrice}
                        </span>
                      )}
                      <Link
                        href={contactHref}
                        className="px-3 py-1.5 rounded-full bg-[var(--color-primary-muted)] text-[var(--color-primary)] text-[0.75rem] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200 whitespace-nowrap"
                      >
                        {askBtn}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Bottom note */}
          <p className="text-[0.78rem] text-[var(--color-text-muted)] text-center pt-2">
            {locale === "az"
              ? "* Qiymətlər müayinə nəticəsinə əsasən dəyişə bilər. Dəqiq məbləğ üçün klinikaya müraciət edin."
              : "* Цены могут изменяться в зависимости от результатов осмотра. За точной суммой обращайтесь в клинику."}
          </p>
        </div>
      </div>
    </div>
  );
}
