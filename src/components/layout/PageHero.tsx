import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow, title, subtitle, breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumb: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-16 text-white md:pt-40 md:pb-24">
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-orange/20 blur-3xl" />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/60">
          {breadcrumb.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              {b.to ? <Link to={b.to} className="hover:text-white">{b.label}</Link> : <span className="text-white">{b.label}</span>}
              {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3" />}
            </span>
          ))}
        </nav>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="eyebrow text-orange-soft">{eyebrow}</div>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
