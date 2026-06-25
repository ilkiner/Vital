"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { PriceCategory } from "@/lib/pricing-data";

type Props = {
  categories: PriceCategory[];
  locale: "az" | "ru";
  contactHref: string;
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Ümumi analizlər": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>
  ),
  "Kardioloji və funksional müayinə": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
  ),
  "USM (Ultrasəs müayinə)": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
  ),
  "Rentgen və fizioterapiya": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  "Hormonal müayinələr": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>
  ),
  "Biokimyəvi müayinələr": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>
  ),
  "İnfeksiya analizləri": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
  ),
  "İmmunoloji və romatoloji analizlər": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  ),
  "Onkomarkerlər": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  ),
  "TORCH və hamiləlik infeksiyaları": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
  ),
  "Parazitoloji müayinələr": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  ),
  "Digər analizlər": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
    </svg>
  ),
};

function DefaultIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded px-0.5" style={{ background: "var(--color-primary-muted)", color: "var(--color-primary)", fontWeight: 600 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function PricingAccordion({ categories, locale, contactHref }: Props) {
  const [query, setQuery] = useState("");
  const [manualOpen, setManualOpen] = useState<Set<number>>(new Set());
  const reduced = useReducedMotion() ?? false;

  const isSearching = query.trim().length > 0;
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return categories.map((cat, i) => ({ ...cat, idx: i, items: cat.items }));
    return categories
      .map((cat, i) => {
        const catTitleMatch =
          cat.title_az.toLowerCase().includes(q) ||
          cat.title_ru.toLowerCase().includes(q);
        const matchedItems = catTitleMatch
          ? cat.items
          : cat.items.filter((item) => item.name_az.toLowerCase().includes(q));
        return { ...cat, idx: i, items: matchedItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [q, categories]);

  const totalMatches = filtered.reduce((s, c) => s + c.items.length, 0);

  function isOpen(idx: number) {
    if (isSearching) return true;
    return manualOpen.has(idx);
  }

  function toggle(idx: number) {
    setManualOpen((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  const askPrice     = locale === "az" ? "Soruşun"   : "Узнать";
  const askPriceFull = locale === "az" ? "Qiymət üçün soruşun" : "Спросите цену";
  const contactLabel = locale === "az" ? "Əlaqə"     : "Связаться";
  const placeholder  = locale === "az"
    ? "Analiz axtar… (məs. TSH, Vitamin D, Rentgen)"
    : "Поиск анализа… (напр. ТТГ, Витамин D, Рентген)";
  const noResults    = locale === "az"
    ? "Heç bir nəticə tapılmadı."
    : "Результатов не найдено.";

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-text-muted)" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border rounded-2xl pl-10 pr-10 py-3.5 text-[0.9rem] outline-none transition-all duration-200"
          style={{
            borderColor: query ? "var(--color-primary-500)" : "var(--color-border)",
            boxShadow: query ? "0 0 0 3px var(--color-primary-muted)" : undefined,
            color: "var(--color-text)",
          }}
        />
        {query && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 transition-colors duration-150"
            style={{ color: "var(--color-text-muted)" }}
            onClick={() => setQuery("")}
            aria-label="Təmizlə"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Search result summary */}
      <AnimatePresence>
        {isSearching && (
          <motion.p
            key="summary"
            className="text-[0.8rem] mb-4 font-medium"
            style={{ color: totalMatches > 0 ? "var(--color-primary)" : "var(--color-text-muted)" }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {totalMatches > 0
              ? locale === "az"
                ? `${totalMatches} nəticə tapıldı`
                : `Найдено ${totalMatches} результатов`
              : noResults}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Accordion list */}
      <div className="space-y-2">
        {filtered.map((cat) => {
          const open = isOpen(cat.idx);
          const title = locale === "az" ? cat.title_az : cat.title_ru;
          const icon = CATEGORY_ICONS[cat.title_az] ?? <DefaultIcon />;

          return (
            <motion.div
              key={cat.title_az}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: open ? "var(--color-primary-500)" : "var(--color-border)" }}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease }}
            >
              {/* Header */}
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left bg-white"
                onClick={() => !isSearching && toggle(cat.idx)}
                aria-expanded={open}
                style={{ cursor: isSearching ? "default" : "pointer" }}
              >
                <span
                  className="flex-none w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{
                    background: open ? "var(--color-primary)" : "var(--color-primary-muted)",
                    color: open ? "white" : "var(--color-primary)",
                  }}
                >
                  {icon}
                </span>

                <span className="flex-1 min-w-0 flex items-center gap-2.5">
                  <span
                    className="font-semibold text-[0.9rem] leading-snug transition-colors duration-200"
                    style={{ color: open ? "var(--color-primary)" : "var(--color-text)" }}
                  >
                    <Highlight text={title} query={isSearching ? query.trim() : ""} />
                  </span>
                  <span
                    className="flex-none inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-bold tabular-nums transition-colors duration-200"
                    style={{
                      background: open ? "var(--color-primary-muted)" : "var(--color-surface-alt)",
                      color: open ? "var(--color-primary)" : "var(--color-text-muted)",
                    }}
                  >
                    {cat.items.length}
                  </span>
                </span>

                {!isSearching && (
                  <motion.span
                    className="flex-none w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-200"
                    style={{
                      borderColor: open ? "var(--color-primary-500)" : "var(--color-border)",
                      color: open ? "var(--color-primary)" : "var(--color-text-muted)",
                    }}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.22, ease }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </motion.span>
                )}
              </button>

              {/* Body */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.26, ease }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="border-t border-[var(--color-border-light)]">
                      {cat.items.map((item, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-between px-5 py-3 group/row"
                          style={{
                            background: j % 2 === 0 ? "white" : "var(--color-surface-alt)",
                            borderBottom: j < cat.items.length - 1 ? "1px solid var(--color-border-light)" : undefined,
                          }}
                        >
                          <span className="text-[0.845rem] text-[var(--color-text)] flex-1 pr-3 leading-snug">
                            <Highlight text={item.name_az} query={isSearching ? query.trim() : ""} />
                          </span>
                          <div className="flex items-center gap-2.5 flex-none">
                            {item.price ? (
                              <span
                                className="inline-flex items-center rounded-lg px-2.5 py-1 text-[0.8rem] font-bold tabular-nums whitespace-nowrap"
                                style={{ background: "var(--color-primary-muted)", color: "var(--color-primary)" }}
                              >
                                {item.price}
                              </span>
                            ) : (
                              <span className="text-[0.75rem] text-[var(--color-text-subtle)] italic whitespace-nowrap">
                                {askPriceFull}
                              </span>
                            )}
                            <Link
                              href={contactHref}
                              className="opacity-0 group-hover/row:opacity-100 focus:opacity-100 px-2.5 py-1 rounded-lg text-[0.72rem] font-semibold whitespace-nowrap transition-all duration-150"
                              style={{ background: "var(--color-primary-muted)", color: "var(--color-primary)" }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-primary)";
                                (e.currentTarget as HTMLAnchorElement).style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-primary-muted)";
                                (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-primary)";
                              }}
                            >
                              {askPrice}
                            </Link>
                          </div>
                        </div>
                      ))}

                      {/* Category footer */}
                      <div
                        className="flex items-center justify-between px-5 py-3.5"
                        style={{ background: "var(--color-primary-muted)" }}
                      >
                        <span className="text-[0.78rem]" style={{ color: "var(--color-primary-500)" }}>
                          {locale === "az"
                            ? `${cat.items.length} analiz · qiymət barədə soruşa bilərsiniz`
                            : `${cat.items.length} анализов · можете уточнить цену`}
                        </span>
                        <Link
                          href={contactHref}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.75rem] font-semibold transition-colors duration-200"
                          style={{ background: "var(--color-primary)", color: "white" }}
                        >
                          {contactLabel}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
