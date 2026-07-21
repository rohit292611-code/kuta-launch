import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Percent, ShieldCheck, Sparkles, Users, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { universities } from "@/data/universities";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships up to 30% — Kutastha Consultancy" },
      { name: "description", content: "Army 30%, Regular 25%, Distance 25% — merit, need & category scholarships across UGC recognised universities. Kutastha helps you claim every rupee you qualify for." },
      { property: "og:title", content: "Scholarships — Kutastha Consultancy" },
      { property: "og:description", content: "Army 30%, Regular 25%, Distance 25% across UGC recognised universities." },
    ],
    links: [{ rel: "canonical", href: "/scholarships" }],
  }),
  component: Scholarships,
});

const featured = [
  { icon: ShieldCheck, title: "Army & Defence", value: "Up to 30%", desc: "For serving personnel, veterans and their dependants across UG & PG programs." },
  { icon: GraduationCap, title: "Regular Programs", value: "Up to 25%", desc: "On-campus enrolments in UG & PG streams — merit + early-bird stack." },
  { icon: Sparkles, title: "Distance Programs", value: "Up to 25%", desc: "Flexible learners get merit-linked fee waivers on the full 3-year course." },
  { icon: Award, title: "Merit Scholarship", value: "Up to 30%", desc: "85%+ in qualifying exam — auto-applied at enrolment." },
];

const categories = [
  { icon: Award, title: "Merit Scholarship", desc: "Based on your academic performance in 10+2 or graduation." },
  { icon: Sparkles, title: "Early-bird", desc: "Extra 5–10% if you finish enrolment before the batch cut-off." },
  { icon: Users, title: "Category-based", desc: "Reservations & concessions for SC/ST/OBC/Divyang students." },
  { icon: Percent, title: "Need-based Aid", desc: "For students from economically weaker backgrounds." },
];

function Scholarships() {
  return (
    <>
      <PageHero
        eyebrow="Scholarships"
        title={<>Get up to <span className="text-orange">30% scholarship</span> on your degree.</>}
        subtitle="Army 30% · Regular 25% · Distance 25% — we check your profile against every scholarship you qualify for so you never leave money on the table."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Scholarships" }]}
      />

      <Section title="Featured scholarship streams" eyebrow="Headline offers">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="surface-card hover-lift relative overflow-hidden p-6"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange/10 blur-2xl" />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange text-white shadow-[0_10px_25px_-10px_rgba(234,120,40,0.6)]">
                <f.icon className="h-5 w-5" />
              </span>
              <div className="mt-5 text-3xl font-bold text-navy">{f.value}</div>
              <h3 className="mt-1 text-base font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Types of scholarships" eyebrow="What's available" className="bg-secondary/50">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((s) => (
            <div key={s.title} className="surface-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange/15 text-orange">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="University scholarship overview" eyebrow="Partner Universities">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {universities.map((u) => (
            <div key={u.slug} className="surface-card p-6">
              <div className="text-sm font-bold text-navy">{u.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{u.location}</div>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange/10 p-3 text-sm font-semibold text-orange">
                <Award className="h-4 w-4" /> {u.scholarship}
              </div>
              <Button asChild size="sm" variant="outline" className="mt-4 w-full">
                <Link to="/universities/$slug" params={{ slug: u.slug }}>View university</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl rounded-4xl bg-navy p-10 text-center text-white md:p-14">
          <h2 className="text-3xl md:text-4xl">Check your scholarship <span className="text-orange">eligibility.</span></h2>
          <p className="mt-3 text-white/75">Free 20-minute session with a certified advisor.</p>
          <Button asChild size="lg" className="mt-6 bg-orange text-white hover:bg-orange/90">
            <Link to="/contact">Book Free Counselling</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
