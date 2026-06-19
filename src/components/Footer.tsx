import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const locale = (await getLocale()) as "az" | "ru";

  function localePath(href: string) {
    if (locale === "ru") return `/ru${href}`;
    return href;
  }

  return (
    <footer className="bg-deep-blue mt-auto">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-white font-bold text-lg mb-3">
              {siteConfig.name}
            </p>
            <p className="text-white/55 text-sm leading-relaxed max-w-[240px]">
              {siteConfig.hero.subtitle[locale]}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-white/40 mb-4 text-xs uppercase tracking-[0.14em]">
              {locale === "az" ? "Səhifələr" : "Страницы"}
            </p>
            <ul className="space-y-2.5">
              {[
                { href: "/xidmetler", label: tNav("services") },
                { href: "/qiymetler", label: tNav("pricing") },
                { href: "/haqqimizda", label: tNav("about") },
                { href: "/elaqe", label: tNav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(link.href)}
                    className="text-sm text-white/65 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-white/40 mb-4 text-xs uppercase tracking-[0.14em]">
              {locale === "az" ? "Əlaqə" : "Контакты"}
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-white/65 hover:text-white transition-colors duration-200"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white/65 hover:text-white transition-colors duration-200"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-xs text-white/45 leading-relaxed">
                {siteConfig.contact.address[locale]}
              </li>
            </ul>
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                <InstagramIcon />
                Instagram
              </a>
            )}
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-center text-xs text-white/30"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
        >
          © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
