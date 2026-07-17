import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  Award, Check, ExternalLink, MapPin, ArrowRight, Users, Building2,
  GraduationCap, ChevronLeft, ChevronRight, Sparkles, Clock, Wallet, Layers, Trophy, Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  findUniversity, universities, deriveCourseDetails,
  defaultScholarshipTiers, defaultStats, sharedCampusGallery,
  type University, type CourseDetail,
} from "@/data/universities";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/universities/$slug")({
  loader: ({ params }): University => {
    const u = findUniversity(params.slug);
    if (!u) throw notFound();
    return u;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "University · Kutastha" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.name} — Admissions | Kutastha` },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: loaderData.name },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:image", content: loaderData.image },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/universities/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/universities/${params.slug}` }],
    };
  },
  component: UniversityDetail,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy">University not found</h1>
        <Link to="/universities" className="mt-4 inline-block text-orange">← Back to universities</Link>
      </div>
    </div>
  ),
});

/* -------------------- Animated Counter -------------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{Math.round(val)}{suffix}</span>;
}

/* -------------------- Spinning Approvals Ring -------------------- */
function ApprovalRing({ approvals, image }: { approvals: string[]; image: string }) {
  const radius = 120;
  const count = approvals.length;
  return (
    <div className="relative mx-auto h-[320px] w-[320px] md:h-[380px] md:w-[380px]">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {approvals.map((a, i) => {
          const angle = (i / count) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={a}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <div className="rounded-full border border-orange/30 bg-white px-3 py-1.5 text-[11px] font-bold text-navy shadow-lg whitespace-nowrap">
                {a}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      {/* center medallion */}
      <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_60px_-20px_rgba(15,30,61,0.6)]">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-3 text-center text-[10px] font-bold uppercase tracking-widest text-white">
          Recognised
        </div>
      </div>
      {/* dashed orbit */}
      <div className="pointer-events-none absolute inset-6 rounded-full border border-dashed border-navy/15" />
    </div>
  );
}

/* -------------------- Tilt Course Card -------------------- */
function CourseCard({ c, i }: { c: CourseDetail; i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 200, damping: 20 });
  const catColor = c.category === "PG" ? "bg-navy text-white" : c.category === "Diploma" ? "bg-orange text-white" : "bg-orange-soft text-navy";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left - r.width / 2);
          y.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="group relative h-full rounded-3xl border border-hairline bg-card p-6 shadow-[var(--shadow-elegant)] transition-shadow duration-500 hover:shadow-[var(--shadow-float)]"
      >
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
        <div className="flex items-start justify-between">
          <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", catColor)}>{c.category}</span>
          <GraduationCap className="h-5 w-5 text-orange" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy">{c.name}</h3>
        <div className="mt-4 space-y-2 text-sm text-foreground/75">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-orange" /> {c.duration}</div>
          <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-orange" /> {c.mode}</div>
          <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-orange" /> {c.fee}</div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-xs font-semibold text-navy">
          <span>Apply for {c.name}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------- Embla Campus Gallery -------------------- */
function CampusGallery({ images }: { images: string[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", dragFree: false });
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!embla) return;
    const onSel = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSel); onSel();
    const id = setInterval(() => embla.scrollNext(), 4500);
    return () => { clearInterval(id); embla.off("select", onSel); };
  }, [embla]);
  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-3xl">
        <div className="flex">
          {images.map((src, i) => (
            <div key={i} className="relative min-w-0 shrink-0 grow-0 basis-full md:basis-[70%] lg:basis-[55%] pr-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                <img src={src} alt={`Campus ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <div className="text-[10px] uppercase tracking-widest text-orange-soft">Campus · {String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-1 text-lg font-semibold">Life at campus</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                selected === i ? "w-10 bg-orange" : "w-4 bg-navy/20 hover:bg-navy/40"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => embla?.scrollPrev()} className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-card text-navy hover:bg-navy hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => embla?.scrollNext()} className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-card text-navy hover:bg-navy hover:text-white transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Marquee Recruiters -------------------- */
function RecruiterMarquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {loop.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-5 py-2.5 text-sm font-semibold text-navy whitespace-nowrap">
            <Trophy className="h-4 w-4 text-orange" />{p}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------- Component -------------------- */
function UniversityDetail() {
  const u = Route.useLoaderData() as University;
  const courses = deriveCourseDetails(u);
  const tiers = u.scholarshipTiers ?? defaultScholarshipTiers;
  const stats = u.stats ?? defaultStats;
  const gallery = u.campusGallery ?? [u.image, ...sharedCampusGallery];

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-24 text-white md:pt-40 md:pb-32">
        <motion.img
          src={u.image} alt=""
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/95 to-navy/60" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container-x relative">
          <nav className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> / <Link to="/universities" className="hover:text-white">Universities</Link> / <span className="text-white">{u.short}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <motion.span
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-soft"
              >
                <Sparkles className="h-3.5 w-3.5" /> Empanelled Partner
              </motion.span>
              <h1 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{u.name}</h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-orange" />{u.location}</span>
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-orange" />Est. {u.established}</span>
                <a href={u.website} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:text-white">
                  <ExternalLink className="h-4 w-4 text-orange" />Official website
                </a>
              </div>
              <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">{u.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-orange text-white hover:bg-orange/90">
                  <Link to="/admissions">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <Link to="/contact">Free Counselling</Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {u.categories.map((c) => (
                  <span key={c} className="rounded-md bg-white/10 border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">{c}</span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
              className="flex justify-center"
            >
              <ApprovalRing approvals={u.approvals} image={u.image} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- STATS STRIP ---------- */}
      <section className="border-y border-hairline bg-card">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-navy">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <Section title={<>About <span className="text-orange">{u.short}</span></>} eyebrow="Overview">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-base leading-relaxed text-foreground/85">{u.about}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {u.highlights.map((h) => (
                <motion.div
                  key={h}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-hairline bg-card p-4"
                >
                  <Award className="h-5 w-5 text-orange" />
                  <div className="mt-2 text-sm font-semibold text-navy">{h}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy">Approvals</h3>
            <ul className="mt-3 space-y-2">
              {u.approvals.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-foreground/80"><Check className="h-4 w-4 text-orange" />{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------- CAMPUS GALLERY (embla) ---------- */}
      <Section title="Life on Campus" eyebrow="Gallery" className="bg-secondary/50">
        <div className="mx-auto max-w-6xl">
          <CampusGallery images={gallery} />
        </div>
      </Section>

      {/* ---------- COURSES (tilt cards) ---------- */}
      <Section title="Programs & Course Details" eyebrow="Courses Offered">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => <CourseCard key={c.name} c={c} i={i} />)}
        </div>
      </Section>

      {/* ---------- SCHOLARSHIP SLIDERS ---------- */}
      <Section title={<span className="text-white">Scholarships & Fee Waivers</span>} eyebrow="Scholarships" className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-orange-soft">Headline offer</div>
            <h3 className="mt-2 text-3xl md:text-4xl text-white">{u.scholarship}</h3>
            <p className="mt-4 text-white/70">
              Combine tiers where eligible. Our advisors optimise your discount stack before you pay a rupee.
            </p>
            <Button asChild size="lg" className="mt-6 bg-orange text-white hover:bg-orange/90">
              <Link to="/scholarships">Check my eligibility <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="space-y-6">
            {tiers.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Star className="h-4 w-4 text-orange" /> {t.label}
                    </div>
                    <div className="mt-0.5 text-xs text-white/60">{t.criteria}</div>
                  </div>
                  <div className="text-2xl font-bold text-orange">{t.discount}%</div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${t.discount}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.08 }}
                    className="h-full rounded-full bg-gradient-to-r from-orange to-orange-soft"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- ELIGIBILITY ---------- */}
      <Section title="Eligibility" eyebrow="Requirements">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <motion.div whileHover={{ y: -4 }} className="surface-card p-6">
            <div className="eyebrow">Undergraduate</div>
            <p className="mt-3 text-sm text-foreground/80">{u.eligibility.ug}</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="surface-card p-6">
            <div className="eyebrow">Postgraduate</div>
            <p className="mt-3 text-sm text-foreground/80">{u.eligibility.pg}</p>
          </motion.div>
        </div>
      </Section>

      {/* ---------- ADMISSION TIMELINE ---------- */}
      <Section title="Admission Process" eyebrow="How to apply" className="bg-secondary/50">
        <div className="mx-auto max-w-5xl">
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-hairline md:left-1/2" />
            <ol className="space-y-8">
              {u.admissionSteps.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={cn(
                    "relative pl-14 md:w-1/2 md:pl-0",
                    i % 2 === 0 ? "md:pr-12 md:text-right md:mr-auto" : "md:pl-12 md:ml-auto"
                  )}
                >
                  <div className={cn(
                    "absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-orange text-sm font-bold text-white shadow-md",
                    "md:left-auto md:right-[-18px]",
                    i % 2 !== 0 && "md:left-[-18px] md:right-auto"
                  )}>
                    {i + 1}
                  </div>
                  <div className="surface-card p-5">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Step {i + 1}</div>
                    <p className="mt-1 text-base font-semibold text-navy">{s}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ---------- RECRUITERS MARQUEE ---------- */}
      <Section title="Recruiters & Placement" eyebrow="Careers">
        <div className="mx-auto max-w-6xl">
          <RecruiterMarquee items={u.placement} />
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section title="Frequently Asked Questions" eyebrow="FAQ" className="bg-secondary/50">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible>
            {u.faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-b border-hairline">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ---------- CTA + RELATED ---------- */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-4xl bg-navy p-10 text-center text-white md:p-14 relative"
        >
          <div className="absolute inset-0 grid-pattern opacity-15" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl">Ready to apply to <span className="text-orange">{u.short}</span>?</h2>
            <p className="mt-3 text-white/75">Our advisors will guide you through the entire admission process — for free.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-orange text-white hover:bg-orange/90"><Link to="/admissions">Start Application</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"><Link to="/contact">Talk to Counsellor</Link></Button>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-16 max-w-6xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">Explore other universities</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {universities.filter((x) => x.slug !== u.slug).slice(0, 4).map((x) => (
              <Link key={x.slug} to="/universities/$slug" params={{ slug: x.slug }} className="surface-card group overflow-hidden">
                <div className="overflow-hidden">
                  <img src={x.image} alt={x.name} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-navy">{x.name}</div>
                  <div className="text-xs text-muted-foreground">{x.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
