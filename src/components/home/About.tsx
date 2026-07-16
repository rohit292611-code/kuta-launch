import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { whyChoose } from "@/data/misc";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-1.jpg";

export function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-3xl bg-orange/15 grid-pattern" />
          <img src={hero} alt="Kutastha students on campus" loading="lazy"
               className="relative rounded-3xl object-cover shadow-[var(--shadow-float)]" />
          <div className="absolute -bottom-6 -right-4 w-52 surface-card p-5 md:-right-8">
            <div className="text-3xl font-bold text-navy">10<span className="text-orange">+</span></div>
            <div className="mt-1 text-xs text-muted-foreground">Years of guiding students across Bihar & India</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">About Kutastha</div>
          <h2 className="mt-4 text-3xl leading-[1.1] text-navy md:text-5xl">
            A consultancy parents trust. A partner students grow with.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            From Patna to the rest of India, Kutastha has helped over 12,000 students secure admissions in UGC recognised universities — with honest counselling, transparent fees and lifetime support.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {whyChoose.slice(0, 6).map((w) => (
              <li key={w.title} className="flex items-start gap-3 rounded-xl border border-hairline bg-card p-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-navy">{w.title}</div>
                  <div className="text-xs text-muted-foreground">{w.desc}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="btn-magnetic bg-navy text-white hover:bg-navy/90">
              <Link to="/about">Our Story</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Talk to an Advisor</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
