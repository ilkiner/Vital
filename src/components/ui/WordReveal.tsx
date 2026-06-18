"use client";

import { motion, useReducedMotion } from "motion/react";

// Emil-style mask reveal: each word slides up from behind a clip boundary
const ease = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;       // initial offset before stagger starts
  stagger?: number;     // delay between words
  duration?: number;
};

export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.065,
  duration = 0.55,
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    // aria-label on parent so screen readers read the full sentence
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden leading-[1.15]"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "108%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-32px" }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease,
            }}
          >
            {word}
          </motion.span>
          {/* non-breaking space between words */}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
