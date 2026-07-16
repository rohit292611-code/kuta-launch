import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { blogs } from "@/data/misc";
import { Section } from "@/components/ui/section";

export function BlogsPreview() {
  return (
    <Section
      eyebrow="Insights"
      title={<>From our <span className="text-orange">education desk.</span></>}
      subtitle="Guides, notifications and honest career advice — written by real counsellors."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {blogs.map((b, i) => (
          <motion.article
            key={b.slug}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.06 }}
            className="surface-card group flex flex-col p-6"
          >
            <span className="rounded-md bg-orange/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange w-fit">{b.category}</span>
            <h3 className="mt-4 text-base font-bold leading-snug text-navy transition-colors group-hover:text-orange">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{b.excerpt}</p>
            <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" />{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span>{b.readTime}</span>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange">
          Read all articles <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
