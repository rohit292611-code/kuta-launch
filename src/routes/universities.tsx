import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowUpRight, Award, MapPin, GraduationCap, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { universities, type University } from "@/data/universities";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title: "Partner Universities — Kutastha Consultancy" },
      { name: "description", content: "Explore UGC, NAAC & AICTE recognised partner universities offering Online, Distance and Regular degree programs through Kutastha." },
      { property: "og:title", content: "Partner Universities — Kutastha" },
      { property: "og:description", content: "UGC recognised universities for Online, Distance & Regular degrees." },
    ],
    links: [{ rel: "canonical", href: "/universities" }],
  }),
  component: UniversitiesPage,
});

const categoryLabel = (u: University) => {
  const name = u.name.toLowerCase();
  if (name.includes("open") || name.includes("ignou")) return "Open University";
  if (u.approvals.some((a) => a.toLowerCase().includes("deemed"))) return "Deemed University";
  return "Private University";
};

function UniversitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner Universities"
        title={<>Universities that <span className="text-orange">actually</span> care about your future.</>}
        subtitle="Every university on our panel is UGC recognised. Most carry NAAC A or A+ accreditation. Swipe through, explore, then apply directly to the official portal."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Universities" }]}
      />

      <CoverflowSection />

      <section className="container-x pb-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">All partners</p>
            <h2 className="mt-1 text-2xl font-bold text-navy md:text-3xl">Complete panel · {universities.length} universities</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {universities.map((u, i) => (
            <motion.article
              key={u.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group surface-card overflow-hidden"
            >
              <Link to="/universities/$slug" params={{ slug: u.slug }} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={u.image} alt={u.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                    {u.approvals.slice(0, 3).map((a) => (
                      <span key={a} className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-navy">{a}</span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/80"><MapPin className="h-3.5 w-3.5" /> {u.location}</div>
                    <h3 className="mt-1 text-lg font-bold text-white">{u.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-orange"><Award className="h-3.5 w-3.5" />{u.scholarship}</div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{u.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {u.programs.slice(0, 5).map((p) => (
                      <span key={p} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-foreground/80">{p}</span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-between border-t border-hairline px-6 py-4">
                <a
                  href={u.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-orange"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Official site
                </a>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><GraduationCap className="h-3.5 w-3.5" />Est. {u.established}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}

/* --------------------------------- Coverflow --------------------------------- */

function CoverflowSection() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [tweens, setTweens] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();
    const styles = embla.scrollSnapList().map((snap, i) => {
      let diff = snap - scrollProgress;
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (i === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diff = snap - (1 + scrollProgress);
            if (sign === 1) diff = snap + (1 - scrollProgress);
          }
        });
      }
      return diff;
    });
    setTweens(styles);
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    onScroll();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
    embla.on("reInit", () => { onSelect(); onScroll(); });
  }, [embla, onSelect, onScroll]);

  // Autoplay
  useEffect(() => {
    if (!embla) return;
    const id = window.setInterval(() => embla.scrollNext(), 4200);
    return () => window.clearInterval(id);
  }, [embla]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background py-16 md:py-24">
      <div className="container-x mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">Featured Partners</p>
        <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">Meet our universities in <span className="text-orange">3D.</span></h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Swipe or use the arrows — the centered card is your next campus.</p>
      </div>

      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden px-[10%]">
          <div className="flex touch-pan-y">
            {universities.map((u, i) => {
              const t = tweens[i] ?? 0;
              const abs = Math.min(Math.abs(t), 1);
              const scale = 1 - abs * 0.22;
              const rotate = t * -28;
              const translateY = abs * 24;
              const opacity = 1 - abs * 0.35;
              return (
                <div
                  key={u.slug}
                  className="min-w-0 shrink-0 grow-0 basis-[78%] px-3 sm:basis-[52%] md:basis-[42%] lg:basis-[32%]"
                  style={{ perspective: "1400px" }}
                >
                  <motion.div
                    style={{
                      transform: `translateY(${translateY}px) rotateY(${rotate}deg) scale(${scale})`,
                      opacity,
                      transformStyle: "preserve-3d",
                    }}
                    className="rounded-3xl bg-card shadow-[0_20px_60px_-20px_rgba(9,15,45,0.35)] ring-1 ring-hairline"
                  >
                    <CoverflowCard u={u} active={i === selected} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <button
          aria-label="Previous"
          onClick={() => embla?.scrollPrev()}
          className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-navy p-3 text-white shadow-lg transition hover:bg-orange md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => embla?.scrollNext()}
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-navy p-3 text-white shadow-lg transition hover:bg-orange md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === selected ? "w-8 bg-orange" : "w-2 bg-navy/25"}`}
          />
        ))}
      </div>
    </section>
  );
}

function CoverflowCard({ u, active }: { u: University; active: boolean }) {
  const stats = [
    { label: "Programs", value: `${u.programs.length}+` },
    { label: "Approvals", value: `${u.approvals.length}` },
    { label: "Scholarship", value: u.scholarship.match(/\d+%/)?.[0] ?? "25%" },
  ];
  return (
    <article className="overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={u.image} alt={u.name} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />

        {/* Monogram + category */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white font-bold shadow-lg">
            {u.short?.[0] ?? u.name[0]}
          </span>
          <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy shadow">
            {categoryLabel(u)}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-1.5 text-xs text-white/80"><MapPin className="h-3.5 w-3.5" /> {u.location}</div>
          <h3 className="mt-1 text-xl font-bold leading-tight md:text-2xl">{u.name}</h3>
        </div>
      </div>

      <div className="space-y-4 p-5 md:p-6">
        <div className="flex flex-wrap gap-1.5">
          {u.approvals.slice(0, 4).map((a) => (
            <span key={a} className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-semibold text-orange">
              <CheckCircle2 className="h-3 w-3" /> {a}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 divide-x divide-hairline rounded-2xl bg-secondary/60 p-3 text-center">
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-1 text-lg font-bold text-navy">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="flex-1 bg-navy text-white hover:bg-navy/90">
            <Link to="/universities/$slug" params={{ slug: u.slug }}>
              View Details <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-orange/40 text-orange hover:bg-orange hover:text-white" tabIndex={active ? 0 : -1}>
            <a href={u.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${u.name} official website`}>
              Apply <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
