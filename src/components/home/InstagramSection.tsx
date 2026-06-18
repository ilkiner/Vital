"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";
import { WordReveal } from "@/components/ui/WordReveal";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const POST_BG_STYLES = [
  { background: "color-mix(in srgb, #EBF5FA 80%, #F0F8FC)" },
  { background: "#F5F4F2" },
  { background: "color-mix(in srgb, #EBF5FA 50%, white)" },
  { background: "#FAFAF8" },
  { background: "color-mix(in srgb, #F0F8FC 70%, white)" },
  { background: "#F5F4F2" },
] as const;

const PLACEHOLDER_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  style: POST_BG_STYLES[i],
}));

type Props = { locale: "az" | "ru" };

export default function InstagramSection({ locale }: Props) {
  const t = useTranslations("home");
  const reduced = useReducedMotion() ?? false;

  if (!siteConfig.social.instagram) return null;

  const headerAnim = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-48px" },
        transition: { duration: 0.5, ease },
      };

  const cellAnim = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.94 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: "-32px" },
          transition: { duration: 0.38, delay: i * 0.06, ease },
        };

  const ctaAnim = reduced
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.28 },
      };

  return (
    <section className="py-16 md:py-20 bg-[var(--color-surface-alt)] border-t border-[var(--color-border-light)]">
      <div className="container-page">
        <motion.div className="text-center mb-10" {...headerAnim}>
          <h2 className="font-display text-[1.75rem] md:text-[2.1rem] font-medium text-[var(--color-text)]">
            <WordReveal text={t("instagramTitle")} delay={0.05} />
          </h2>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-[var(--color-primary)] text-sm font-medium hover:underline"
          >
            <InstagramIcon />
            {t("instagramHandle")}
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={siteConfig.social.instagram!}
              target="_blank"
              rel="noopener noreferrer"
              style={post.style}
              className="rounded-xl aspect-square flex items-center justify-center group overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-200"
              {...cellAnim(i)}
            >
              <InstagramIcon className="w-8 h-8 text-[var(--color-text-subtle)] group-hover:text-[var(--color-primary)] transition-colors duration-200" />
            </motion.a>
          ))}
        </div>

        <motion.div className="text-center mt-8" {...ctaAnim}>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <InstagramIcon className="w-4 h-4" />
            {locale === "az" ? "Instagram-da izlə" : "Подписаться в Instagram"}
          </a>
        </motion.div>
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
