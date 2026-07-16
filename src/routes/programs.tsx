import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { programs, programCategories, programModes, type ProgramCategory, type ProgramMode } from "@/data/programs";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Degrees — Kutastha Consultancy" },
      { name: "description", content: "Browse UG & PG degree programs — B.Com, M.Com, BBA, MBA, B.Sc, M.Sc, BCA, MCA, BA, MA — offered by our partner universities across Online, Distance and Regular modes." },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const [cat, setCat] = useState<"All" | ProgramCategory>("All");
  const [mode, setMode] = useState<"All" | ProgramMode>("All");

  const filtered = programs.filter(
    (p) => (cat === "All" || p.category === cat) && (mode === "All" || p.mode.includes(mode)),
  );

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={<>Find the degree that <span className="text-orange">fits your future.</span></>}
        subtitle="Filter by discipline & mode. Every program is delivered by a UGC-recognised partner university."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Programs" }]}
      />
      <div className="container-x py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...programCategories] as const).map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${cat === c ? "border-navy bg-navy text-white" : "border-hairline bg-card text-foreground/80 hover:border-navy/40"}`}>{c}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", ...programModes] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${mode === m ? "border-orange bg-orange text-white" : "border-hairline bg-card text-foreground/80 hover:border-orange/40"}`}>{m}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div key={p.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="surface-card flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-orange/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">{p.code}</span>
                  <span className="text-xs text-muted-foreground">{p.duration}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <dl className="mt-5 space-y-2 text-xs">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Eligibility</dt><dd className="text-right font-medium">{p.eligibility}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Mode</dt><dd className="text-right font-medium">{p.mode.join(" · ")}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Scholarship</dt><dd className="text-right font-medium">{p.scholarship}</dd></div>
                </dl>
                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><GraduationCap className="h-3.5 w-3.5" />{p.universities.length} Universities</span>
                  <Link to="/admissions" className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-orange">Apply <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No programs match your filters.</div>
        )}
      </div>
    </>
  );
}
