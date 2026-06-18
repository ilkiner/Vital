"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { WordReveal } from "@/components/ui/WordReveal";

type Doctor = {
  id: string;
  name: string;
  specialty_az: string;
  specialty_ru: string;
  image_url: string | null;
  is_guest: boolean;
};

type Props = { doctors: Doctor[]; locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function WeeklyDoctors({ doctors, locale }: Props) {
  const t = useTranslations("home");
  const tDoc = useTranslations("doctor");
  const reduced = useReducedMotion() ?? false;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    breakpoints: { "(min-width: 768px)": { slidesToScroll: 2 } },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (doctors.length === 0) return null;

  function doctorHref(id: string) {
    return locale === "ru" ? `/ru/hekimler/${id}` : `/hekimler/${id}`;
  }

  const headerAnim = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease },
      };

  const cardAnim = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.45, delay: i * 0.09, ease },
        };

  return (
    <section className="section-padding bg-white border-t border-[var(--color-border-light)]">
      <div className="container-page">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div {...headerAnim}>
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-500)] mb-2">
              {locale === "az" ? "Bu həftə" : "На этой неделе"}
            </span>
            <h2 className="font-display text-[1.75rem] md:text-[2.1rem] font-medium text-[var(--color-text)] leading-tight">
              {locale === "az" ? (
                <>
                  <WordReveal text="Dəvətli" delay={0.05} />{" "}
                  <em className="not-italic text-[var(--color-primary)]">
                    <WordReveal text="həkimlərimiz" delay={0.18} />
                  </em>
                </>
              ) : (
                <>
                  <WordReveal text="Приглашённые" delay={0.05} />{" "}
                  <em className="not-italic text-[var(--color-primary)]">
                    <WordReveal text="врачи" delay={0.22} />
                  </em>
                </>
              )}
            </h2>
            <div className="w-8 h-[2px] bg-[var(--color-primary-500)] rounded-full mt-3" />
          </motion.div>

          {doctors.length > 2 && (
            <div className="hidden sm:flex gap-2 mb-1">
              <button
                onClick={scrollPrev}
                className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
                aria-label={locale === "az" ? "Əvvəlki" : "Назад"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
                aria-label={locale === "az" ? "Növbəti" : "Далее"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-4 md:gap-5">
            {doctors.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                className="flex-none w-[220px] md:w-[240px] lg:w-[260px]"
                {...cardAnim(i)}
              >
                <Link href={doctorHref(doctor.id)}>
                  <motion.div
                    className="bg-[var(--color-surface-alt)] rounded-[1.25rem] overflow-hidden border border-[var(--color-border)] group cursor-pointer"
                    whileHover={reduced ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                    style={{ boxShadow: "0 0 0 0 rgba(6,78,59,0)" }}
                  >
                    {/* Photo */}
                    <div className="relative h-52 bg-[var(--color-primary-muted)] overflow-hidden">
                      {doctor.image_url ? (
                        <Image
                          src={doctor.image_url}
                          alt={doctor.name}
                          fill
                          className="object-cover object-top"
                          sizes="260px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PersonIcon className="w-16 h-16 text-[var(--color-primary-light)]" />
                        </div>
                      )}
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent 55%, rgba(245,248,250,0.7) 100%)",
                        }}
                      />
                      {doctor.is_guest && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--color-primary)] text-white text-[0.65rem] font-semibold rounded-full tracking-wide">
                          {tDoc("guestBadge")}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="px-4 pt-3.5 pb-4">
                      <p className="font-semibold text-[0.9rem] text-[var(--color-text)] leading-snug">
                        {doctor.name}
                      </p>
                      <p className="text-[0.8rem] font-medium text-[var(--color-primary-500)] mt-0.5">
                        {locale === "az" ? doctor.specialty_az : doctor.specialty_ru}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-[0.78rem] font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                        <span>{t("viewProfile")}</span>
                        <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
