import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import logoAsset from "@/assets/kutastha-logo.png.asset.json";
import { site } from "@/data/site";
import { universities } from "@/data/universities";
import { programs } from "@/data/programs";
import { cn } from "@/lib/utils";

type MegaColumn = {
  title: string;
  items: { label: string; to: string; params?: Record<string, string>; desc?: string; external?: string }[];
};

type NavItem =
  | { label: string; to: string }
  | { label: string; to: string; mega: MegaColumn[]; wide?: boolean };

const universityCols: MegaColumn[] = [
  {
    title: "Empanelled Universities",
    items: universities.map((u) => ({
      label: u.name,
      to: "/universities/$slug",
      params: { slug: u.slug },
      desc: u.location,
    })),
  },
];

const programCols: MegaColumn[] = [
  {
    title: "Undergraduate",
    items: programs
      .filter((p) => p.category === "UG")
      .slice(0, 8)
      .map((p) => ({ label: p.name, to: "/programs/$slug", params: { slug: p.id }, desc: p.duration })),
  },
  {
    title: "Postgraduate",
    items: programs
      .filter((p) => p.category === "PG")
      .slice(0, 8)
      .map((p) => ({ label: p.name, to: "/programs/$slug", params: { slug: p.id }, desc: p.duration })),
  },
  {
    title: "Modes",
    items: [
      { label: "Online Programs", to: "/programs", desc: "Live LMS · digital exams" },
      { label: "Distance Programs", to: "/programs", desc: "Flexible · document based" },
      { label: "Regular Programs", to: "/programs", desc: "On-campus experience" },
      { label: "Diploma / PGDCA", to: "/programs", desc: "Short-term skill programs" },
    ],
  },
];

const servicesCols: MegaColumn[] = [
  {
    title: "Student Services",
    items: [
      { label: "Career Counselling", to: "/services", desc: "Profile-fit university mapping" },
      { label: "University Selection", to: "/services", desc: "Shortlist in 20 minutes" },
      { label: "Admission Assistance", to: "/services", desc: "End-to-end enrolment" },
      { label: "Documentation", to: "/services", desc: "Verification & upload" },
    ],
  },
  {
    title: "Support & Aid",
    items: [
      { label: "Scholarship Assistance", to: "/scholarships", desc: "Up to 30% for eligible profiles" },
      { label: "Education Loan", to: "/services", desc: "Partner banks & NBFCs" },
      { label: "Interview Preparation", to: "/services", desc: "Mock rounds & scripts" },
      { label: "Student Support", to: "/services", desc: "Ongoing academic help" },
    ],
  },
];

const admissionsCols: MegaColumn[] = [
  {
    title: "By Level",
    items: [
      { label: "UG Admissions", to: "/admissions", desc: "After 10+2" },
      { label: "PG Admissions", to: "/admissions", desc: "After Bachelor's" },
      { label: "Diploma Admissions", to: "/admissions", desc: "Skill programs" },
    ],
  },
  {
    title: "By Mode",
    items: [
      { label: "Online Admission", to: "/admissions", desc: "LMS based" },
      { label: "Distance Admission", to: "/admissions", desc: "Flexible" },
      { label: "Regular Admission", to: "/admissions", desc: "On-campus" },
    ],
  },
];

const scholarshipCols: MegaColumn[] = [
  {
    title: "Scholarship Streams",
    items: [
      { label: "Army & Defence — Up to 30%", to: "/scholarships", desc: "Serving / veteran families" },
      { label: "Merit Scholarship — Up to 30%", to: "/scholarships", desc: "85%+ in qualifying exam" },
      { label: "Regular Programs — Up to 25%", to: "/scholarships", desc: "On-campus enrolments" },
      { label: "Distance Programs — Up to 25%", to: "/scholarships", desc: "Flexible learners" },
    ],
  },
];

const institutionalCols: MegaColumn[] = [
  {
    title: "Solutions",
    items: [
      { label: "Smart Classrooms", to: "/institutional", desc: "Interactive learning" },
      { label: "CCTV Installation", to: "/institutional", desc: "Campus security" },
      { label: "Computer Supply", to: "/institutional", desc: "Labs & offices" },
      { label: "Projector Installation", to: "/institutional", desc: "Auditoriums" },
    ],
  },
  {
    title: "Approvals we support",
    items: [
      { label: "UGC", to: "/institutional", desc: "University Grants Commission" },
      { label: "AICTE", to: "/institutional", desc: "Technical education" },
      { label: "NAAC", to: "/institutional", desc: "Accreditation grade" },
      { label: "NCTE · PCI · BCI", to: "/institutional", desc: "Sector-specific approvals" },
    ],
  },
];

