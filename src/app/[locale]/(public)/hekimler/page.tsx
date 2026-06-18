import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export const metadata: Metadata = { title: "Həkimlər" };

type Doctor = {
  id: string;
  name: string;
  specialty_az: string;
  specialty_ru: string;
  image_url: string | null;
  is_guest: boolean;
  is_featured_this_week: boolean;
};

const MOCK_DOCTORS: Doctor[] = [
  { id: "mock-1", name: "Dr. Aynur Hüseynova",  specialty_az: "Dermatoloq",  specialty_ru: "Дерматолог",  image_url: null, is_guest: true,  is_featured_this_week: true  },
  { id: "mock-2", name: "Dr. Kamran Əliyev",     specialty_az: "Kardioloq",   specialty_ru: "Кардиолог",   image_url: null, is_guest: false, is_featured_this_week: false },
  { id: "mock-3", name: "Dr. Nigar Məmmədova",   specialty_az: "Nevroloq",    specialty_ru: "Невролог",    image_url: null, is_guest: false, is_featured_this_week: true  },
  { id: "mock-4", name: "Dr. Rauf Əsədov",       specialty_az: "Ortoped",     specialty_ru: "Ортопед",     image_url: null, is_guest: true,  is_featured_this_week: false },
  { id: "mock-5", name: "Dr. Leyla Rzayeva",     specialty_az: "Endokrinoloq",specialty_ru: "Эндокринолог",image_url: null, is_guest: false, is_featured_this_week: false },
  { id: "mock-6", name: "Dr. Tural Həsənov",     specialty_az: "Cərrah",      specialty_ru: "Хирург",      image_url: null, is_guest: false, is_featured_this_week: false },
];

async function getAllDoctors(): Promise<Doctor[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("doctors")
      .select("id, name, specialty_az, specialty_ru, image_url, is_guest, is_featured_this_week")
      .order("name");
    if (data && data.length > 0) return data as Doctor[];
  } catch {}
  return MOCK_DOCTORS;
}

export default async function DoctorsPage() {
  const locale = (await getLocale()) as "az" | "ru";
  const doctors = await getAllDoctors();

  const guestDoctors = doctors.filter((d) => d.is_guest);
  const staffDoctors = doctors.filter((d) => !d.is_guest);

  function doctorHref(id: string) {
    return locale === "ru" ? `/ru/hekimler/${id}` : `/hekimler/${id}`;
  }

  return (
    <div>
      {/* Page header */}
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
            {locale === "az" ? "Həkimlərimiz" : "Наши врачи"}
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
        <div className="container-page space-y-16">

          {/* Guest / davetli həkimlər */}
          {guestDoctors.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-primary-500)]">
                  {locale === "az" ? "Dəvətli həkimlər" : "Приглашённые врачи"}
                </span>
                <div className="flex-1 h-px bg-[var(--color-border-light)]" />
              </div>
              <DoctorGrid doctors={guestDoctors} locale={locale} doctorHref={doctorHref} />
            </section>
          )}

          {/* Daimi heyət */}
          {staffDoctors.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-primary-500)]">
                  {locale === "az" ? "Daimi heyət" : "Постоянный персонал"}
                </span>
                <div className="flex-1 h-px bg-[var(--color-border-light)]" />
              </div>
              <DoctorGrid doctors={staffDoctors} locale={locale} doctorHref={doctorHref} />
            </section>
          )}

        </div>
      </div>
    </div>
  );
}

function DoctorGrid({
  doctors,
  locale,
  doctorHref,
}: {
  doctors: Doctor[];
  locale: "az" | "ru";
  doctorHref: (id: string) => string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {doctors.map((doctor) => (
        <Link key={doctor.id} href={doctorHref(doctor.id)} className="group">
          <div className="bg-white rounded-[1.25rem] overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary-500)] hover:shadow-md transition-all duration-250">
            {/* Photo */}
            <div className="relative bg-[var(--color-primary-muted)] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              {doctor.image_url ? (
                <Image src={doctor.image_url} alt={doctor.name} fill className="object-cover object-top" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PersonIcon className="w-16 h-16 text-[var(--color-primary-light)] opacity-60" />
                </div>
              )}
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(245,248,250,0.6) 100%)" }} />
              {doctor.is_guest && (
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[var(--color-primary)] text-white text-[0.62rem] font-semibold rounded-full tracking-wide">
                  {locale === "az" ? "Dəvətli" : "Гость"}
                </span>
              )}
              {doctor.is_featured_this_week && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[var(--color-primary-500)]" title={locale === "az" ? "Bu həftə" : "Эта неделя"} />
              )}
            </div>
            {/* Info */}
            <div className="px-4 pt-3.5 pb-4">
              <p className="font-semibold text-[0.88rem] text-[var(--color-text)] leading-snug">{doctor.name}</p>
              <p className="text-[0.78rem] font-medium text-[var(--color-primary-500)] mt-0.5">
                {locale === "az" ? doctor.specialty_az : doctor.specialty_ru}
              </p>
              <div className="flex items-center gap-1 mt-3 text-[0.75rem] font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                <span>{locale === "az" ? "Ətraflı" : "Подробнее"}</span>
                <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
