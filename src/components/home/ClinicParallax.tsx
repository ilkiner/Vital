"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  locale: "az" | "ru";
  imageUrl?: string;
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function ClinicParallax({ locale, imageUrl }: Props) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-7%", "7%"]
  );

  const ctaHref = locale === "ru" ? "/ru/elaqe" : "/elaqe";

  const copy = {
    eyebrow: locale === "az" ? "VitaLife Klinika · Bakı" : "VitaLife Klinika · Баку",
    heading: locale === "az"
      ? { line1: "Sağlamlığınız üçün", line2: "doğru ünvan" }
      : { line1: "Правильное место", line2: "для вашего здоровья" },
    cta: locale === "az" ? "Bizimlə Əlaqə" : "Связаться с нами",
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "clamp(380px, 58vh, 680px)" }}
      aria-label={copy.heading.line1 + " " + copy.heading.line2}
    >
      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          y: bgY,
          top: "-8%",
          bottom: "-8%",
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="VitaLife Klinika"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
        ) : (
          /* Atmospheric placeholder — replace with <Image> when photo is ready */
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background: [
                /* Central light — bright vanishing point */
                "radial-gradient(ellipse 38% 52% at 50% 32%, rgba(255,255,255,0.72) 0%, rgba(196,235,245,0.22) 48%, transparent 72%)",
                /* Left depth */
                "radial-gradient(ellipse 70% 80% at -5% 55%, rgba(10,44,64,0.55) 0%, transparent 58%)",
                /* Right depth */
                "radial-gradient(ellipse 70% 80% at 105% 55%, rgba(10,44,64,0.55) 0%, transparent 58%)",
                /* Subtle upper teal glow */
                "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(79,176,198,0.22) 0%, transparent 55%)",
                /* Base horizon gradient */
                "linear-gradient(185deg, #0A3248 0%, #14506E 28%, #1E7498 52%, #4FB0C6 74%, #C2E6F0 92%, #EEF7FA 100%)",
              ].join(", "),
            }}
          />
        )}

        {/* Vignette — softens edges for real photos */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 90% at 50% 50%, transparent 42%, rgba(10,38,54,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* ── Scrim — bottom legibility gradient ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,38,54,0.10) 0%, rgba(10,38,54,0.18) 45%, rgba(10,38,54,0.72) 100%)",
        }}
      />

      {/* ── Thin gold rule — top accent ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold) 30%, var(--color-gold) 70%, transparent)",
          opacity: 0.45,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-14 md:pb-16 text-center container-page">
        <motion.span
          className="block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55 mb-4"
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          {copy.eyebrow}
        </motion.span>

        <motion.h2
          className="font-display font-medium text-white leading-[1.12] text-balance mb-7"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58, delay: 0.08, ease }}
        >
          {copy.heading.line1}
          <br />
          <em className="not-italic" style={{ color: "var(--color-accent-on-dark)" }}>
            {copy.heading.line2}
          </em>
        </motion.h2>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, delay: 0.18, ease }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#FFFFFF",
              letterSpacing: "0.05em",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.background = "rgba(255,255,255,0.22)";
              t.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.background = "rgba(255,255,255,0.12)";
              t.style.borderColor = "rgba(255,255,255,0.28)";
            }}
          >
            {copy.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