const aboutCols: MegaColumn[] = [
  {
    title: "Our Firm",
    items: [
      { label: "Company", to: "/about", desc: "Who we are" },
      { label: "Vision & Mission", to: "/about", desc: "What drives us" },
      { label: "Team", to: "/about", desc: "Meet the advisors" },
      { label: "Testimonials", to: "/about", desc: "Student stories" },
    ],
  },
];

const contactCols: MegaColumn[] = [
  {
    title: "Get in touch",
    items: [
      { label: "Contact Us", to: "/contact", desc: "Form & office details" },
      { label: "Book Consultation", to: "/contact", desc: "Free 20-min call" },
      { label: "WhatsApp", to: "/contact", desc: site.phone },
      { label: "Email", to: "/contact", desc: site.email },
    ],
  },
];

const nav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Universities", to: "/universities", mega: universityCols },
  { label: "Programs", to: "/programs", mega: programCols, wide: true },
  { label: "Services", to: "/services", mega: servicesCols, wide: true },
  { label: "Admissions", to: "/admissions", mega: admissionsCols, wide: true },
  { label: "Scholarships", to: "/scholarships", mega: scholarshipCols },
  { label: "Institutional", to: "/institutional", mega: institutionalCols, wide: true },
  { label: "About", to: "/about", mega: aboutCols },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/contact", mega: contactCols },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // "dark" mode when at very top of a page that has a dark hero (all pages here).
  const dark = !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActive(null);
  }, [pathname]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 120);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-hairline shadow-[0_10px_30px_-20px_rgba(15,30,61,0.25)]"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          to="/"
          className="group flex items-center gap-3 pr-6 lg:pr-10"
          aria-label={site.name}
        >
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
              dark ? "bg-white/95 shadow-lg" : "bg-white shadow-[0_10px_20px_-10px_rgba(15,30,61,0.4)]",
            )}
          >
            <img src={logoAsset.url} alt="" className="h-9 w-9 object-contain" />
          </span>
          <div className="leading-tight">
            <div className={cn("text-base font-bold tracking-tight transition-colors md:text-lg", dark ? "text-white" : "text-navy")}>
              Kutastha
            </div>
            <div
              className={cn(
                "hidden text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors sm:block",
                dark ? "text-white/70" : "text-muted-foreground",
              )}
            >
              Consultancy Services
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" onMouseLeave={scheduleClose}>
          {nav.map((item) => {
            const hasMega = "mega" in item;
            const isActive = active === item.label;
            return (
              <div
                key={item.to + item.label}
                className="relative"
                onMouseEnter={() => (hasMega ? openMenu(item.label) : setActive(null))}
              >
                <Link
                  to={item.to}
                  className={cn(
                    "nav-underline inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300",
                    dark
                      ? "text-white/90 hover:text-white hover:-translate-y-0.5"
                      : "text-foreground/85 hover:text-navy hover:-translate-y-0.5",
                  )}
                  activeProps={{
                    className: cn(
                      "rounded-full border shadow-[0_10px_25px_-15px_rgba(234,120,40,0.55)] -translate-y-0",
                      dark
                        ? "bg-white text-navy border-white/70"
                        : "bg-navy text-white border-navy/60",
                    ),
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                  {hasMega && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                </Link>

                <AnimatePresence>
                  {hasMega && isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={scheduleClose}
                      className={cn(
                        "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2",
                        "wide" in item && item.wide ? "w-[720px]" : "w-[380px]",
                      )}
                    >
                      <div className="glass-card overflow-hidden p-6">
                        <div
                          className={cn(
                            "grid gap-6",
                            item.mega.length >= 3 ? "grid-cols-3" : item.mega.length === 2 ? "grid-cols-2" : "grid-cols-1",
                          )}
                        >
                          {item.mega.map((col) => (
                            <div key={col.title}>
                              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                                {col.title}
                              </div>
                              <ul className="space-y-1">
                                {col.items.map((entry) => (
                                  <li key={entry.label}>
                                    <Link
                                      to={entry.to as any}
                                      params={entry.params as any}
                                      className="block rounded-xl px-3 py-2 transition-colors hover:bg-orange/10"
                                    >
                                      <div className="text-sm font-semibold text-navy">{entry.label}</div>
                                      {entry.desc && (
                                        <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                                          {entry.desc}
                                        </div>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                          <div className="text-xs text-muted-foreground">
                            Not sure where to start? Book a free consultation.
                          </div>
                          <Link to="/contact" className="btn-primary text-xs">
                            Free Consultation <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden md:inline-flex btn-primary shadow-[0_14px_30px_-14px_rgba(234,120,40,0.7)] group"
          >
            Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            aria-label="Toggle menu"
            className={cn(
              "rounded-full p-2 transition-colors lg:hidden",
              dark ? "bg-white/15 text-white border border-white/30" : "bg-white text-navy border border-hairline",
            )}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-hairline bg-white lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground/85 hover:bg-secondary"
                  activeProps={{ className: "bg-navy text-white" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
                Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
