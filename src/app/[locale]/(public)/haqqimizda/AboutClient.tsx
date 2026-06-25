"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { WordReveal } from "@/components/ui/WordReveal";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ── Data ────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    az: { title: "Müasir avadanlıq",        desc: "Avropa standartlarına uyğun yüksək dəqiqlikli diaqnostika texnologiyaları." },
    ru: { title: "Современное оборудование", desc: "Высокоточные диагностические технологии европейского уровня." },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    az: { title: "Sertifikatlı həkimlər",   desc: "Yerli və beynəlxalq sertifikatlara malik, mütəmadi inkişaf edən mütəxəssislər." },
    ru: { title: "Сертифицированные врачи", desc: "Специалисты с местными и международными сертификатами, постоянно развивающиеся." },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    az: { title: "Beynəlxalq gigiyena",       desc: "Hər prosedurdan sonra avtoklavlama, birdəfəlik materiallar, tam sterilizasiya." },
    ru: { title: "Международная гигиена",      desc: "Автоклавирование после каждой процедуры, одноразовые материалы, полная стерилизация." },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    az: { title: "Fərdi qayğı",         desc: "Hər pasiyentin sağlamlıq tarixçəsinə, həyat tərzinə uyğun hazırlanan müalicə planı." },
    ru: { title: "Индивидуальная забота", desc: "План лечения с учётом истории болезни и образа жизни каждого пациента." },
  },
];

const HYGIENE_BULLETS: Record<"az" | "ru", string[]> = {
  az: [
    "Hər prosedurdan sonra alət avtoklavlanması",
    "Birdəfəlik tibbi ləvazimatdan istifadə",
    "EN ISO beynəlxalq gigiyena standartına uyğunluq",
    "Otaqların antibakterial dezinfeksiyası",
  ],
  ru: [
    "Автоклавирование инструментов после каждой процедуры",
    "Использование одноразовых расходных материалов",
    "Соответствие международному стандарту EN ISO",
    "Антибактериальная дезинфекция помещений",
  ],
};

