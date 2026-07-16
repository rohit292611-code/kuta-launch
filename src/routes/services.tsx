import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { educationServices, institutionalServices } from "@/data/services";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kutastha Consultancy" },
      { name: "description", content: "Admissions, counselling, documentation, scholarship guidance and institutional IT solutions from Kutastha." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Two practices. <span className="text-orange">One standard.</span></>}
        subtitle="Education consultancy for students and institutional IT solutions for schools, colleges and government offices."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />
      <Section title="Education Services" eyebrow="For Students">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {educationServices.map((s) => (
            <div key={s.title} className="surface-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white"><s.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-base font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Institutional Solutions" eyebrow="For Schools & Government" className="bg-secondary/50">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {institutionalServices.map((s) => (
            <div key={s.title} className="surface-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange/15 text-orange"><s.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-base font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90"><Link to="/institutional">Full Institutional Catalogue</Link></Button>
        </div>
      </Section>
    </>
  );
}
