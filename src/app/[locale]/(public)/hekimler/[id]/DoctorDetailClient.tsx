"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";

type Doctor = {
  id: string;
  name: string;
  specialty_az: string;
  specialty_ru: string;
  bio_az: string;
  bio_ru: string;
  image_url: string | null;
  is_guest: boolean;
};

type Props = {
  doctor: Doctor;
  locale: "az" | "ru";
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Deterministic positions (SSR-safe — no Math.random)
const FLOAT_DOTS = [
  { x: "7%",  y: "10%", size: 7,  dur: 8,  delay: 0   },
  { x: "91%", y: "7%",  size: 4,  dur: 10, delay: 1.5 },
  { x: "87%", y: "52%", size: 9,  dur: 12, delay: 0.8 },
  { x: "4%",  y: "68%", size: 5,  dur: 9,  delay: 2.2 },
  { x: "48%", y: "3%",  size: 3,  dur: 11, delay: 3.0 },
  { x: "20%", y: "88%", size: 6,  dur: 7,  delay: 1.1 },
];

function buildTags(doctor: Doctor, locale: "az" | "ru"): string[] {
  const main =
    locale === "az" ? doctor.specialty_az : doctor.specialty_ru;
  const extras =
    locale === "az"
      ? ["Konsultasiya", "Müalicə", "Diaqnostika", "Profilaktika"]
      : ["Консультация", "Лечение", "Диагностика", "Профилактика"];
  return [main, ...extras];
}

export default function DoctorDetailClient({ doctor, locale }: Props) {
  const t = useTranslations("doctor");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 500], [0, -52]);

  const specialty =
    locale === "az" ? doctor.specialty_az : doctor.specialty_ru;
  const bio = locale === "az" ? doctor.bio_az : doctor.bio_ru;
  const tags = buildTags(doctor, locale);
  const contactHref = locale === "ru" ? "/ru/elaqe" : "/elaqe";
  const homeHref = locale === "ru" ? "/ru" : "/";

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative bg-[var(--color-primary)] overflow-hidden"
      >
        {/* Dot matrix background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.11) 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Ambient glow orbs */}
        <motion.div
          aria-hidden
          className="absolute -top-44 -right-44 w-[580px] h-[580px] rounded-full pointer-events-none select-none"
          style={{
            background:
              "radial-gradient(circle, rgba(79,176,198,0.22) 0%, transparent 62%)",
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-28 -left-28 w-[420px] h-[420px] rounded-full pointer-events-none select-none"
          style={{
            background:
              "radial-gradient(circle, rgba(79,176,198,0.15) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Content grid */}
        <div className="container-page relative z-10 pt-10 pb-20 md:pb-24 flex flex-col md:flex-row items-end gap-8 md:gap-12 lg:gap-16">
          {/* Photo — parallax */}
          <motion.div
            className="flex-none w-44 sm:w-52 md:w-56 lg:w-64"
            style={{ y: photoY }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div
              className="relative rounded-[1.5rem] overflow-hidden"
              style={{
                aspectRatio: "3/4",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow:
                  "0 32px 72px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              {doctor.image_url ? (
                <Image
                  src={doctor.image_url}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, (max-width: 1024px) 224px, 256px"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(79,176,198,0.18) 0%, rgba(14,60,84,0.06) 100%)",
                  }}
                >
                  <PersonIcon />
                </div>
              )}

              {/* Subtle bottom gradient on photo */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 50%, rgba(6,78,59,0.35) 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* Text info */}
          <div className="flex-1 pb-2 space-y-3.5">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.38, ease }}
            >
              <Link
                href={homeHref}
                className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.48)" }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {locale === "az" ? "Ana səhifəyə" : "На главную"}
              </Link>
            </motion.div>

            {/* Guest badge */}
            {doctor.is_guest && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.08, ease }}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-semibold tracking-widest uppercase"
                  style={{
                    background: "rgba(79,176,198,0.16)",
                    border: "1px solid rgba(79,176,198,0.32)",
                    color: "#34D399",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] inline-block" />
                  {t("guestBadge")}
                </span>
              </motion.div>
            )}

            {/* Name */}
            <motion.h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.1] text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease }}
            >
              {doctor.name}
            </motion.h1>

            {/* Specialty */}
            <motion.p
              className="text-[0.95rem] font-semibold tracking-wide"
              style={{ color: "#34D399" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22, ease }}
            >
              {specialty}
            </motion.p>

            {/* Accent rule */}
            <motion.div
              className="w-10 h-px rounded-full"
              style={{ background: "rgba(255,255,255,0.22)" }}
              initial={{ scaleX: 0, originX: "0%" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.28, ease }}
            />

            {/* Bio first paragraph */}
            <motion.p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.66)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34, ease }}
            >
              {bio.split("\n\n")[0]}
            </motion.p>
          </div>
        </div>

        {/* Wave transition */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 56 }}
        >
          <svg
            viewBox="0 0 1440 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full"
            preserveAspectRatio="none"
            style={{ height: 56 }}
          >
            <path
              d="M0 56V28C200 56 400 4 720 28C1040 52 1280 8 1440 22V56H0Z"
              fill="#FAFAF8"
            />
          </svg>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <div className="bg-[var(--color-surface-alt)] relative overflow-hidden">
        {/* Floating ambient dots */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none"
        >
          {FLOAT_DOTS.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: dot.x,
                top: dot.y,
                width: dot.size,
                height: dot.size,
                background: "var(--color-primary-500)",
                opacity: 0.07,
              }}
              animate={{ y: [-(dot.size + 2), dot.size + 2, -(dot.size + 2)] }}
              transition={{
                duration: dot.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.delay,
              }}
            />
          ))}
        </div>

        <div className="container-page max-w-3xl pt-14 pb-24 space-y-14 relative z-10">

          {/* ── Bio ── */}
          <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
          >
            <SectionLabel>
              {locale === "az" ? "Bioqrafiya" : "Биография"}
            </SectionLabel>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
              {/* Accent bar */}
              <div
                className="h-[3px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-500) 100%)",
                }}
              />
              <div className="px-6 md:px-8 py-7 space-y-4">
                {bio.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[0.95rem] leading-[1.88] text-[var(--color-text)]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Expertise tags ── */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease }}
            >
              <SectionLabel>
                {locale === "az"
                  ? "Uzmanlıq sahələri"
                  : "Области специализации"}
              </SectionLabel>
            </motion.div>

            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm font-medium cursor-default ${
                    i === 0
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary)] transition-colors duration-200"
                  }`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.32, delay: i * 0.07, ease }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </section>

          {/* ── Schedule ── */}
          <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
          >
            <SectionLabel>{t("schedule")}</SectionLabel>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
              {siteConfig.hours.map((row, i) => {
                const isClosed =
                  row.time.includes("Bağlı") ||
                  row.time.includes("Закрыто");
                return (
                  <motion.div
                    key={i}
                    className={`flex items-center justify-between px-6 py-4 ${
                      i < siteConfig.hours.length - 1
                        ? "border-b border-[var(--color-border-light)]"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.09, ease }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full flex-none ${
                          isClosed
                            ? "bg-red-300"
                            : "bg-[var(--color-primary-500)]"
                        }`}
                      />
                      <span className="text-[0.9rem] font-medium text-[var(--color-text)]">
                        {locale === "az" ? row.az : row.ru}
                      </span>
                    </div>
                    <span
                      className={`text-[0.85rem] font-semibold tabular-nums ${
                        isClosed
                          ? "text-[var(--color-text-muted)]"
                          : "text-[var(--color-primary-600)]"
                      }`}
                    >
                      {row.time}
                    </span>
                  </motion.div>
                );
              })}

              {/* Footnote */}
              <div className="bg-[var(--color-primary-muted)] px-6 py-3 border-t border-[var(--color-border-light)]">
                <p className="text-[0.74rem] text-[var(--color-text-muted)]">
                  {locale === "az"
                    ? "* İş saatları doktorun fərdi cədvəlinə görə dəyişə bilər."
                    : "* Часы работы могут меняться в зависимости от индивидуального расписания врача."}
                </p>
              </div>
            </div>
          </motion.section>

        </div>
      </div>

      {/* ─── CTA STRIP ─── */}
      <section className="bg-[var(--color-primary)] relative overflow-hidden">
        {/* Dot pattern */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Soft glow */}
        <motion.div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none select-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(79,176,198,0.18) 0%, transparent 65%)",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-page relative z-10 py-14 md:py-16 text-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.52, ease }}
          >
            <p
              className="text-[0.75rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {locale === "az"
                ? `${doctor.name} ilə əlaqə`
                : `Связаться с ${doctor.name}`}
            </p>

            <p className="font-display text-2xl md:text-3xl font-medium text-white text-balance">
              {locale === "az"
                ? "Sualınız var? Bizimlə əlaqə saxlayın."
                : "Есть вопросы? Свяжитесь с нами."}
            </p>

            <div className="pt-3">
              <Link href={contactHref}>
                <motion.span
                  className="inline-flex items-center gap-2.5 bg-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-lg transition-colors duration-200 hover:bg-[var(--color-primary-light)]"
                  style={{ color: "var(--color-primary)" }}
                  whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.15, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ChatIcon className="w-4 h-4" />
                  {t("askQuestion")}
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[var(--color-primary-500)] whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-[var(--color-border-light)]" />
    </div>
  );
}

function PersonIcon() {
  return (
    <svg
      className="w-20 h-20"
      style={{ color: "rgba(79,176,198,0.30)" }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.75}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}
