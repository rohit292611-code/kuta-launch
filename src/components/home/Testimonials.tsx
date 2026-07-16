import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/misc";
import { Section } from "@/components/ui/section";

export function Testimonials() {
  return (
    <Section
      eyebrow="Testimonials"
      title={<>Real students. <span className="text-orange">Real journeys.</span></>}
      subtitle="Rated 4.9 / 5 by 1,200+ students and parents across India."
      className="bg-secondary/50"
    >
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.05 }}
            className="mb-5 break-inside-avoid surface-card p-6"
          >
            <Quote className="h-6 w-6 text-orange" />
            <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-hairline pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-navy">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.role} · {t.location}</div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-orange text-orange" />
                ))}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
