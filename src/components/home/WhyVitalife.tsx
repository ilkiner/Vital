"use client";

import { motion, useReducedMotion } from "motion/react";
import { WordReveal } from "@/components/ui/WordReveal";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    az: { title: "Müasir avadanlıq",      body: "Avropa standartlarına uyğun yüksək dəqiqlikli tibbi texnologiyalar ilə diaqnostika və müalicə." },
    ru: { title: "Современное оборудование", body: "Диагностика и лечение с использованием высокоточных медицинских технологий европейского уровня." },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    az: { title: "Təcrübəli həkimlər",  body: "10+ illik iş stajına malik, xaricdə ixtisasartırma keçmiş mütəxəssislərdən ibarət komanda." },
    ru: { title: "Опытные врачи",        body: "Команда специалистов со стажем 10+ лет, прошедших международные курсы повышения квалификации." },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    az: { title: "Fərdi yanaşma",        body: "Hər pasiyentin sağlamlıq tarixçəsi, həyat tərzi və ehtiyacları nəzərə alınaraq hazırlanan müalicə planı." },
    ru: { title: "Индивидуальный подход", body: "План лечения, разработанный с учётом истории здоровья, образа жизни и потребностей каждого пациента." },
  },
];

export default function WhyVitalife({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;

  const sectionLabel = locale === "az" ? "Niyə biz?" : "Почему мы?";
  const heading = locale === "az"
    ? { first: "Niyə", colored: "VitaLife?" }
    : { first: "Почему", colored: "VitaLife?" };

  const headerAnim = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.52, ease },
      };

  const cardAnim = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.52, delay: i * 0.11, ease },
        };

  return (
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
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(79,176,198,0.25) 0%, transparent 70%)" }}
      />

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-14" {...headerAnim}>
          <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-on-dark)] mb-2">
            {sectionLabel}
          </span>
          <h2 className="font-display text-[1.75rem] md:text-[2.1rem] font-medium text-white leading-tight">
            <WordReveal text={heading.first} delay={0.05} wordClassName="text-white" />{" "}
            <span className="text-[var(--color-accent-on-dark)]">
              <WordReveal text={heading.colored} delay={0.2} wordClassName="text-[var(--color-accent-on-dark)]" />
            </span>
          </h2>
          <div className="w-8 h-[2px] bg-[#4FB0C6]/60 rounded-full mx-auto mt-3" />
        </motion.div>

        {/* Features — stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div key={i} className="group" {...cardAnim(i)}>
              <div className="relative bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 rounded-[1.25rem] p-7 h-full transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#4FB0C6]/15 flex items-center justify-center text-[var(--color-accent-on-dark)] mb-5">
                  {feature.icon}
                </div>
                <h3 className="font-display text-[1.05rem] font-medium text-white mb-3 leading-snug">
                  {feature[locale].title}
                </h3>
                <p className="text-[0.88rem] text-white/60 leading-relaxed">
                  {feature[locale].body}
                </p>
                <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-[#4FB0C6]/30 group-hover:bg-[#87CEDC]/60 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
