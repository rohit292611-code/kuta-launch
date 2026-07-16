import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Kutastha Consultancy" }, { name: "description", content: "How Kutastha collects, uses and protects your data." }],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" breadcrumb={[{ label: "Home", to: "/" }, { label: "Privacy" }]} />
      <div className="container-x py-14">
        <article className="prose mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-foreground/85">
          <p>Effective date: 1 January 2026. {site.name} ("we", "us") respects your privacy. This policy explains what information we collect and how we use it.</p>
          <h2 className="text-xl font-bold text-navy">Information we collect</h2>
          <p>Contact details you voluntarily submit through our enquiry, admission or contact forms — including your name, phone, email and program preference.</p>
          <h2 className="text-xl font-bold text-navy">How we use it</h2>
          <p>Strictly to respond to your admission enquiry, share program details and complete your university onboarding. We do not sell your data to third parties.</p>
          <h2 className="text-xl font-bold text-navy">Data sharing</h2>
          <p>We share your details only with the specific university you have chosen to apply to. Sharing happens strictly to process your admission.</p>
          <h2 className="text-xl font-bold text-navy">Your rights</h2>
          <p>You can request deletion of your data at any time by writing to {site.email}.</p>
        </article>
      </div>
    </>
  );
}
