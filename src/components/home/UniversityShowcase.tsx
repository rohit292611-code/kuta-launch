import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin, Sparkles, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { universities } from "@/data/universities";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const DWELL_MS = 10000; // pause on each university so viewers can read it

export function UniversityShowcase() {
  const items = universities;
  const count = items.length;
  const step = 360 / count;
  const prefersReduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ radius: 260, cardW: 220, cardH: 300, stageH: 380 });
  const rotation = useMotionValue(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRot = useRef(0);
  const pausedRef = useRef(false);

  // Responsive stage dimensions so every card stays visible on any screen
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDims({ radius: 220, cardW: 200, cardH: 280, stageH: 360 });
      } else if (w < 1024) {
        setDims({ radius: 360, cardW: 240, cardH: 340, stageH: 440 });
      } else {
        setDims({ radius: 460, cardW: 280, cardH: 380, stageH: 520 });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Sync active index from rotation
  useEffect(() => {
    const unsub = rotation.on("change", (v) => {
      const idx = ((Math.round(-v / step) % count) + count) % count;
      setActive(idx);
    });
    return () => unsub();
  }, [rotation, step, count]);

  // Autoplay: advance one card, dwell, then advance again — so every university is fully visible
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => {
      if (pausedRef.current || isDragging.current) return;
      const current = rotation.get();
      const nearest = Math.round(-current / step);
      const target = -nearest * step - step; // always move forward one step
      animate(rotation, target, {
        type: "spring",
        stiffness: 70,
        damping: 20,
      });
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [rotation, step, count, prefersReduced]);

  const goTo = (idx: number) => {
    const current = rotation.get();
    const target = -idx * step;
    let delta = target - current;
    delta = ((delta + 180) % 360 + 360) % 360 - 180;
    animate(rotation, current + delta, {
      type: "spring",
      stiffness: 90,
      damping: 20,
    });
  };

  const nudge = (dir: 1 | -1) => {
    const current = rotation.get();
    const nearest = Math.round(-current / step);
    const target = -(nearest + dir) * step;
    animate(rotation, target, { type: "spring", stiffness: 90, damping: 20 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startRot.current = rotation.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    rotation.set(startRot.current + dx * 0.35);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    const current = rotation.get();
    const nearest = Math.round(-current / step);
    const target = -nearest * step;
    animate(rotation, target, { type: "spring", stiffness: 120, damping: 22 });
  };

  const activeUni = items[active];

  return (
    <Section
      id="showcase"
      eyebrow="Partner Universities"
      title={
        <>
          Spin through India's top <span className="text-orange">UGC universities.</span>
        </>
      }
      subtitle="Drag, swipe or let it rotate — every card links to real programs, scholarships and admissions."
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-navy/10 blur-3xl" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        {/* 3D Carousel */}
        <div className="relative">
          <div
            ref={stageRef}
            onPointerEnter={() => (pausedRef.current = true)}
            onPointerLeave={() => (pausedRef.current = false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative mx-auto w-full cursor-grab select-none touch-none active:cursor-grabbing"
            style={{ perspective: 1400, height: dims.stageH }}
          >
            {/* Reflective floor */}
            <div className="pointer-events-none absolute inset-x-10 bottom-6 h-16 rounded-[100%] bg-navy/20 blur-2xl" />

            <motion.div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                rotateY: rotation,
              }}
            >
              {items.map((u, i) => (
                <OrbitCard
                  key={u.slug}
                  uni={u}
                  angle={i * step}
                  isActive={i === active}
                  onClick={() => goTo(i)}
                  rotation={rotation}
                  cardW={dims.cardW}
                  cardH={dims.cardH}
                  radius={dims.radius}
                />
              ))}
            </motion.div>
          </div>

          {/* Prev/Next controls */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              aria-label="Previous university"
              onClick={() => nudge(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-background text-navy shadow-sm transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-orange" : "w-3 bg-navy/25 hover:bg-navy/50"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next university"
              onClick={() => nudge(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-background text-navy shadow-sm transition-colors hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Live details panel */}
        <motion.div
          key={activeUni.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="surface-card overflow-hidden">
            <div className="relative h-40 w-full overflow-hidden md:h-48">
              <img src={activeUni.image} alt={activeUni.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-x-4 bottom-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-soft">
                  <Sparkles className="h-3.5 w-3.5" /> Now spinning
                </div>
                <div className="mt-1 text-lg font-bold text-white md:text-xl">{activeUni.name}</div>
              </div>
            </div>
            <div className="bg-navy p-6 text-white md:p-7">
              <div className="flex items-center gap-1.5 text-sm text-white/75">
                <MapPin className="h-4 w-4 text-orange" /> {activeUni.location} · Est {activeUni.established}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{activeUni.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {activeUni.approvals.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white"
                  >
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
                  <span
                    key={p}
                    className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-foreground/80"
                  >
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
      </div>

      <div className="mt-10 text-center">
        <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90">
          <Link to="/universities">Explore all universities</Link>
        </Button>
      </div>
    </Section>
  );
}

function OrbitCard({
  uni,
  angle,
  isActive,
  onClick,
  rotation,
  cardW,
  cardH,
  radius,
}: {
  uni: (typeof universities)[number];
  angle: number;
  isActive: boolean;
  onClick: () => void;
  rotation: ReturnType<typeof useMotionValue<number>>;
  cardW: number;
  cardH: number;
  radius: number;
}) {
  const opacity = useTransform(rotation, (r) => {
    const facing = Math.cos(((r + angle) * Math.PI) / 180);
    return 0.3 + 0.7 * Math.max(0, facing);
  });
  const scale = useTransform(rotation, (r) => {
    const facing = Math.cos(((r + angle) * Math.PI) / 180);
    return 0.82 + 0.22 * Math.max(0, facing);
  });

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="absolute left-1/2 top-1/2 overflow-hidden rounded-3xl border border-white/40 bg-white shadow-[0_30px_60px_-25px_rgba(15,30,61,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
      style={{
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        opacity,
        scale,
      }}
    >
      <div className="relative h-[62%] w-full overflow-hidden bg-navy/10">
        <img
          src={uni.image}
          alt={uni.name}
          draggable={false}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {uni.approvals.slice(0, 2).map((a) => (
            <span
              key={a}
              className="rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-navy"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
            {uni.location}
          </div>
          <div className="text-sm font-bold leading-tight text-white md:text-base">{uni.name}</div>
        </div>
      </div>
      <div className="flex h-[38%] flex-col justify-between p-3 md:p-4">
        <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
          {uni.tagline}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
            {isActive ? "Featured" : "Tap to focus"}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
