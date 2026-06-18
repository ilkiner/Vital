import { getLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import WeeklyDoctors from "@/components/home/WeeklyDoctors";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyVitalife from "@/components/home/WhyVitalife";
import InstagramSection from "@/components/home/InstagramSection";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

async function getFeaturedDoctors() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("doctors")
      .select("id, name, specialty_az, specialty_ru, image_url, is_guest")
      .eq("is_featured_this_week", true)
      .order("name");

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

async function getServices() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("services")
      .select("id, title_az, title_ru, description_az, description_ru")
      .limit(4);

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
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
      {doctors.length > 0 && (
        <WeeklyDoctors doctors={doctors} locale={locale} />
      )}
      {services.length > 0 && (
        <ServicesOverview services={services} />
      )}
      <WhyVitalife locale={locale} />
      <InstagramSection locale={locale} />
    </>
  );
}
