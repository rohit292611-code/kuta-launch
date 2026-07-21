import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin, Sparkles, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { universities } from "@/data/universities";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import fallbackImg from "@/assets/campus-life-1.jpg";

const DWELL_MS = 2800;

export function UniversityShowcase() {
  const items = universities;
  const count = items.length;
  const prefersReduced = useReducedMotion();

  const [[active, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = (delta: 1 | -1) =>
    setState(([i]) => [((i + delta) % count + count) % count, delta]);

  const goTo = (idx: number) =>
    setState(([i]) => [idx, (idx > i ? 1 : -1) as 1 | -1]);

  useEffect(() => {
    if (prefersReduced || paused) return;
    const id = setTimeout(() => go(1), DWELL_MS);
    return () => clearTimeout(id);
  }, [active, paused, prefersReduced]);

  const activeUni = items[active];

  return (
    <Section
      id="showcase"
      eyebrow="Partner Universities"
      title={<>Meet India's top <span className="text-orange">UGC universities.</span></>}
      subtitle="Each card holds ~3 seconds — swipe, click the arrows or let it rotate through every partner."
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-navy/10 blur-3xl" />
      </div>

      <div
        className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Single spinning card stage */}
        <div className="relative mx-auto w-full max-w-md">
          <div
            className="relative mx-auto h-[440px] w-full sm:h-[500px]"
            style={{ perspective: 1400 }}
          >
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={activeUni.slug}
                custom={dir}
                initial={{ x: dir === 1 ? 80 : -80, opacity: 0, scale: 0.96 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: dir === 1 ? -80 : 80, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="absolute inset-0 overflow-hidden rounded-3xl border border-white/40 bg-white shadow-[0_40px_80px_-30px_rgba(15,30,61,0.55)]"
              >
                <UniCardBody uni={activeUni} />
              </motion.div>
            </AnimatePresence>

            {/* Floor glow */}
            <div className="pointer-events-none absolute inset-x-8 -bottom-2 h-10 rounded-[100%] bg-navy/25 blur-2xl" />
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              aria-label="Previous"
              onClick={() => go(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-background text-navy shadow-sm transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((u, i) => (
                <button
                  key={u.slug}
                  aria-label={`Show ${u.name}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-orange" : "w-3 bg-navy/25 hover:bg-navy/50"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next"
              onClick={() => go(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-background text-navy shadow-sm transition-colors hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            {active + 1} / {count} · auto-advances every 3s
          </div>
        </div>

        {/* Live details panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUni.slug + "-panel"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="surface-card overflow-hidden">
              <div className="bg-navy p-6 text-white md:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-soft">
                  <Sparkles className="h-3.5 w-3.5" /> Now spinning
                </div>
                <h3 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">{activeUni.name}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-white/75">
                  <MapPin className="h-4 w-4 text-orange" /> {activeUni.location} · Est {activeUni.established}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{activeUni.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeUni.approvals.map((a) => (
                    <span key={a} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold text-orange">
                  <Award className="h-4 w-4" /> {activeUni.scholarship}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeUni.programs.slice(0, 6).map((p) => (
                    <span key={p} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-foreground/80">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button asChild size="sm" className="bg-orange text-white hover:bg-orange/90">
                    <Link to="/universities/$slug" params={{ slug: activeUni.slug }}>
                      View Details <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href={activeUni.website} target="_blank" rel="noreferrer noopener">
                      Official site <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="text-navy">
                    <Link to="/admissions">Apply Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center">
        <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90">
          <Link to="/universities">Explore all universities</Link>
        </Button>
      </div>
    </Section>
  );
}

function UniCardBody({ uni }: { uni: (typeof universities)[number] }) {
  return (
    <>
      <div className="relative h-[62%] w-full overflow-hidden bg-navy/10">
        <img
          src={uni.image || fallbackImg}
          alt={uni.name}
          draggable={false}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImg;
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {uni.approvals.slice(0, 3).map((a) => (
            <span key={a} className="rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">
              {a}
            </span>
          ))}
        </div>
        <div className="absolute inset-x-4 bottom-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-white/80">{uni.location}</div>
          <div className="text-xl font-bold leading-tight text-white md:text-2xl">{uni.name}</div>
        </div>
      </div>
      <div className="flex h-[38%] flex-col justify-between p-5">
        <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">{uni.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange">Featured</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </>
  );
}
