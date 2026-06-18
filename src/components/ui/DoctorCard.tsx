"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export type DoctorCardDoctor = {
  id: string;
  name: string;
  specialty_az: string;
  specialty_ru: string;
  image_url: string | null;
  is_guest: boolean;
};

type Props = {
  doctor: DoctorCardDoctor;
  locale: "az" | "ru";
  href: string;
  sizes?: string;
};

export function getInitials(name: string): string {
  return name
    .replace(/^(Prof\.\s*|Dr\.\s*|Ass\.\s*)+/i, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

export function DoctorAvatar({
  initials,
  large = false,
}: {
  initials: string;
  large?: boolean;
}) {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #0E3C54 0%, #14506E 40%, #1A6B8A 70%, #4FB0C6 100%)",
      }}
    >
      {/* Dot texture */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(79,176,198,0.3) 0%, transparent 58%)",
        }}
      />
      {/* Initials */}
      <span
        className={`relative font-display font-medium text-white/80 select-none leading-none ${
          large ? "text-[4.5rem] md:text-[5.5rem]" : "text-[2.2rem]"
        }`}
        aria-hidden
      >
        {initials}
      </span>
    </div>
  );
}

export default function DoctorCard({
  doctor,
  locale,
  href,
  sizes,
}: Props) {
  const reduced = useReducedMotion() ?? false;

  const specialty =
    locale === "az" ? doctor.specialty_az : doctor.specialty_ru;
  const initials = getInitials(doctor.name);
  const guestLabel = locale === "az" ? "Dəvətli" : "Гость";
  const moreLabel = locale === "az" ? "Ətraflı" : "Подробнее";
  const cardSizes =
    sizes ?? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px";

  return (
    <Link
      href={href}
      className="block group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 rounded-[1.25rem]"
    >
      <motion.div
        className="bg-[var(--color-surface)] rounded-[1.25rem] overflow-hidden border border-[var(--color-border)]"
        whileHover={
          reduced
            ? {}
            : {
                y: -6,
                boxShadow: "0 20px 48px rgba(20,80,110,0.16)",
                transition: { duration: 0.22, ease: "easeOut" },
              }
        }
        style={{ boxShadow: "0 2px 8px rgba(20,80,110,0.05)" }}
      >
        {/* ── Photo / Avatar  3/4 ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          {/* Zoom wrapper — CSS so it's always smooth */}
          <div
            className={`absolute inset-0${
              !reduced
                ? " transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                : ""
            }`}
          >
            {doctor.image_url ? (
              <Image
                src={doctor.image_url}
                alt={doctor.name}
                fill
                className="object-cover object-top"
                sizes={cardSizes}
              />
            ) : (
              <DoctorAvatar initials={initials} />
            )}
          </div>

          {/* Scrim */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(245,248,250,0.88) 100%)",
            }}
          />

          {/* Guest badge */}
          {doctor.is_guest && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-[0.3rem] bg-[var(--color-primary)] text-white text-[0.6rem] font-semibold rounded-full tracking-widest uppercase">
              <span className="w-1 h-1 rounded-full bg-[#87CEDC] flex-none" />
              {guestLabel}
            </span>
          )}
        </div>

        {/* ── Info ── */}
        <div className="px-4 pt-3.5 pb-4">
          <p className="font-semibold text-[0.9rem] text-[var(--color-text)] leading-snug mb-2.5">
            {doctor.name}
          </p>
          {/* Specialty chip */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-border)] text-[var(--color-primary)] text-[0.7rem] font-semibold tracking-wide">
            {specialty}
          </span>
          {/* More affordance */}
          <div className="flex items-center gap-1 mt-3.5 text-[0.75rem] font-medium text-[var(--color-text-subtle)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
            <span>{moreLabel}</span>
            <svg
              className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
