"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { PriceCategory } from "@/lib/pricing-data";

type Props = {
  categories: PriceCategory[];
  locale: "az" | "ru";
  contactHref: string;
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function PricingAccordion({ categories, locale, contactHref }: Props) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const reduced = useReducedMotion() ?? false;

  const askPrice = locale === "az" ? "Qiymət üçün soruşun" : "Спросите цену";
  const askBtn   = locale === "az" ? "Soruş"               : "Узнать";

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {categories.map((cat, i) => {
        const isOpen = openSet.has(i);
        const title  = locale === "az" ? cat.title_az : cat.title_ru;

        return (
          <motion.div
            key={cat.title_az}
            className="bg-white rounded-2xl border overflow-hidden"
            style={{ borderColor: isOpen ? "var(--color-primary-500)" : "var(--color-border)" }}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.36, delay: reduced ? 0 : i * 0.04, ease }}
          >
            {/* Accordion header */}
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left group"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <span
                  className="font-semibold text-[0.95rem] leading-snug transition-colors duration-200 truncate"
                  style={{ color: isOpen ? "var(--color-primary)" : "var(--color-text)" }}
                >
                  {title}
                </span>
                <span className="flex-none inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-bold tabular-nums bg-[var(--color-primary-muted)] text-[var(--color-primary-500)]">
                  {cat.items.length}
                </span>
              </div>
              <motion.span
                className="flex-none w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-200 ml-4"
                style={{
                  borderColor: isOpen ? "var(--color-primary-500)" : "var(--color-border)",
                  color: isOpen ? "var(--color-primary)" : "var(--color-text-muted)",
                }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: reduced ? 0 : 0.22, ease }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.span>
            </button>

            {/* Accordion body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.28, ease }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-3">
                    <div className="mx-6 h-px bg-[var(--color-border-light)] mb-1" />
                    {cat.items.map((item, j) => (
                      <div
                        key={j}
                        className={`flex items-center justify-between px-6 py-3 ${
                          j < cat.items.length - 1
                            ? "border-b border-[var(--color-border-light)]"
                            : ""
                        }`}
                      >
                        <span className="text-[0.875rem] text-[var(--color-text)] flex-1 pr-4 leading-snug">
                          {item.name_az}
                        </span>
                        <div className="flex items-center gap-2.5 flex-none">
                          {item.price ? (
                            <span className="font-semibold text-[var(--color-primary)] tabular-nums text-[0.875rem] whitespace-nowrap">
                              {item.price}
                            </span>
                          ) : (
                            <span className="text-[0.78rem] text-[var(--color-text-subtle)] italic whitespace-nowrap">
                              {askPrice}
                            </span>
                          )}
                          <Link
                            href={contactHref}
                            className="px-3 py-1 rounded-full bg-[var(--color-primary-muted)] text-[var(--color-primary)] text-[0.72rem] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200 whitespace-nowrap"
                          >
                            {askBtn}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
