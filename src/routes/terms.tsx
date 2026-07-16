import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Service — Kutastha Consultancy" }, { name: "description", content: "Terms governing your use of Kutastha services." }],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" breadcrumb={[{ label: "Home", to: "/" }, { label: "Terms" }]} />
      <div className="container-x py-14">
        <article className="prose mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-foreground/85">
          <p>By using this website you agree to the following terms. {site.name} provides education consultancy and institutional IT solutions.</p>
          <h2 className="text-xl font-bold text-navy">Counselling & admissions</h2>
          <p>Counselling is free. Kutastha does not charge admission fees; you pay the university directly for tuition and other fees.</p>
          <h2 className="text-xl font-bold text-navy">Accuracy of information</h2>
          <p>We regularly verify university approvals, fees and scholarships. However, all official information should be confirmed with the university before final enrolment.</p>
          <h2 className="text-xl font-bold text-navy">Institutional services</h2>
          <p>Institutional service agreements, warranties and AMC contracts are governed by the specific purchase order and BOQ.</p>
          <h2 className="text-xl font-bold text-navy">Contact</h2>
          <p>{site.email} · {site.phone}</p>
        </article>
      </div>
    </>
  );
}
