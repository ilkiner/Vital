"use client";

import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const MOCK_COLORS = [
  "linear-gradient(135deg, #EBF5FA 0%, #C2E6F0 100%)",
  "linear-gradient(135deg, #F0F8FC 0%, #D4EEF7 100%)",
  "linear-gradient(135deg, #EDF6FA 0%, #BDE4F4 100%)",
  "linear-gradient(135deg, #F5F8FA 0%, #DAEEF7 100%)",
  "linear-gradient(135deg, #E8F4FA 0%, #C8E8F5 100%)",
  "linear-gradient(135deg, #F2F8FB 0%, #D0EAF5 100%)",
];

export default function InstagramSection({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;

  if (!siteConfig.social.instagram) return null;

  const copy = {
    eyebrow: locale === "az" ? "Sosial şəbəkə" : "Социальные сети",
    heading: locale === "az" ? "Bizi izləyin" : "Подписывайтесь",
    sub: locale === "az"
      ? "Yeni müalicə metodları, həkim tövsiyələri və klinika xəbərləri üçün Instagram-da izlə."
      : "Следите за нами в Instagram, чтобы узнавать о новых методах лечения, советах врачей и новостях клиники.",
    cta: locale === "az" ? "Instagram-da izlə" : "Подписаться в Instagram",
    handle: "@vitalife.klinika",
    photoHint: locale === "az" ? "Son paylaşımlar" : "Последние публикации",
  };

  const wrapAnim = reduced ? {} : {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease },
  };

  const cellAnim = (i: number) => reduced ? {} : {
    initial: { opacity: 0, scale: 0.92 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-32px" },
    transition: { duration: 0.4, delay: 0.1 + i * 0.06, ease },
  };

  return (
    <section className="section-padding bg-[var(--color-surface-alt)] border-t border-[var(--color-border-light)]">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: CTA text ── */}
          <motion.div {...wrapAnim}>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-500)] mb-3">
              {copy.eyebrow}
            </span>

            <h2 className="font-display text-[2rem] md:text-[2.6rem] font-medium text-[var(--color-text)] leading-[1.1] mb-5">
              {copy.heading}
            </h2>

            <p className="text-[var(--color-text-muted)] text-[1rem] leading-[1.8] mb-8 max-w-[400px]">
              {copy.sub}
            </p>

            {/* Handle chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-white mb-6">
              <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
              <span className="text-[0.85rem] font-semibold text-[var(--color-text)]">
                {copy.handle}
              </span>
            </div>

            <div className="block">
              <a
                href={siteConfig.social.instagram!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #405DE6 0%, #833AB4 40%, #C13584 70%, #E1306C 100%)",
                }}
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                {copy.cta}
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Photo grid ── */}
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)] mb-4">
              {copy.photoHint}
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {MOCK_COLORS.map((bg, i) => (
                <motion.a
                  key={i}
                  href={siteConfig.social.instagram!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-xl overflow-hidden aspect-square group"
                  style={{ background: bg }}
                  {...cellAnim(i)}
                >
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-25 group-hover:opacity-50 transition-opacity duration-200">
                    <InstagramIcon className="w-7 h-7 text-[var(--color-primary)]" />
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                    style={{ background: "rgba(20,80,110,0.12)" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
