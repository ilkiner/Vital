"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

type Props = { locale: "az" | "ru" };

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function CtaBand({ locale }: Props) {
  const reduced = useReducedMotion() ?? false;

  const ctaHref = locale === "ru" ? "/ru/elaqe" : "/elaqe";

  const copy = {
    eyebrow: locale === "az" ? "Bizimlə əlaqə" : "Свяжитесь с нами",
    heading: locale === "az"
      ? { main: "Sağlamlığınızla bağlı", accent: "sualınız var?" }
      : { main: "Есть вопросы о", accent: "вашем здоровье?" },
    sub: locale === "az"
      ? "Həkimlərimiz sizi dinləməyə hazırdır. Randevu alın və ya WhatsApp üzərindən bizimlə əlaqə saxlayın."
      : "Наши врачи готовы вас выслушать. Запишитесь на приём или свяжитесь с нами через WhatsApp.",
    cta:  locale === "az" ? "Randevu Al" : "Записаться",
    whatsapp: "WhatsApp",
  };

  const wrapAnim = reduced ? {} : {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease },
  };

  const btnsAnim = reduced ? {} : {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.48, delay: 0.18, ease },
  };

  return (
    <section className="bg-deep-blue relative overflow-hidden py-20 md:py-24">
      {/* Dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top radial glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(79,176,198,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative z-10 text-center">
        <motion.div {...wrapAnim}>
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: "var(--color-accent-on-dark)" }}>
            {copy.eyebrow}
          </span>

          <h2
            className="font-display font-medium text-white leading-[1.12] mb-5"
            style={{ fontSize: "clamp(1.85rem, 4vw, 3rem)" }}
          >
            {copy.heading.main}{" "}
            <em className="not-italic" style={{ color: "var(--color-accent-on-dark)" }}>
              {copy.heading.accent}
            </em>
          </h2>

          <p className="text-white/65 text-[1rem] leading-relaxed max-w-[480px] mx-auto mb-10">
            {copy.sub}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          {...btnsAnim}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm text-[var(--color-primary)] bg-white hover:bg-white/90 transition-colors duration-200 shadow-sm"
          >
            {copy.cta}
          </Link>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white border transition-colors duration-200"
            style={{ borderColor: "rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.10)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
          >
            <WhatsAppIcon />
            {copy.whatsapp}
          </a>
        </motion.div>
      </div>
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
