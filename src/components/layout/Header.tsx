import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logoAsset from "@/assets/kutastha-logo.png.asset.json";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" },
  { label: "Universities", to: "/universities" },
  { label: "Programs", to: "/programs" },
  { label: "Services", to: "/services" },
  { label: "Admissions", to: "/admissions" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Institutional", to: "/institutional" },
  { label: "About", to: "/about" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-hairline" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-3 pr-4 lg:pr-8" aria-label={site.name}>
          <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-lg object-contain md:h-11 md:w-11" />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-navy md:text-base">Kutastha</div>
            <div className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Consultancy Services
            </div>
          </div>
        </Link>


        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-navy"
              activeProps={{ className: "bg-secondary text-navy" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 rounded-full border border-hairline bg-background/70 px-3.5 py-2 text-xs font-semibold text-navy transition-colors hover:bg-secondary md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" /> {site.phone}
          </a>
          <Button asChild size="sm" className="hidden bg-orange text-white hover:bg-orange/90 md:inline-flex btn-magnetic">
            <Link to="/admissions">Apply Now</Link>
          </Button>
          <button
            aria-label="Toggle menu"
            className="rounded-full border border-hairline bg-background p-2 text-navy lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-navy" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-orange text-white hover:bg-orange/90">
              <Link to="/admissions" onClick={() => setOpen(false)}>Apply Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
