import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { institutionalServices } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import cctvImg from "@/assets/service-cctv.jpg";
import projectorImg from "@/assets/service-projector.jpg";

const serviceImages: Record<string, string> = {
  "CCTV Installation": cctvImg,
  "Projector Installation": projectorImg,
};

export const Route = createFileRoute("/institutional")({
  head: () => ({
    meta: [
      { title: "Institutional Solutions — CCTV, Smart Classrooms, Networking | Kutastha" },
      { name: "description", content: "CCTV installation, smart classrooms, projectors, computer supply, networking and IT infrastructure for schools, colleges and government institutions." },
    ],
    links: [{ rel: "canonical", href: "/institutional" }],
  }),
  component: Institutional,
});

const capabilities = [
  "GeM & tender-ready quotations",
  "Certified L1/L2 field engineers",
  "SLA-backed AMC contracts",
  "PAN-India delivery & installation",
  "Institutional financing support",
  "Brand-agnostic product sourcing",
];

function Institutional() {
  return (
    <>
      <PageHero
        eyebrow="Institutional Solutions"
        title={<>Turn-key IT for schools, colleges & <span className="text-orange">government institutions.</span></>}
        subtitle="From a single projector installation to a full smart-campus rollout — Kutastha's institutional practice delivers with certified engineers and SLA-backed AMC."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Institutional" }]}
      />
      <Section title="Our capabilities" eyebrow="What we deliver">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {institutionalServices.map((s) => {
            const img = serviceImages[s.title];
            return (
              <div key={s.title} className="surface-card overflow-hidden p-0">
                {img && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img}
                      alt={s.title}
                      width={1024}
                      height={640}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-orange shadow-lg backdrop-blur">
                      <s.icon className="h-5 w-5" />
                    </span>
                  </div>
                )}
                <div className="p-6">
                  {!img && (
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange/15 text-orange">
                      <s.icon className="h-5 w-5" />
                    </span>
                  )}
                  <h3 className={`${img ? "" : "mt-4"} text-base font-bold text-navy`}>{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Why institutions choose Kutastha" eyebrow="Advantages" className="bg-secondary/50">
        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
          {capabilities.map((c) => (
            <li key={c} className="flex items-center gap-3 rounded-xl border border-hairline bg-card p-4 text-sm font-medium text-foreground/85">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-white"><Check className="h-3.5 w-3.5" /></span>
              {c}
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <div className="mx-auto max-w-3xl rounded-4xl bg-navy p-10 text-center text-white md:p-14">
          <h2 className="text-3xl md:text-4xl">Request an <span className="text-orange">institutional proposal.</span></h2>
          <p className="mt-3 text-white/75">Share your requirement — we'll respond with a detailed BOQ within 48 hours.</p>
          <Button asChild size="lg" className="mt-6 bg-orange text-white hover:bg-orange/90"><Link to="/contact">Contact Sales</Link></Button>
        </div>
      </Section>
    </>
  );
}
