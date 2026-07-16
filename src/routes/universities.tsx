import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, MapPin, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { universities } from "@/data/universities";

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

function UniversitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner Universities"
        title={<>Universities that <span className="text-orange">actually</span> care about your future.</>}
        subtitle="Every university on our panel is UGC recognised. Most carry NAAC A or A+ accreditation."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Universities" }]}
      />
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {universities.map((u, i) => (
            <motion.article
              key={u.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.06 }}
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
                  <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><GraduationCap className="h-3.5 w-3.5" />Est. {u.established}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </>
  );
}
