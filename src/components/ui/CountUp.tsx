"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

// Parses "5 000+" → { value: 5000, prefix: "", suffix: "+" }
function parse(raw: string): { value: number; prefix: string; suffix: string } {
  const m = raw.match(/^([^\d]*)(\d[\d\s]*)(.*)$/);
  if (!m) return { value: 0, prefix: "", suffix: raw };
  return {
    value: parseInt(m[2].replace(/\s/g, ""), 10),
    prefix: m[1],
    suffix: m[3],
  };
}

function fmt(n: number): string {
  // Thousands with thin-space: 5000 → "5 000"
  return n >= 1000
    ? n.toLocaleString("en-US").replace(",", " ")
    : String(n);
}

type Props = {
  value: string;       // e.g. "10+", "5 000+", "20+"
  duration?: number;   // seconds
};

export function CountUp({ value: raw, duration = 1.4 }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { value, prefix, suffix } = parse(raw);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) { setCount(value); return; }
    if (!inView) return;
    let id: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      // ease-out cubic
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {fmt(count)}
      {suffix}
    </span>
  );
}
