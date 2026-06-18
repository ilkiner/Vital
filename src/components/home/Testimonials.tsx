"use client";

import { motion, useReducedMotion } from "motion/react";
import { WordReveal } from "@/components/ui/WordReveal";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const TESTIMONIALS = [
  {
    az: {
      quote: "VitaLife-da aldığım xidmət gözləntilərimи tamamilə üstələdi. Həkimlər həm peşəkar, həm də çox qayğıkeş idi. Artıq bütün ailəmi buraya gətirim.",
      name: "Aytən M.",
      role: "Pasiyent",
    },
    ru: {
      quote: "Сервис в VitaLife полностью превзошёл мои ожидания. Врачи профессиональны и очень внимательны. Теперь привожу сюда всю семью.",
      name: "Айтен М.",
      role: "Пациент",
    },
  },
  {
    az: {
      quote: "Çox səliqəli, təmiz, intizamlı klinika. Diaqnostika nəticələrimi ətraflı izah etdilər, narahatlığım aradan qalxdı. Qəti tövsiyə edirəm.",
      name: "Rauf Ə.",
      role: "Pasiyent",
    },
    ru: {
      quote: "Очень аккуратная, чистая и организованная клиника. Подробно объяснили результаты диагностики — волнение прошло. Рекомендую однозначно.",
      name: "Рауф Э.",
      role: "Пациент",
    },
  },
  {
    az: {
      quote: "İlk dəfədir belə qayğılı tibb mühiti görürəm. Gözləmə müddəti yox, ünsiyyət mükəmməl. VitaLife artıq ailəmizin klinkasıdır.",
      name: "Leyla H.",
      role: "Pasiyent",
    },
    ru: {
      quote: "Впервые вижу такую заботливую медицинскую среду. Нет ожидания, общение на высшем уровне. VitaLife теперь клиника всей нашей семьи.",
      name: "Лейла Г.",
      role: "Пациент",
    },
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#B8975A">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;

  const label   = locale === "az" ? "Pasiyentlərimiz" : "Наши пациенты";
  const heading = locale === "az"
    ? { first: "Onlar", accent: "danışır" }
    : { first: "Они", accent: "говорят" };

  const headerAnim = reduced ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.52, ease },
  };

  const cardAnim = (i: number) => reduced ? {} : {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, delay: i * 0.12, ease },
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "#000B33" }}
    >
      {/* Dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top gold rule */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #B8975A 30%, #B8975A 70%, transparent)",
          opacity: 0.5,
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(79,176,198,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-14" {...headerAnim}>
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#B8975A" }}>
            {label}
          </span>
          <h2 className="font-display text-[1.75rem] md:text-[2.25rem] font-medium leading-tight text-white">
            <WordReveal text={heading.first} delay={0.05} wordClassName="text-white" />{" "}
            <em className="not-italic" style={{ color: "var(--color-accent-on-dark)" }}>
              <WordReveal text={heading.accent} delay={0.2} wordClassName="" />
            </em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => {
            const content = t[locale];
            const initials = content.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
            return (
              <motion.div key={i} {...cardAnim(i)}>
                <div
                  className="h-full rounded-[1.25rem] p-7 flex flex-col"
                  style={{
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <StarRow />

                  <p className="text-white/75 text-[0.92rem] leading-[1.75] flex-1 mb-6">
                    "{content.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    {/* Avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display font-medium text-[0.75rem] text-white"
                      style={{ background: "rgba(79,176,198,0.25)" }}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="text-white text-[0.85rem] font-semibold leading-tight">
                        {content.name}
                      </p>
                      <p className="text-white/45 text-[0.75rem] mt-0.5">
                        {content.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
