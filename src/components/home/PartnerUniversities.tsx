import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, MapPin, ExternalLink } from "lucide-react";
import { universities } from "@/data/universities";
import { Section } from "@/components/ui/section";

export function PartnerUniversities() {
  return (
    <Section
      id="universities"
      eyebrow="Partner Universities"
      title={<>UGC recognised. NAAC accredited. <span className="text-orange">Handpicked.</span></>}
      subtitle="We only partner with universities that meet our approvals, transparency and student-support standards."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {universities.map((u, i) => (
          <motion.article
            key={u.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group surface-card overflow-hidden"
          >
            <Link to="/universities/$slug" params={{ slug: u.slug }} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={u.image} alt={u.name} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                  {u.approvals.slice(0, 3).map((a) => (
                    <span key={a} className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-navy backdrop-blur">
                      {a}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <MapPin className="h-3.5 w-3.5" /> {u.location}
                  </div>
                  <h3 className="mt-1 text-lg font-bold leading-tight text-white">{u.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-orange">
                  <Award className="h-3.5 w-3.5" /> {u.scholarship}
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{u.tagline}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {u.programs.slice(0, 5).map((p) => (
                    <span key={p} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-foreground/80">
                      {p}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy">View Details</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
