import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube, ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { badges } from "@/data/misc";
import { universities } from "@/data/universities";
import logoAsset from "@/assets/kutastha-logo.png.asset.json";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Please enter a valid email");
    toast.success("Subscribed! We'll be in touch.");
    setEmail("");
  };

  return (
    <footer className="mt-24 bg-navy text-white">
      {/* Top newsletter band */}
      <div className="border-b border-white/10">
        <div className="container-x grid gap-6 py-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-soft">Stay in the loop</div>
            <h3 className="mt-2 text-2xl font-bold md:text-3xl">
              Get scholarship alerts & admission deadlines <span className="text-orange">first.</span>
            </h3>
          </div>
          <form onSubmit={onSubscribe} className="flex w-full items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 focus:border-orange focus:outline-none"
            />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-11 w-11 rounded-lg bg-white/95 p-1 object-contain" />
            <div className="leading-tight">
              <div className="text-base font-bold">{site.short}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Consultancy Services</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span key={b} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-white/80">
                {b}
              </span>
            ))}
          </div>

          {/* Map */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Kutastha office location"
              src="https://www.google.com/maps?q=Patna%2C%20Bihar&output=embed"
              loading="lazy"
              className="h-48 w-full"
            />
          </div>
        </div>

        <FooterCol title="Programs">
          <FooterLink to="/programs">All Programs</FooterLink>
          <FooterLink to="/programs/mba">MBA</FooterLink>
          <FooterLink to="/programs/bba">BBA</FooterLink>
          <FooterLink to="/programs/bca">BCA</FooterLink>
          <FooterLink to="/programs/mca">MCA</FooterLink>
          <FooterLink to="/programs/bcom">B.Com</FooterLink>
        </FooterCol>

        <FooterCol title="Universities">
          {universities.slice(0, 6).map((u) => (
            <li key={u.slug}>
              <Link
                to="/universities/$slug"
                params={{ slug: u.slug }}
                className="text-white/80 transition-colors hover:text-orange"
              >
                {u.short ?? u.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/scholarships">Scholarships</FooterLink>
          <FooterLink to="/admissions">Admissions</FooterLink>
          <FooterLink to="/institutional">Institutional</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/blogs">Blog</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x grid gap-6 py-8 md:grid-cols-[1.5fr_1fr] md:items-center">
          <ul className="grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />{site.address}</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-orange" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-orange" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-orange" /><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer noopener" className="hover:text-white">WhatsApp: {site.phone}</a></li>
          </ul>
          <div className="flex flex-wrap justify-start gap-3 md:justify-end">
            {[
              { href: site.socials.instagram, Icon: Instagram },
              { href: site.socials.facebook, Icon: Facebook },
              { href: site.socials.linkedin, Icon: Linkedin },
              { href: site.socials.youtube, Icon: Youtube },
            ].map(({ href, Icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer noopener"
                 className="rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-orange hover:text-orange">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 md:flex-row">
          <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/faqs" className="hover:text-white">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-white/80 transition-colors hover:text-orange">{children}</Link>
    </li>
  );
}
