import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Percent, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { universities } from "@/data/universities";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships up to 30% — Kutastha Consultancy" },
      { name: "description", content: "Merit, need and category based scholarships up to 30% across UGC recognised universities. Kutastha helps you claim what you qualify for." },
    ],
    links: [{ rel: "canonical", href: "/scholarships" }],
  }),
  component: Scholarships,
});

function Scholarships() {
  return (
    <>
      <PageHero
        eyebrow="Scholarships"
        title={<>Get up to <span className="text-orange">30% scholarship</span> on your degree.</>}
        subtitle="We check your profile against every scholarship you qualify for — merit, need, category and early-bird — so you never leave money on the table."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Scholarships" }]}
      />
      <Section title="Types of scholarships" eyebrow="What's available">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: "Merit Scholarship", desc: "Based on your academic performance in 10+2 or graduation." },
            { icon: Sparkles, title: "Early-bird", desc: "Extra 5–10% if you finish enrolment before the batch cut-off." },
            { icon: Users, title: "Category-based", desc: "Reservations & concessions for SC/ST/OBC/Divyang students." },
            { icon: Percent, title: "Need-based Aid", desc: "For students from economically weaker backgrounds." },
          ].map((s) => (
            <div key={s.title} className="surface-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange/15 text-orange"><s.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-base font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="University scholarship overview" eyebrow="Partner Universities" className="bg-secondary/50">
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
