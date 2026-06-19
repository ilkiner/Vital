"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { WordReveal } from "@/components/ui/WordReveal";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const HYGIENE_BULLETS = [
  {
    az: "Beynəlxalq sterilizasiya standartlarına tam uyğunluq",
    ru: "Полное соответствие международным стандартам стерилизации",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    az: "Sertifikatlı tibbi avadanlıq və steril iş mühiti",
    ru: "Сертифицированное оборудование и стерильная рабочая среда",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    az: "Hər prosedurda şəffaf müalicə protokolları",
    ru: "Прозрачные протоколы лечения при каждой процедуре",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

export default function AboutClinic({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;

  const sectionLabel = locale === "az" ? "Haqqımızda" : "О клинике";
  const hygieneLabel = locale === "az" ? "Gigiyena və Standartlar" : "Гигиена и стандарты";
  const heading =
    locale === "az"
      ? { first: "Missiyamız", accent: "sağlamlığınızdır" }
      : { first: "Наша миссия —", accent: "ваше здоровье" };

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.55, delay, ease },
        };

  const bulletAnim = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x: 16 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.45, delay: 0.15 + i * 0.1, ease },
        };

  return (
    <section className="section-padding bg-soft-blue border-t border-[var(--color-border-light)]">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── LEFT: Vision ── */}
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-500)] mb-2">
                {sectionLabel}
              </span>
              <h2 className="font-display text-[1.75rem] md:text-[2.1rem] font-medium text-[var(--color-text)] leading-tight">
                <WordReveal text={heading.first} delay={0.05} />
                <br />
                <em className="not-italic text-[var(--color-primary)]">
                  <WordReveal text={heading.accent} delay={0.2} />
                </em>
              </h2>
              <div className="w-8 h-[2px] bg-[var(--color-primary-500)] rounded-full mt-3 mb-6" />
            </motion.div>

            <motion.p
              className="text-[var(--color-text-muted)] text-[1rem] leading-[1.8] max-w-[480px]"
              {...fadeUp(0.12)}
            >
              {siteConfig.about.vision[locale]}
            </motion.p>
          </div>

          {/* ── RIGHT: Hygiene & Standards ── */}
          <div>
            <motion.div {...fadeUp(0.06)}>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-500)] mb-2">
                {hygieneLabel}
              </span>
              <p className="text-[var(--color-text-muted)] text-[0.95rem] leading-relaxed mb-8">
                {siteConfig.about.hygiene[locale]}
              </p>
            </motion.div>

            <ul className="space-y-4">
              {HYGIENE_BULLETS.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4"
                  {...bulletAnim(i)}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)]">
                    {item.icon}
                  </div>
                  <p className="text-[0.9rem] text-[var(--color-text)] leading-snug pt-2.5 font-medium">
                    {item[locale]}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
