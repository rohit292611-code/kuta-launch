import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin, Sparkles, Award } from "lucide-react";
import { universities } from "@/data/universities";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const RADIUS = 460;
const DWELL_MS = 10000; // pause on each university so viewers can read it

export function UniversityShowcase() {
  const items = universities;
  const count = items.length;
  const step = 360 / count;
  const prefersReduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const rotation = useMotionValue(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRot = useRef(0);
  const pausedRef = useRef(false);

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
      const nextIdx = ((nearest + 1) % count + count) % count;
      const target = -nearest * step - step; // always move forward one step
      animate(rotation, target, {
        type: "spring",
        stiffness: 70,
        damping: 20,
        onComplete: () => setActive(((nextIdx) % count + count) % count),
      });
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [rotation, step, count, prefersReduced]);

  const goTo = (idx: number) => {
    const current = rotation.get();
    const target = -idx * step;
    // shortest path
    let delta = target - current;
    delta = ((delta + 180) % 360 + 360) % 360 - 180;
    animate(rotation, current + delta, {
      type: "spring",
      stiffness: 90,
      damping: 20,
    });
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
    // snap to nearest
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
        <div
          ref={stageRef}
          onPointerEnter={() => (pausedRef.current = true)}
          onPointerLeave={() => (pausedRef.current = false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative mx-auto h-[440px] w-full max-w-2xl cursor-grab select-none touch-none active:cursor-grabbing md:h-[520px]"
          style={{ perspective: 1400 }}
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
              />
            ))}
          </motion.div>

          {/* Nav dots */}
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
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
            <div className="bg-navy p-6 text-white md:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-soft">
                <Sparkles className="h-3.5 w-3.5" /> Now spinning
              </div>
              <h3 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
                {activeUni.name}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-white/75">
                <MapPin className="h-4 w-4 text-orange" /> {activeUni.location} · Est {activeUni.established}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/80">{activeUni.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
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
            <div className="p-6 md:p-8">
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
}: {
  uni: (typeof universities)[number];
  angle: number;
  isActive: boolean;
  onClick: () => void;
  rotation: ReturnType<typeof useMotionValue<number>>;
}) {
  // brightness/opacity based on facing angle
  const opacity = useTransform(rotation, (r) => {
    const facing = Math.cos(((r + angle) * Math.PI) / 180);
    return 0.35 + 0.65 * Math.max(0, facing);
  });
  const scale = useTransform(rotation, (r) => {
    const facing = Math.cos(((r + angle) * Math.PI) / 180);
    return 0.85 + 0.2 * Math.max(0, facing);
  });

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="absolute left-1/2 top-1/2 -ml-[140px] -mt-[190px] h-[380px] w-[280px] overflow-hidden rounded-3xl border border-white/40 bg-white shadow-[0_30px_60px_-25px_rgba(15,30,61,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
      style={{
        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        opacity,
        scale,
      }}
    >
      <div className="relative h-[62%] w-full overflow-hidden">
        <img
          src={uni.image}
          alt={uni.name}
          draggable={false}
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
          <div className="text-base font-bold leading-tight text-white">{uni.name}</div>
        </div>
      </div>
      <div className="flex h-[38%] flex-col justify-between p-4">
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