const STAFF = [
  {
    az: { name: "Dr. Nigar Məmmədova", role: "Nevroloq" },
    ru: { name: "Др. Нигяр Мамедова",  role: "Невролог" },
  },
  {
    az: { name: "Dr. Rauf Əsədov",    role: "Ortoped" },
    ru: { name: "Др. Рауф Асадов",    role: "Ортопед" },
  },
  {
    az: { name: "Günel Babayeva",      role: "Baş tibb bacısı" },
    ru: { name: "Гюнел Бабаева",       role: "Старшая медсестра" },
  },
  {
    az: { name: "Dr. Leyla Rzayeva",   role: "Endokrinoloq" },
    ru: { name: "Др. Лейла Рзаева",    role: "Эндокринолог" },
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function AboutClient({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;
  const isPhotoPlaceholder = siteConfig.chiefDoctor.imageUrl.includes("placeholder");

  const sectionAnim = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-64px" },
          transition: { duration: 0.58, delay, ease },
        };

  const cardAnim = (i: number, base = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.5, delay: base + i * 0.09, ease },
        };

  return (
    <div className="bg-[var(--color-surface-alt)]">

      {/* ── HERO ── */}
      <div className="relative bg-[var(--color-primary)] overflow-hidden">
        {/* Dot matrix */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[28rem] h-[28rem] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(79,176,198,0.22) 0%, transparent 68%)" }}
        />

        <div className="container-page relative z-10 py-16 md:py-20">
          <motion.div
            {...(reduced ? {} : {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55, ease },
            })}
          >
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-on-dark)] mb-3">
              VitaLife Klinika
            </span>
            <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-medium text-white leading-tight mb-4">
              <WordReveal
                text={locale === "az" ? "Haqqımızda" : "О нас"}
                delay={0.12}
                stagger={0.08}
                wordClassName="text-white"
              />
            </h1>
            <p className="text-white/60 text-[0.95rem] max-w-md leading-relaxed">
              {locale === "az"
                ? "Sağlamlığınızı bizimlə qurun — müasir tibb, qayğılı komanda."
                : "Стройте своё здоровье вместе с нами — современная медицина, заботливая команда."}
            </p>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="relative h-10 -mb-px">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0 40V20C360 40 720 0 1080 24C1260 36 1380 12 1440 16V40H0Z" fill="#FAFAF8" />
          </svg>
        </div>
      </div>

      {/* ── VISION ── */}
      <section className="section-padding border-b border-[var(--color-border-light)]">
        <div className="container-page max-w-3xl">
          <motion.div {...sectionAnim(0)}>
            <SectionEyebrow>
              {locale === "az" ? "Missiyamız" : "Наша миссия"}
            </SectionEyebrow>
            <h2 className="font-display text-[1.7rem] md:text-[2rem] font-medium text-[var(--color-text)] leading-snug mb-8">
              <WordReveal
                text={locale === "az"
                  ? "Klinik vizyon və dəyərlərimiz"
                  : "Видение и ценности клиники"}
                delay={0.05}
                stagger={0.06}
              />
            </h2>
          </motion.div>

          <motion.div {...sectionAnim(0.12)}>
            <div className="relative pl-6 border-l-2 border-[var(--color-primary-500)]">
              <p className="font-display text-[1.05rem] md:text-[1.15rem] text-[var(--color-primary)] italic leading-[1.75]">
                {locale === "az"
                  ? "Hər pasiyentə qayğı, etibar və yüksək standart."
                  : "Забота, доверие и высокий стандарт для каждого пациента."}
              </p>
            </div>
            <p className="mt-6 text-[0.95rem] leading-[1.9] text-[var(--color-text-muted)]">
              {siteConfig.about.vision[locale]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-padding bg-white border-b border-[var(--color-border-light)]">
        <div className="container-page">
          <motion.div className="mb-10" {...sectionAnim(0)}>
            <SectionEyebrow>{locale === "az" ? "Dəyərlərimiz" : "Наши ценности"}</SectionEyebrow>
            <h2 className="font-display text-[1.7rem] md:text-[2rem] font-medium text-[var(--color-text)] leading-snug">
              <WordReveal
                text={locale === "az" ? "Bizi fərqli edən nədir?" : "Что нас отличает?"}
                delay={0.05}
                stagger={0.06}
              />
            </h2>
            <div className="w-8 h-[2px] bg-[var(--color-primary-500)] rounded-full mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={i} {...cardAnim(i)}>
                <div className="bg-[var(--color-surface-alt)] rounded-[1.25rem] border border-[var(--color-border)] p-6 h-full hover:border-[var(--color-primary-500)] transition-colors duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)] mb-5 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-[0.93rem] text-[var(--color-text)] mb-2 leading-snug">
                    {v[locale].title}
                  </h3>
                  <p className="text-[0.83rem] text-[var(--color-text-muted)] leading-relaxed">
                    {v[locale].desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HYGIENE ── */}
      <section className="section-padding bg-[var(--color-primary)] relative overflow-hidden">
        {/* Dot pattern */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 w-80 h-80 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(79,176,198,0.2) 0%, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            {/* Left */}
            <motion.div {...sectionAnim(0)}>
              <SectionEyebrow light>
                {locale === "az" ? "Sterilizasiya & Gigiyena" : "Стерилизация и гигиена"}
              </SectionEyebrow>
              <h2 className="font-display text-[1.7rem] md:text-[2rem] font-medium text-white leading-snug mb-5">
                <WordReveal
                  text={locale === "az" ? "Beynəlxalq standartlar" : "Международные стандарты"}
                  delay={0.05}
                  stagger={0.06}
                  wordClassName="text-white"
                />
              </h2>
              <div className="w-8 h-[2px] bg-[#4FB0C6]/60 rounded-full mb-7" />
              <p className="text-[0.93rem] text-white/65 leading-[1.85]">
                {siteConfig.about.hygiene[locale]}
              </p>
            </motion.div>

            {/* Right — bullet list */}
            <motion.ul className="mt-10 lg:mt-0 space-y-4" {...sectionAnim(0.14)}>
              {HYGIENE_BULLETS[locale].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4"
                  {...cardAnim(i, 0.08)}
                >
                  <span className="flex-none mt-0.5 w-7 h-7 rounded-full bg-[#4FB0C6]/15 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--color-accent-on-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[0.9rem] text-white/80 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ── CHIEF DOCTOR ── */}
      <section className="section-padding border-b border-[var(--color-border-light)]">
        <div className="container-page">
          <motion.div className="mb-10" {...sectionAnim(0)}>
            <SectionEyebrow>
              {locale === "az" ? "Baş Həkim" : "Главный врач"}
            </SectionEyebrow>
          </motion.div>

          <motion.div
            className="bg-white rounded-[1.5rem] border border-[var(--color-border)] shadow-sm overflow-hidden lg:flex"
            {...sectionAnim(0.08)}
          >
            {/* Photo */}
            <div className="relative lg:flex-none lg:w-72 xl:w-80 bg-[var(--color-primary-muted)] min-h-[280px]">
              {isPhotoPlaceholder ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EBF5FA] to-[#D1EEF5]">
                  <div className="w-24 h-24 rounded-full bg-[var(--color-primary-light)] border-4 border-white/60 flex items-center justify-center shadow-sm">
                    <PersonIcon className="w-12 h-12 text-[var(--color-primary)]/40" />
                  </div>
                  <span className="text-[0.72rem] text-[var(--color-text-subtle)] tracking-wide">
                    {locale === "az" ? "Foto tezliklə" : "Фото скоро"}
                  </span>
                </div>
              ) : (
                <Image
                  src={siteConfig.chiefDoctor.imageUrl}
                  alt={siteConfig.chiefDoctor.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 5%" }}
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              )}
              {/* Bottom fade — hides Instagram story text overlay */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, var(--color-primary-muted))" }}
              />
              {/* Right fade for desktop layout */}
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-8 hidden lg:block"
                style={{ background: "linear-gradient(to right, transparent, white)" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 px-7 md:px-10 py-8 flex flex-col justify-center">
              <span className="inline-block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-primary-500)] mb-2">
                {siteConfig.chiefDoctor.title[locale]}
              </span>
              <h2 className="font-display text-[1.55rem] md:text-[1.75rem] font-medium text-[var(--color-text)] mb-5 leading-snug">
                {siteConfig.chiefDoctor.name}
              </h2>
              <div className="w-8 h-[2px] bg-[var(--color-primary-500)] rounded-full mb-5" />
              <p className="text-[0.9rem] leading-[1.9] text-[var(--color-text-muted)]">
                {siteConfig.chiefDoctor.bio[locale]}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STAFF ── */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <motion.div className="mb-10" {...sectionAnim(0)}>
            <SectionEyebrow>
              {locale === "az" ? "Komandamız" : "Наша команда"}
            </SectionEyebrow>
            <h2 className="font-display text-[1.7rem] md:text-[2rem] font-medium text-[var(--color-text)] leading-snug">
              <WordReveal
                text={locale === "az" ? "Kadrolu personalımız" : "Штатный персонал"}
                delay={0.05}
                stagger={0.06}
              />
            </h2>
            <div className="w-8 h-[2px] bg-[var(--color-primary-500)] rounded-full mt-3" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {STAFF.map((member, i) => (
              <motion.div key={i} {...cardAnim(i)}>
                <div className="bg-[var(--color-surface-alt)] rounded-[1.25rem] border border-[var(--color-border)] p-5 text-center hover:border-[var(--color-primary-500)] transition-colors duration-300 group">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#EBF5FA] to-[#D1EEF5] border-2 border-white shadow-sm flex items-center justify-center mb-4 group-hover:from-[#D1EEF5] group-hover:to-[#A0D8E8] transition-all duration-300">
                    <PersonIcon className="w-8 h-8 text-[var(--color-primary)]/50" />
                  </div>
                  <p className="font-semibold text-[0.85rem] text-[var(--color-text)] leading-snug">
                    {member[locale].name}
                  </p>
                  <p className="text-[0.78rem] font-medium text-[var(--color-primary-500)] mt-1">
                    {member[locale].role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionEyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className={`text-[0.68rem] font-bold uppercase tracking-[0.16em] whitespace-nowrap ${
          light ? "text-[var(--color-accent-on-dark)]" : "text-[var(--color-primary-500)]"
        }`}
      >
        {children}
      </span>
      <div
        className={`flex-1 h-px ${light ? "bg-white/10" : "bg-[var(--color-border-light)]"}`}
      />
    </div>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.9}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
