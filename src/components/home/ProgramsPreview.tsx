import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { programs, programCategories, type ProgramCategory } from "@/data/programs";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function ProgramsPreview() {
  const [active, setActive] = useState<"All" | ProgramCategory>("All");
  const filtered = active === "All" ? programs : programs.filter((p) => p.category === active);

  return (
    <Section
      eyebrow="Programs"
      title={<>Find the degree that <span className="text-orange">fits your future.</span></>}
      subtitle="Filter by discipline. Every program is delivered by a UGC-recognised partner university."
      className="bg-secondary/50"
    >
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {(["All", ...programCategories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              active === c
                ? "border-navy bg-navy text-white"
                : "border-hairline bg-card text-foreground/80 hover:border-navy/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.slice(0, 6).map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="surface-card group flex flex-col p-6"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-orange/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">{p.code}</span>
                <span className="text-xs text-muted-foreground">{p.duration}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-tight text-navy">{p.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.description}</p>

              <dl className="mt-5 space-y-2 text-xs">
                <Row k="Eligibility" v={p.eligibility} />
                <Row k="Mode" v={p.mode.join(" · ")} />
                <Row k="Scholarship" v={p.scholarship} />
              </dl>

              <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5" /> {p.universities.length} Universities
                </span>
                <Link to="/admissions" className="inline-flex items-center gap-1 text-xs font-semibold text-navy transition-colors group-hover:text-orange">
                  Apply <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/programs">Browse All Programs</Link>
        </Button>
      </div>
    </Section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium text-foreground/90">{v}</dd>
    </div>
  );
}
