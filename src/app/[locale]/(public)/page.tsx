import { getLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import AboutClinic from "@/components/home/AboutClinic";
import WeeklyDoctors from "@/components/home/WeeklyDoctors";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyVitalife from "@/components/home/WhyVitalife";
import ChiefDoctor from "@/components/home/ChiefDoctor";
import ClinicParallax from "@/components/home/ClinicParallax";
import InstagramSection from "@/components/home/InstagramSection";
import Testimonials from "@/components/home/Testimonials";
import CtaBand from "@/components/home/CtaBand";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { FALLBACK_DOCTORS, FALLBACK_SERVICES } from "@/lib/fallback-data";

async function getFeaturedDoctors() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("doctors")
      .select("id, name, specialty_az, specialty_ru, image_url, is_guest")
      .eq("is_featured_this_week", true)
      .order("name");

    if (error || !data || data.length === 0) return FALLBACK_DOCTORS;
    return data;
  } catch {
    return FALLBACK_DOCTORS;
  }
}

async function getServices() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("services")
      .select("id, title_az, title_ru, description_az, description_ru")
      .limit(6);

    if (error || !data || data.length === 0) return FALLBACK_SERVICES;
    return data;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export default async function HomePage() {
  const locale = (await getLocale()) as "az" | "ru";
  const [doctors, services] = await Promise.all([
    getFeaturedDoctors(),
    getServices(),
  ]);

  return (
    <>
      <Hero locale={locale} />
      <AboutClinic locale={locale} />
      <WhyVitalife locale={locale} />
      <ServicesOverview services={services} />
      <WeeklyDoctors doctors={doctors} locale={locale} />
      <ClinicParallax locale={locale} />
      <ChiefDoctor locale={locale} />
      <Testimonials locale={locale} />
      <InstagramSection locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}
