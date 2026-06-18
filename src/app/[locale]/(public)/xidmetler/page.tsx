import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import ServicesAccordion from "./ServicesAccordion";

export const metadata: Metadata = { title: "Xidmətlər" };

type Service = {
  id: string;
  title_az: string;
  title_ru: string;
  description_az: string | null;
  description_ru: string | null;
};

const MOCK_SERVICES: Service[] = [
  {
    id: "s1",
    title_az: "Dermatoloji Müayinə",
    title_ru: "Дерматологическое обследование",
    description_az:
      "Dərinin, dırnaqların və saçların hərtərəfli müayinəsi. Dermatoskopiya, biopsi, lazer müalicəsi və estetik dermatoloji prosedurlar. Akne, ekzema, psoriaz, xəbənlik kimi dərmatoz xəstəliklərin diaqnostikası və müalicəsi.",
    description_ru:
      "Комплексное обследование кожи, ногтей и волос. Дерматоскопия, биопсия, лазерное лечение и эстетические дерматологические процедуры. Диагностика и лечение дерматозов: акне, экзема, псориаз, депигментация.",
  },
  {
    id: "s2",
    title_az: "Kardioloji Xidmətlər",
    title_ru: "Кардиологические услуги",
    description_az:
      "Ürək-damar sisteminin tam diaqnostikası: EKQ, ExoKQ, Holter monitorinq, stress testlər. Hipertansiyon, ürək çatışmazlığı, aritmiya və koronar xəstəliklərin müalicəsi. Kardiovaskulyar riski qiymətləndirmə proqramları.",
    description_ru:
      "Полная диагностика сердечно-сосудистой системы: ЭКГ, ЭхоКГ, холтеровское мониторирование, стресс-тесты. Лечение гипертонии, сердечной недостаточности, аритмий и коронарной болезни. Программы оценки кардиоваскулярного риска.",
  },
  {
    id: "s3",
    title_az: "Nevroloji Müalicə",
    title_ru: "Неврологическое лечение",
    description_az:
      "Baş ağrısı, migren, baş gicəllənməsi, yuxu pozğunluqları, osteoxondroz, polineyropatiya kimi nevroloji xəstəliklərin diaqnostikası. MRT, ENMQ, EEQ, doppler müayinəsi. Beyinqan damarlarının vəziyyətinin qiymətləndirilməsi.",
    description_ru:
      "Диагностика неврологических заболеваний: головная боль, мигрень, головокружение, нарушения сна, остеохондроз, полинейропатия. МРТ, ЭНМГ, ЭЭГ, допплерография. Оценка состояния сосудов головного мозга.",
  },
  {
    id: "s4",
    title_az: "Ortopedik Xidmətlər",
    title_ru: "Ортопедические услуги",
    description_az:
      "Oynaq və əzələ-skelet sisteminin xəstəlikləri: artrit, artrozlar, omurğa pozğunluqları, spor zədələri. Fizioterapiya, blokadalar, PRP terapiyası. Postoperativ reabilitasiya proqramları.",
    description_ru:
      "Заболевания суставов и опорно-двигательного аппарата: артрит, артроз, патологии позвоночника, спортивные травмы. Физиотерапия, блокады, PRP-терапия. Программы послеоперационной реабилитации.",
  },
  {
    id: "s5",
    title_az: "Endokrinoloji Xidmətlər",
    title_ru: "Эндокринологические услуги",
    description_az:
      "Şəkərli diabet, tiroid bez xəstəlikləri, endokrin sistemin pozğunluqları, piylənmə, osteoporoz. Hormonal profil müayinəsi, hormon müalicəsi, metabolik sindromun korreksiyası.",
    description_ru:
      "Сахарный диабет, заболевания щитовидной железы, нарушения эндокринной системы, ожирение, остеопороз. Исследование гормонального профиля, гормональная терапия, коррекция метаболического синдрома.",
  },
];

async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("services")
      .select("id, title_az, title_ru, description_az, description_ru")
      .order("title_az");
    if (data && data.length > 0) return data as Service[];
  } catch {}
  return MOCK_SERVICES;
}

export default async function ServicesPage() {
  const locale = (await getLocale()) as "az" | "ru";
  const services = await getServices();

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
        <div className="container-page max-w-3xl">
          <ServicesAccordion services={services} locale={locale} />
        </div>
      </div>
    </div>
  );
}
