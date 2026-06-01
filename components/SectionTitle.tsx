"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function SectionTitle({ title, subtitle, badge }: SectionTitleProps) {
  return (
    <div className="flex flex-col mb-8 md:mb-12">
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center self-start px-3 py-1 text-xs font-semibold tracking-wider text-orange-600 uppercase bg-orange-50 rounded-full border border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-neutral-50"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-sm text-neutral-500 sm:text-base dark:text-neutral-400 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
