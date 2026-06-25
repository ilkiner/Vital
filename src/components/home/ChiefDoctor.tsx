"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { WordReveal } from "@/components/ui/WordReveal";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function ChiefDoctor({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["4%", "-4%"]
  );

  const aboutHref = locale === "ru" ? "/ru/haqqimizda" : "/haqqimizda";
  const moreLabel = locale === "az" ? "Ətraflı" : "Подробнее";
  const sectionLabel = locale === "az" ? "Baş Həkim" : "Главный врач";
  const experienceLabel = locale === "az" ? "Klinikanın rəhbəri" : "Руководитель клиники";

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.55, delay, ease },
        };

  const photoAnim = reduced
    ? {}
    : {
        initial: { opacity: 0, x: -24 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease },
      };

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--color-primary-muted) 0%, var(--color-primary-light) 100%)" }}
    >
      {/* Subtle teal ring decoration */}
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── LEFT: Photo ── */}
          <motion.div className="flex justify-center md:justify-start" {...photoAnim}>
            <motion.div
              className="relative w-[280px] h-[380px] md:w-[320px] md:h-[430px] lg:w-[360px] lg:h-[480px]"
              style={{ y: photoY }}
            >
              {/* Offset shadow card */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[1.75rem] translate-x-3 translate-y-3"
                style={{ background: "color-mix(in srgb, var(--color-primary) 12%, transparent)" }}
              />

              {/* Photo frame */}
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden border border-[var(--color-border)] bg-[var(--color-primary-light)]">
                <Image
                  src={siteConfig.chiefDoctor.imageUrl}
                  alt={siteConfig.chiefDoctor.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 5%" }}
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
                />
                {/* Bottom fade — hides Instagram story text overlay */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, transparent, var(--color-primary-light))",
                  }}
                />
              </div>

              {/* Experience badge — bottom right */}
              <motion.div
                className="absolute -bottom-3 -right-3 bg-[var(--color-primary)] text-white rounded-2xl px-4 py-3 shadow-md"
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, scale: 0.88 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.4, delay: 0.35, ease },
                    })}
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-white/70 leading-none mb-0.5">
                  {experienceLabel}
                </p>
                <p className="text-[0.8rem] font-bold leading-none">{siteConfig.name}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Bio ── */}
          <div className="flex flex-col gap-0">
            <motion.div {...fadeUp(0)}>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-500)] mb-2">
                {sectionLabel}
              </span>
              <h2 className="font-display text-[1.75rem] md:text-[2.1rem] font-medium text-[var(--color-text)] leading-tight">
                <WordReveal text={siteConfig.chiefDoctor.name} delay={0.05} />
              </h2>
              <div className="w-8 h-[2px] bg-[var(--color-primary-500)] rounded-full mt-3 mb-5" />
            </motion.div>

            {/* Title pill */}
            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-border)] text-[0.78rem] font-semibold text-[var(--color-primary)] mb-6">
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]"
                />
                {siteConfig.chiefDoctor.title[locale]}
              </span>
            </motion.div>

            <motion.p
              className="text-[var(--color-text-muted)] text-[0.975rem] leading-[1.85] mb-8"
              {...fadeUp(0.18)}
            >
              {siteConfig.chiefDoctor.bio[locale]}
            </motion.p>

            <motion.div {...fadeUp(0.26)}>
              <Link
                href={aboutHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200 group"
              >
                {moreLabel}
                <svg
                  className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
