import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { stats, whyChoose } from "@/data/misc";
import { Counter } from "@/components/ui/counter";
import hero from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kutastha Consultancy Services" },
      { name: "description", content: "Kutastha Consultancy — a Patna-based education & institutional-solutions company helping 12,000+ students and dozens of institutions since 2015." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  { year: "2015", title: "Founded in Patna", desc: "Kutastha begins as a small career counselling desk in Patna, Bihar." },
  { year: "2017", title: "First 1,000 admissions", desc: "Crossed 1,000 successful admissions across UGC-recognised universities." },
  { year: "2019", title: "Institutional practice", desc: "Launched IT & smart classroom services for schools and colleges." },
  { year: "2021", title: "Pan-India online", desc: "Scaled counselling & enrolments across India through digital-first onboarding." },
  { year: "2024", title: "12,000+ students guided", desc: "Recognised as one of eastern India's most trusted admissions consultancies." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Kutastha"
        title={<>A consultancy built on <span className="text-orange">honesty.</span></>}
        subtitle="Since 2015, we've been helping students and institutions across India make confident, well-informed education decisions."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <img src={hero} alt="Kutastha" loading="lazy" className="rounded-3xl object-cover shadow-[var(--shadow-float)]" />
          <div>
            <div className="eyebrow">Our Mission</div>
            <h2 className="mt-3 text-3xl leading-[1.1] text-navy md:text-5xl">Make quality higher education accessible — <span className="text-orange">without middlemen or drama.</span></h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              We believe every student deserves an honest counsellor, transparent fees and end-to-end support until the degree is in hand. We only partner with universities that hold the right approvals and treat our students fairly.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="surface-card p-4 text-center">
                  <div className="text-2xl font-bold text-navy"><Counter value={s.value} suffix={s.suffix} /></div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Our journey" eyebrow="Timeline" className="bg-secondary/50">
        <ol className="mx-auto max-w-3xl space-y-4">
          {timeline.map((t) => (
            <li key={t.year} className="surface-card flex gap-5 p-6">
              <div className="w-16 shrink-0 text-2xl font-bold text-orange">{t.year}</div>
              <div>
                <div className="text-base font-bold text-navy">{t.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Why students & parents trust us" eyebrow="Values">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((w) => (
            <div key={w.title} className="surface-card p-6">
              <h3 className="text-base font-bold text-navy">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
