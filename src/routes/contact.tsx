import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";
import { Mail, MapPin, Phone, MessageCircle, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kutastha Consultancy — Patna, Bihar" },
      { name: "description", content: "Book a free counselling session or request an institutional proposal. Kutastha Consultancy Services, Patna, Bihar." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's talk about your <span className="text-orange">future.</span></>}
        subtitle="A certified advisor will get back to you within 4 working hours."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <InfoCard icon={Phone} title="Phone" value={site.phone} href={`tel:${site.phone.replace(/\s/g, "")}`} />
            <InfoCard icon={MessageCircle} title="WhatsApp" value={`+${site.whatsapp}`} href={`https://wa.me/${site.whatsapp}`} />
            <InfoCard icon={Mail} title="Email" value={site.email} href={`mailto:${site.email}`} />
            <InfoCard icon={MapPin} title="Office" value={site.address} />
            <InfoCard icon={Clock} title="Hours" value={site.hours} />
            <div className="overflow-hidden rounded-2xl border border-hairline">
              <iframe
                title="Kutastha Consultancy Office"
                src="https://www.openstreetmap.org/export/embed.html?bbox=85.10%2C25.58%2C85.20%2C25.65&layer=mapnik&marker=25.6127%2C85.1416"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="surface-card p-8 md:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-14 w-14 text-orange" />
                <h3 className="mt-4 text-2xl font-bold text-navy">Message sent!</h3>
                <p className="mt-2 text-sm text-muted-foreground">We'll respond within 4 working hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Thanks — we'll be in touch shortly."); }}
                className="space-y-5"
              >
                <div className="eyebrow">Enquiry Form</div>
                <h2 className="text-2xl font-bold text-navy md:text-3xl">Send us a message</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5"><Label>Full Name *</Label><Input required placeholder="Your name" /></div>
                  <div className="space-y-1.5"><Label>Phone *</Label><Input required type="tel" placeholder="+91" /></div>
                  <div className="space-y-1.5 md:col-span-2"><Label>Email *</Label><Input required type="email" placeholder="you@example.com" /></div>
                  <div className="space-y-1.5 md:col-span-2"><Label>Message</Label><Textarea rows={5} placeholder="Tell us how we can help" /></div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-orange text-white hover:bg-orange/90 btn-magnetic">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoCard({ icon: Icon, title, value, href }: { icon: React.ElementType; title: string; value: string; href?: string }) {
  const inner = (
    <div className="surface-card flex items-start gap-4 p-5 transition-colors hover:border-orange/30">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/15 text-orange"><Icon className="h-5 w-5" /></span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="mt-0.5 text-sm font-semibold text-navy">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener">{inner}</a> : inner;
}
