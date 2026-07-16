import { motion } from "framer-motion";
import { whyChoose } from "@/data/misc";
import { Section } from "@/components/ui/section";
import { ShieldCheck } from "lucide-react";

export function WhyChoose() {
  return (
    <Section
      eyebrow="Why Kutastha"
      title={<>Trusted for the right reasons.</>}
      subtitle="Parents and students choose us because we do the work that others quietly skip."
      className="bg-navy text-white"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-orange/40"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange/15 text-orange">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
            <p className="mt-2 text-sm text-white/70">{w.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
