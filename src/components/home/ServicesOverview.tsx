"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";
import { WordReveal } from "@/components/ui/WordReveal";

type Service = {
  id: string;
  title_az: string;
  title_ru: string;
  description_az: string | null;
  description_ru: string | null;
};

type Props = { services: Service[] };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICE_ICONS = [
  <svg key="heart" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
  <svg key="brain" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
  <svg key="eye" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  <svg key="flask" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>,
];

export default function ServicesOverview({ services }: Props) {
  const locale = useLocale() as "az" | "ru";
  const reduced = useReducedMotion() ?? false;

  const servicesHref = locale === "ru" ? "/ru/xidmetler" : "/xidmetler";
  const allLabel    = locale === "az" ? "Bütün xidmətlər" : "Все услуги";
  const sectionLabel = locale === "az" ? "Nə edirik" : "Что мы делаем";

  const displayed = services.slice(0, 4);

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
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.48, delay: i * 0.1, ease },
        };

  return (
    <section className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-page">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4"
          {...headerAnim}
        >
          <div>
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-500)] mb-2">
              {sectionLabel}
            </span>
            <h2 className="font-display text-[1.75rem] md:text-[2.1rem] font-medium text-[var(--color-text)] leading-tight">
              {locale === "az" ? (
                <WordReveal text="Xidmətlərimiz" delay={0.05} />
              ) : (
                <>
                  <WordReveal text="Наши" delay={0.05} />{" "}
                  <em className="not-italic text-[var(--color-primary)]">
                    <WordReveal text="услуги" delay={0.18} />
                  </em>
                </>
              )}
            </h2>
            <div className="w-8 h-[2px] bg-[var(--color-primary-500)] rounded-full mt-3" />
          </div>
          <Link
            href={servicesHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-600)] transition-colors duration-200 group"
          >
            {allLabel}
            <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Cards grid — stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayed.map((svc, i) => (
            <motion.div key={svc.id} {...cardAnim(i)}>
              <Link href={servicesHref}>
                <motion.div
                  className="bg-white rounded-[1.25rem] border border-[var(--color-border)] p-6 h-full group cursor-pointer"
                  whileHover={reduced ? {} : { y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
                >
                  <div className="w-10 h-10 rounded-[10px] bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)] mb-5 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-200">
                    {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                  </div>
                  <h3 className="font-semibold text-[0.95rem] text-[var(--color-text)] mb-2 leading-snug">
                    {locale === "az" ? svc.title_az : svc.title_ru}
                  </h3>
                  {(locale === "az" ? svc.description_az : svc.description_ru) && (
                    <p className="text-[0.83rem] text-[var(--color-text-muted)] leading-relaxed">
                      {(locale === "az" ? svc.description_az : svc.description_ru)?.slice(0, 90)}
                      {((locale === "az" ? svc.description_az : svc.description_ru)?.length ?? 0) > 90 ? "…" : ""}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-4 text-[0.78rem] font-medium text-[var(--color-text-subtle)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                    <span>{locale === "az" ? "Ətraflı" : "Подробнее"}</span>
                    <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
