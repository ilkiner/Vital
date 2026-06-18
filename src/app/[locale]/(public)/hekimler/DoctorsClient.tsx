"use client";

import { motion, useReducedMotion } from "motion/react";
import DoctorCard, { type DoctorCardDoctor } from "@/components/ui/DoctorCard";

type Props = {
  doctors: DoctorCardDoctor[];
  locale: "az" | "ru";
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function DoctorsGrid({ doctors, locale }: Props) {
  const reduced = useReducedMotion() ?? false;

  function doctorHref(id: string) {
    return locale === "ru" ? `/ru/hekimler/${id}` : `/hekimler/${id}`;
  }

  const cardAnim = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: {
            duration: 0.48,
            delay: Math.min(i * 0.07, 0.42),
            ease,
          },
        };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {doctors.map((doctor, i) => (
        <motion.div key={doctor.id} {...cardAnim(i)}>
          <DoctorCard
            doctor={doctor}
            locale={locale}
            href={doctorHref(doctor.id)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </motion.div>
      ))}
    </div>
  );
}
