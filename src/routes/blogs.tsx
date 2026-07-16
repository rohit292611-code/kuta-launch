import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { blogs } from "@/data/misc";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Insights & Blogs — Kutastha Consultancy" },
      { name: "description", content: "Guides, admissions news, scholarship listings and honest career advice from Kutastha's education desk." },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
  component: Blogs,
});

function Blogs() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>From our <span className="text-orange">education desk.</span></>}
        subtitle="Guides, notifications, admissions updates and honest career advice — written by real counsellors."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blogs" }]}
      />
      <div className="container-x py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <article key={b.slug} className="surface-card group flex flex-col p-6">
              <span className="rounded-md bg-orange/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange w-fit">{b.category}</span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-navy transition-colors group-hover:text-orange">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" />{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span>{b.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
