"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Service = {
  id: string;
  title_az: string;
  title_ru: string;
  description_az: string | null;
  description_ru: string | null;
  is_guest_service?: boolean;
};

type Props = {
  services: Service[];
  locale: "az" | "ru";
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function ServicesAccordion({ services, locale }: Props) {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);

  return (
    <div className="space-y-2">
      {services.map((service, i) => {
        const isOpen = openId === service.id;
        const title = locale === "az" ? service.title_az : service.title_ru;
        const desc =
          locale === "az" ? service.description_az : service.description_ru;

        return (
          <motion.div
            key={service.id}
            className="bg-white rounded-2xl border overflow-hidden transition-colors duration-200"
            style={{ borderColor: isOpen ? "var(--color-primary-500)" : "var(--color-border)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: i * 0.06, ease }}
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left group"
              onClick={() => setOpenId(isOpen ? null : service.id)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="flex-none w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                  style={{
                    background: isOpen ? "var(--color-primary)" : "var(--color-primary-muted)",
                    color: isOpen ? "white" : "var(--color-primary-500)",
                  }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span
                  className="font-semibold text-[0.95rem] transition-colors duration-200"
                  style={{ color: isOpen ? "var(--color-primary)" : "var(--color-text)" }}
                >
                  {title}
                </span>
              </div>
              <motion.span
                className="flex-none w-7 h-7 rounded-full border flex items-center justify-center text-[var(--color-text-muted)] transition-colors duration-200"
                style={{ borderColor: isOpen ? "var(--color-primary-500)" : "var(--color-border)" }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && desc && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-6 pb-6 pt-1">
                    <div className="w-full h-px bg-[var(--color-border-light)] mb-4" />
                    <p className="text-[0.9rem] leading-[1.85] text-[var(--color-text-muted)]">
                      {desc}
                    </p>
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
