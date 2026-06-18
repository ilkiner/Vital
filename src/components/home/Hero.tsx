"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { WordReveal } from "@/components/ui/WordReveal";
import { CountUp } from "@/components/ui/CountUp";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const STATS: { n: string; az: string; ru: string }[] = [
  { n: "10+",    az: "İl təcrübə",     ru: "Лет опыта"       },
  { n: "5 000+", az: "Pasiyent",        ru: "Пациентов"       },
  { n: "20+",    az: "Mütəxəssis",      ru: "Специалистов"    },
];

export default function Hero({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["0%", "-12%"]
  );

  const ctaHref     = locale === "ru" ? "/ru/elaqe" : "/elaqe";
  const ctaLabel    = locale === "az" ? "Bizimlə Əlaqə" : "Связаться с нами";
  const eyebrow     = locale === "az" ? "Premium Tibb Klinikası · Bakı" : "Частная медицинская клиника · Баку";

  const titleParts =
    locale === "az"
      ? { first: "Sağlamlığınız", italic: "etibarlı əllərdə" }
      : { first: "Ваше здоровье в", italic: "надёжных руках" };

  // Shared conditional animation helpers
  const fadeInX = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.55, delay, ease } };

  const fadeInY = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay, ease } };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col bg-[var(--color-surface-alt)] overflow-hidden"
    >
      {/* Radial glow — right side decoration */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 78% 45%, color-mix(in srgb, var(--color-primary) 8%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="container-page flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-0 py-20 md:py-0">
        {/* ── LEFT: Text ── */}
        <div className="flex-1 flex flex-col justify-center md:pr-12 lg:pr-20 text-center md:text-left z-10">

          {/* Eyebrow */}
          <motion.span
            className="inline-block mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary-500)]"
            {...fadeInY(0)}
          >
            {eyebrow}
          </motion.span>

          {/* Heading — word-by-word reveal */}
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-medium leading-[1.1] text-[var(--color-text)] mb-6">
            <WordReveal
              text={titleParts.first}
              delay={0.1}
              stagger={0.07}
              duration={0.6}
            />
            <br />
            <em className="not-italic text-[var(--color-primary)]">
              <WordReveal
                text={titleParts.italic}
                delay={0.3}
                stagger={0.07}
                duration={0.6}
              />
            </em>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-[var(--color-text-muted)] text-[1.0625rem] leading-relaxed mb-9 max-w-[420px] mx-auto md:mx-0"
            {...fadeInX(0.55)}
          >
            {siteConfig.hero.subtitle[locale]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            {...fadeInY(0.65)}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[var(--color-primary-600)] transition-colors duration-200 shadow-sm"
            >
              {ctaLabel}
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] font-semibold text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </motion.div>

          {/* Stats — count-up on enter */}
          <motion.div
            className="flex items-center gap-6 mt-10 justify-center md:justify-start"
            {...fadeInY(0.75)}
          >
            {STATS.map((stat) => (
              <div key={stat.n} className="text-center md:text-left">
                <p className="font-display text-xl font-semibold text-[var(--color-primary)]">
                  <CountUp value={stat.n} duration={1.4} />
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {locale === "az" ? stat.az : stat.ru}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Doctor photo with parallax ── */}
        <motion.div
          className="flex-shrink-0 relative flex items-center justify-center w-full md:w-[45%] lg:w-[42%]"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, x: 28 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.65, delay: 0.15, ease },
              })}
        >
          {/* Parallax wrapper — moves independently of the entrance animation */}
          <motion.div
            className="relative w-[280px] h-[360px] md:w-[320px] md:h-[420px] lg:w-[360px] lg:h-[460px]"
            style={{ y: photoY }}
          >
            {/* Background blob */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[60%_40%_50%_50%_/_55%_45%_55%_45%]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 35%, var(--color-primary-light) 0%, var(--color-primary-muted) 55%, transparent 100%)",
                transform: "scale(1.1)",
              }}
            />

            {/* Photo */}
            <div className="relative w-full h-full rounded-[60%_40%_50%_50%_/_55%_45%_55%_45%] overflow-hidden bg-[var(--color-primary-light)]">
              <Image
                src={siteConfig.chiefDoctor.imageUrl}
                alt={siteConfig.chiefDoctor.name}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 40%, rgba(245,248,250,0.6) 80%, rgba(245,248,250,0.95) 100%)",
                }}
              />
            </div>

            {/* Doctor info card */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 backdrop-blur-md border border-[var(--color-border)] rounded-2xl px-4 py-3 shadow-sm text-center"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.45, delay: 0.55, ease },
                  })}
            >
              <p className="font-semibold text-sm text-[var(--color-text)]">
                {siteConfig.chiefDoctor.name}
              </p>
              <p className="text-xs text-[var(--color-primary-500)] font-medium mt-0.5">
                {siteConfig.chiefDoctor.title[locale]}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-surface-alt))",
        }}
      />
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
