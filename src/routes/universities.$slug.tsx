import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Check, ExternalLink, MapPin, ArrowRight, Users, Building2, GraduationCap } from "lucide-react";
import { findUniversity, universities, type University } from "@/data/universities";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

function UniversityDetail() {
  const u = Route.useLoaderData() as University;
  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <img src={u.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/60" />
        <div className="container-x relative">
          <nav className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> / <Link to="/universities" className="hover:text-white">Universities</Link> / <span className="text-white">{u.short}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap gap-2">
                {u.approvals.map((a) => (
                  <span key={a} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">{a}</span>
                ))}
              </div>
              <h1 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{u.name}</h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-orange" />{u.location}</span>
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-orange" />Est. {u.established}</span>
                <a href={u.website} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:text-white">
                  <ExternalLink className="h-4 w-4 text-orange" />Official website
                </a>
              </div>
              <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">{u.tagline}</p>
            </motion.div>
            <div className="surface-card !bg-white/10 !border-white/15 p-6 text-white backdrop-blur-md">
              <div className="text-xs uppercase tracking-widest text-orange-soft">Scholarship</div>
              <div className="mt-1 text-lg font-semibold">{u.scholarship}</div>
              <div className="mt-5 flex flex-wrap gap-2">
                {u.categories.map((c) => (
                  <span key={c} className="rounded-md bg-orange px-2.5 py-1 text-[11px] font-semibold text-white">{c}</span>
                ))}
              </div>
              <Button asChild size="lg" className="mt-6 w-full bg-orange text-white hover:bg-orange/90">
                <Link to="/admissions">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section title={<>About <span className="text-orange">{u.short}</span></>} eyebrow="Overview">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-base leading-relaxed text-foreground/85">{u.about}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {u.highlights.map((h) => (
                <div key={h} className="rounded-xl border border-hairline bg-card p-4">
                  <Award className="h-5 w-5 text-orange" />
                  <div className="mt-2 text-sm font-semibold text-navy">{h}</div>
                </div>
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

      <Section title="Programs Offered" eyebrow="Programs" className="bg-secondary/50">
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 md:grid-cols-3">
          {u.programs.map((p) => (
            <div key={p} className="surface-card flex items-center justify-between p-4">
              <span className="font-semibold text-navy">{p}</span>
              <GraduationCap className="h-5 w-5 text-orange" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Eligibility" eyebrow="Requirements">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="surface-card p-6">
            <div className="eyebrow">Undergraduate</div>
            <p className="mt-3 text-sm text-foreground/80">{u.eligibility.ug}</p>
          </div>
          <div className="surface-card p-6">
            <div className="eyebrow">Postgraduate</div>
            <p className="mt-3 text-sm text-foreground/80">{u.eligibility.pg}</p>
          </div>
        </div>
      </Section>

      <Section title="Admission Process" eyebrow="How to apply" className="bg-secondary/50">
        <ol className="mx-auto grid max-w-5xl gap-4 md:grid-cols-5">
          {u.admissionSteps.map((s, i) => (
            <li key={i} className="surface-card p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">{i + 1}</span>
              <p className="mt-3 text-sm text-foreground/85">{s}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Recruiters & Placement" eyebrow="Careers">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {u.placement.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-card px-4 py-2 text-sm font-semibold text-navy">
              <Users className="h-4 w-4 text-orange" />{p}
            </span>
          ))}
        </div>
      </Section>

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

      <Section>
        <div className="mx-auto max-w-4xl rounded-4xl bg-navy p-10 text-center text-white md:p-14">
          <h2 className="text-3xl md:text-4xl">Ready to apply to <span className="text-orange">{u.short}</span>?</h2>
          <p className="mt-3 text-white/75">Our advisors will guide you through the entire admission process — for free.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-orange text-white hover:bg-orange/90"><Link to="/admissions">Start Application</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"><Link to="/contact">Talk to Counsellor</Link></Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">Explore other universities</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {universities.filter((x) => x.slug !== u.slug).slice(0, 4).map((x) => (
              <Link key={x.slug} to="/universities/$slug" params={{ slug: x.slug }} className="surface-card group overflow-hidden">
                <img src={x.image} alt={x.name} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform group-hover:scale-105" />
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
