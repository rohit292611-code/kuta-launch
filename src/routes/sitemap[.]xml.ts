import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { universities } from "@/data/universities";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/universities", priority: "0.9", changefreq: "weekly" },
          { path: "/programs", priority: "0.9", changefreq: "weekly" },
          { path: "/admissions", priority: "0.9", changefreq: "monthly" },
          { path: "/scholarships", priority: "0.8", changefreq: "monthly" },
          { path: "/services", priority: "0.7", changefreq: "monthly" },
          { path: "/institutional", priority: "0.7", changefreq: "monthly" },
          { path: "/about", priority: "0.6", changefreq: "monthly" },
          { path: "/blogs", priority: "0.6", changefreq: "weekly" },
          { path: "/faqs", priority: "0.5", changefreq: "monthly" },
          { path: "/contact", priority: "0.6", changefreq: "monthly" },
          { path: "/privacy", priority: "0.3", changefreq: "yearly" },
          { path: "/terms", priority: "0.3", changefreq: "yearly" },
        ];
        const uniDynamic = universities.map((u) => ({
          path: `/universities/${u.slug}`, priority: "0.8", changefreq: "monthly",
        }));
        const { programs } = await import("@/data/programs");
        const programDynamic = programs.map((p) => ({
          path: `/programs/${p.id}`, priority: "0.7", changefreq: "monthly",
        }));
        const all = [...staticEntries, ...uniDynamic, ...programDynamic];
        const urls = all.map((e) =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
