import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Haqqımızda | VitaLife Klinika",
  description:
    "VitaLife Klinika haqqında — missiya, dəyərlər, gigiyena standartları, baş həkim və komandamız.",
};

export default async function AboutPage() {
  const locale = (await getLocale()) as "az" | "ru";
  return <AboutClient locale={locale} />;
}
