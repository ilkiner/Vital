"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function localePath(href: string) {
    if (locale === "ru") return `/ru${href}`;
    return href;
  }

  function switchLocale(newLocale: string) {
    // pathname'den mevcut locale prefix'ini kaldır, yeni locale ekle
    const pathWithoutLocale = pathname.startsWith("/ru")
      ? pathname.slice(3) || "/"
      : pathname;

    const newPath =
      newLocale === "ru"
        ? `/ru${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
        : pathWithoutLocale || "/";

    router.push(newPath);
  }

  const navLinks = [
    { href: "/xidmetler", label: t("services") },
    { href: "/hekimler", label: t("doctors") === "Həkimlər" ? t("doctors") : t("doctors") },
    { href: "/qiymetler", label: t("pricing") },
    { href: "/haqqimizda", label: t("about") },
    { href: "/elaqe", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <nav className="container-page flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={localePath("/")} className="flex items-center gap-2">
          <Image
            src="/images/doctors/logo.jpg.jpeg"
            alt={siteConfig.name}
            width={200}
            height={56}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localePath(link.href)}
              className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Locale switcher + mobile menu toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-[var(--color-border)] overflow-hidden text-xs font-semibold">
            <button
              onClick={() => switchLocale("az")}
              className={`px-3 py-1.5 transition-colors duration-200 ${
                locale === "az"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              AZ
            </button>
            <button
              onClick={() => switchLocale("ru")}
              className={`px-3 py-1.5 transition-colors duration-200 ${
                locale === "ru"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              RU
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-[var(--color-text-muted)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menyu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-[var(--color-border)] bg-white"
        >
          <div className="container-page py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localePath(link.href)}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-muted)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
