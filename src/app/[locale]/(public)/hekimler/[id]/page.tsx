import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import DoctorDetailClient from "./DoctorDetailClient";

type Doctor = {
  id: string;
  name: string;
  specialty_az: string;
  specialty_ru: string;
  bio_az: string;
  bio_ru: string;
  image_url: string | null;
  is_guest: boolean;
};

// Temporary mock data — replaced when real DB rows exist
const MOCK_DOCTORS: Doctor[] = [
  {
    id: "mock-1",
    name: "Dr. Aynur Hüseynova",
    specialty_az: "Dermatoloq",
    specialty_ru: "Дерматолог",
    bio_az:
      "Dr. Aynur Hüseynova 15 illik təcrübəsi olan tanınmış dermatoloqdur. Bakı Dövlət Tibb Universitetini fərqlənmə diplomu ilə bitirmiş, sonradan Türkiyə və Almaniyada ixtisaslaşma keçmişdir.\n\nDəri xəstəlikləri, estetik dermatoloji və lazer müalicəsi sahələrində geniş təcrübəyə malikdir. Onun yanaşması hər xəstənin fərdi ehtiyaclarını nəzərə alan kompleks müalicə metodologiyasına əsaslanır.\n\nBakı Dermatoloji Cəmiyyətinin üzvü, bir sıra beynəlxalq konfransların daimi iştirakçısıdır.",
    bio_ru:
      "Доктор Айнур Гусейнова — известный дерматолог с 15-летним опытом. Окончила Бакинский государственный медицинский университет с отличием, затем прошла специализацию в Турции и Германии.\n\nИмеет большой опыт в области кожных заболеваний, эстетической дерматологии и лазерного лечения. Её подход основан на комплексной методологии лечения с учётом индивидуальных потребностей каждого пациента.\n\nЧлен Бакинского дерматологического общества, постоянная участница ряда международных конференций.",
    image_url: null,
    is_guest: true,
  },
  {
    id: "mock-2",
    name: "Dr. Kamran Əliyev",
    specialty_az: "Kardioloq",
    specialty_ru: "Кардиолог",
    bio_az:
      "Dr. Kamran Əliyev ürək-damar sistemi xəstəlikləri üzrə 20 illik təcrübəyə malik mütəxəssisdir. Mürəkkəb kardioloji vəziyyətlərin diaqnostikası və müalicəsini həyata keçirir.\n\nXəstəni mərkəzə alan, profilaktik tibbə böyük əhəmiyyət verən müasir yanaşması ilə tanınır. Avropa Kardioloji Cəmiyyətinin üzvüdür.\n\nSon 5 ildə 300-dən çox müvəffəqiyyətli stent əməliyyatına rəhbərlik etmişdir.",
    bio_ru:
      "Доктор Камран Алиев — специалист с 20-летним опытом в области сердечно-сосудистых заболеваний. Проводит диагностику и лечение сложных кардиологических состояний.\n\nИзвестен своим современным подходом, ориентированным на пациента, с большим вниманием к профилактической медицине. Член Европейского общества кардиологов.\n\nЗа последние 5 лет руководил более чем 300 успешными стентирующими операциями.",
    image_url: null,
    is_guest: false,
  },
];

async function getDoctor(id: string): Promise<Doctor | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("doctors")
      .select(
        "id, name, specialty_az, specialty_ru, bio_az, bio_ru, image_url, is_guest"
      )
      .eq("id", id)
      .single();
    if (data) return data as Doctor;
  } catch {
    // Supabase not configured; fall through to mock data
  }
  return MOCK_DOCTORS.find((d) => d.id === id) ?? null;
}

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const doctor = await getDoctor(id);
  if (!doctor) return { title: "Həkim tapılmadı" };
  const specialty =
    locale === "ru" ? doctor.specialty_ru : doctor.specialty_az;
  return { title: `${doctor.name} — ${specialty}` };
}

export default async function DoctorDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const doctor = await getDoctor(id);
  if (!doctor) notFound();
  return (
    <DoctorDetailClient doctor={doctor} locale={locale as "az" | "ru"} />
  );
}
