"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactForm, type ContactFormState } from "./actions";

type Props = { locale: "az" | "ru" };

const initial: ContactFormState = { status: "idle" };

export default function ContactForm({ locale }: Props) {
  const [state, action, pending] = useActionState(submitContactForm, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const t = {
    name:        locale === "az" ? "Ad Soyad *"   : "Имя Фамилия *",
    phone:       locale === "az" ? "Telefon *"     : "Телефон *",
    email:       locale === "az" ? "E-poçt"        : "E-mail",
    message:     locale === "az" ? "Mesajınız *"   : "Сообщение *",
    prefWa:      locale === "az" ? "Cavabı WhatsApp üzərindən almaq istəyirəm" : "Хочу получить ответ через WhatsApp",
    prefEmail:   locale === "az" ? "Cavabı E-poçt ilə almaq istəyirəm"         : "Хочу получить ответ по E-mail",
    submit:      locale === "az" ? "Göndər"        : "Отправить",
    sending:     locale === "az" ? "Göndərilir…"   : "Отправляем…",
    success:     locale === "az" ? "Mesajınız göndərildi! Qısa müddətdə sizinlə əlaqə saxlayacağıq." : "Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.",
  };

  if (state.status === "success") {
    return (
      <div className="bg-[var(--color-primary-muted)] border border-[var(--color-primary-500)]/30 rounded-2xl px-6 py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-semibold text-[var(--color-primary)] text-[0.95rem]">{t.success}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={t.name}>
          <input name="name" required type="text" className={inputCls} placeholder={locale === "az" ? "Adınız" : "Ваше имя"} />
        </Field>
        <Field label={t.phone}>
          <input name="phone" required type="tel" className={inputCls} placeholder="+994 00 000 00 00" />
        </Field>
      </div>

      <Field label={t.email}>
        <input name="email" type="email" className={inputCls} placeholder="email@example.com" />
      </Field>

      <Field label={t.message}>
        <textarea name="message" required rows={4} className={`${inputCls} resize-none`} placeholder={locale === "az" ? "Mesajınızı yazın…" : "Напишите ваше сообщение…"} />
      </Field>

      {/* Preference radio */}
      <div className="space-y-2 pt-1">
        {[
          { value: "whatsapp", label: t.prefWa },
          { value: "email",    label: t.prefEmail },
        ].map(({ value, label }) => (
          <label key={value} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name="preference"
              value={value}
              defaultChecked={value === "whatsapp"}
              className="mt-0.5 accent-[var(--color-primary)] w-4 h-4 flex-none"
            />
            <span className="text-[0.87rem] text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors leading-snug">
              {label}
            </span>
          </label>
        ))}
      </div>

      {state.status === "error" && (
        <p className="text-red-500 text-[0.82rem] bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[var(--color-primary-600)] disabled:opacity-60 transition-colors duration-200 mt-2"
      >
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 transition-colors duration-200";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[0.8rem] font-semibold text-[var(--color-text)]">{label}</label>
      {children}
    </div>
  );
}
