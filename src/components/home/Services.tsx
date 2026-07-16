import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { educationServices, institutionalServices } from "@/data/services";
import { Section } from "@/components/ui/section";

export function Services() {
  return (
    <Section
      eyebrow="Services"
      title={<>Education support. <span className="text-orange">End-to-end.</span></>}
      subtitle="Everything a student needs — from career counselling to the final degree in hand."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {educationServices.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.05 }}
            className="surface-card group p-6 transition-transform hover:-translate-y-1"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-bold text-navy">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function GovernmentSolutions() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow justify-center text-orange-soft">Institutional Solutions</div>
          <h2 className="mt-4 text-3xl leading-[1.1] md:text-5xl">
            Powering schools, colleges & <span className="text-orange">government institutions.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/70 md:text-lg">
            Smart classrooms, CCTV, projectors, computer supply and networking — designed, installed and maintained by certified engineers.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {institutionalServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-orange/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange/15 text-orange">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold">{s.title}</h3>
              <p className="mt-1.5 text-xs text-white/60">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/institutional"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-orange hover:border-orange"
          >
            Request Institutional Proposal <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
