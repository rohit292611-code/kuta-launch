import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { site } from "@/data/site";
import { badges } from "@/data/misc";
import logoAsset from "@/assets/kutastha-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-white">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-11 w-11 rounded-lg bg-white/95 p-1 object-contain" />
            <div className="leading-tight">
              <div className="text-base font-bold">{site.short}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Consultancy</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span key={b} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-white/80">
                {b}
              </span>
            ))}
          </div>
        </div>

        <FooterCol title="Education">
          <FooterLink to="/universities">Universities</FooterLink>
          <FooterLink to="/programs">Programs</FooterLink>
          <FooterLink to="/admissions">Admissions</FooterLink>
          <FooterLink to="/scholarships">Scholarships</FooterLink>
        </FooterCol>

        <FooterCol title="Institutional">
          <FooterLink to="/institutional">Smart Classrooms</FooterLink>
          <FooterLink to="/institutional">CCTV Installation</FooterLink>
          <FooterLink to="/institutional">Computer Supply</FooterLink>
          <FooterLink to="/institutional">Networking</FooterLink>
        </FooterCol>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />{site.address}</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-orange" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-orange" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[
              { href: site.socials.instagram, Icon: Instagram },
              { href: site.socials.facebook, Icon: Facebook },
              { href: site.socials.linkedin, Icon: Linkedin },
              { href: site.socials.youtube, Icon: Youtube },
            ].map(({ href, Icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer noopener"
                 className="rounded-full border border-white/15 p-2 text-white/70 transition-colors hover:border-orange hover:text-orange">
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
