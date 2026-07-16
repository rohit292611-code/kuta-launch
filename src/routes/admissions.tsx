import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { universities } from "@/data/universities";
import { programs } from "@/data/programs";
import { journey } from "@/data/misc";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions & Apply Now — Kutastha Consultancy" },
      { name: "description", content: "Start your admission with Kutastha. Free counselling, transparent fees, guaranteed university onboarding." },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: Admissions,
});

function Admissions() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={<>Apply once. We handle <span className="text-orange">the rest.</span></>}
        subtitle="Submit your details below. A counsellor will call you within 4 working hours."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Admissions" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="surface-card p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-14 w-14 text-orange" />
                <h3 className="mt-4 text-2xl font-bold text-navy">Application received.</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">Our counsellor will reach out to you within 4 working hours to finalise your program & university.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); toast.success("Application submitted — we'll call you soon."); }}
                className="space-y-5"
              >
                <div className="eyebrow">Application Form</div>
                <h2 className="text-2xl font-bold text-navy md:text-3xl">Start your admission journey</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name" required><Input required placeholder="Your full name" /></Field>
                  <Field label="Phone Number" required><Input required type="tel" placeholder="+91" /></Field>
                  <Field label="Email" required><Input required type="email" placeholder="you@example.com" /></Field>
                  <Field label="City"><Input placeholder="Patna" /></Field>
                  <Field label="Preferred University">
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {universities.map((u) => (<SelectItem key={u.slug} value={u.slug}>{u.short} — {u.name}</SelectItem>))}
                      </SelectContent></Select>
                  </Field>
                  <Field label="Preferred Program">
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {programs.map((p) => (<SelectItem key={p.id} value={p.id}>{p.code} — {p.name}</SelectItem>))}
                      </SelectContent></Select>
                  </Field>
                </div>
                <Field label="Message"><Textarea rows={4} placeholder="Tell us about your goals" /></Field>
                <Button type="submit" size="lg" className="w-full bg-orange text-white hover:bg-orange/90 btn-magnetic">Submit Application</Button>
                <p className="text-center text-xs text-muted-foreground">We respect your privacy. Your details are never shared with third parties.</p>
              </form>
            )}
          </div>

          <div>
            <div className="eyebrow">What happens next</div>
            <h3 className="mt-3 text-2xl font-bold text-navy md:text-3xl">The 8-step Kutastha process</h3>
            <ol className="mt-6 space-y-3">
              {journey.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-xl border border-hairline bg-card p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-xs font-bold text-white">{i + 1}</span>
                  <div>
                    <div className="text-sm font-semibold text-navy">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}{required && <span className="text-orange"> *</span>}</Label>
      {children}
    </div>
  );
}
