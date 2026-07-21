import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, Briefcase, Building2, CheckCircle2, Clock, GraduationCap, IndianRupee, Layers, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { programs, type Program } from "@/data/programs";
import { universities } from "@/data/universities";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }): Program => {
    const p = programs.find((x) => x.id === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Program · Kutastha" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.name} (${loaderData.code}) — Admissions | Kutastha` },
        { name: "description", content: `${loaderData.name}: ${loaderData.description} Duration ${loaderData.duration}. ${loaderData.scholarship} scholarship.` },
        { property: "og:title", content: `${loaderData.name} — Kutastha` },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/programs/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/programs/${params.slug}` }],
    };
  },
  component: ProgramDetail,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy">Program not found</h1>
        <Link to="/programs" className="mt-4 inline-block text-orange">← Back to programs</Link>
      </div>
    </div>
  ),
});

const careerScopeMap: Record<string, string[]> = {
  bcom: ["Accountant", "Financial Analyst", "Tax Consultant", "Banking Officer", "Audit Associate"],
  mcom: ["Senior Accountant", "Finance Manager", "CA Support", "Corporate Treasurer", "Investment Analyst"],
  bba: ["Business Analyst", "HR Executive", "Marketing Associate", "Operations Trainee", "Sales Manager"],
  mba: ["Product Manager", "Consultant", "Brand Manager", "Investment Banker", "Operations Head"],
  bsc: ["Lab Technician", "Research Associate", "Data Analyst", "Science Teacher", "QA Executive"],
  msc: ["Research Scientist", "Data Scientist", "Subject Expert", "Professor", "Analytics Lead"],
  bca: ["Software Developer", "Web Developer", "QA Engineer", "IT Support", "System Analyst"],
  mca: ["Full-stack Engineer", "Cloud Engineer", "AI/ML Engineer", "Solutions Architect", "Tech Lead"],
  ba: ["Content Writer", "Journalist", "Social Worker", "Civil Services", "Teacher"],
  ma: ["Professor", "Researcher", "Editor", "Policy Analyst", "Civil Services"],
  pgdca: ["IT Executive", "MIS Analyst", "Junior Developer", "Office Automation", "Support Engineer"],
};

const subjectsMap: Record<string, string[]> = {
  bcom: ["Financial Accounting", "Business Law", "Micro/Macro Economics", "Corporate Accounting", "Taxation", "Auditing"],
  mcom: ["Advanced Accounting", "Financial Management", "Strategic Cost Mgmt", "Business Environment", "Research Methods"],
  bba: ["Principles of Mgmt", "Marketing", "HR", "Financial Accounting", "Business Statistics", "Entrepreneurship"],
  mba: ["Strategic Mgmt", "Marketing Mgmt", "Financial Mgmt", "Operations", "HR Mgmt", "Analytics"],
  bsc: ["Mathematics", "Physics", "Chemistry", "Computer Science", "Statistics"],
  msc: ["Advanced Topics", "Research Methodology", "Dissertation", "Specialisation Electives"],
  bca: ["Programming in C/Java", "Data Structures", "DBMS", "Web Tech", "OS", "Software Engg"],
  mca: ["Advanced Algorithms", "Cloud Computing", "AI/ML", "Full-stack Dev", "Software Architecture"],
  ba: ["English", "History", "Political Science", "Sociology", "Psychology"],
  ma: ["Advanced Literature/History", "Research", "Dissertation", "Electives"],
  pgdca: ["Office Automation", "Programming", "DBMS", "Web Design", "Project Work"],
};

function ProgramDetail() {
  const p = Route.useLoaderData() as Program;
  const offering = universities.filter((u) => p.universities.includes(u.slug));
  const careers = careerScopeMap[p.id] ?? ["Analyst", "Executive", "Specialist", "Manager", "Consultant"];
  const subjects = subjectsMap[p.id] ?? ["Core Subject 1", "Core Subject 2", "Electives", "Project Work"];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-orange/20 blur-3xl" />
        <div className="container-x relative">
          <nav className="mb-6 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link> /{" "}
            <Link to="/programs" className="hover:text-white">Programs</Link> /{" "}
            <span className="text-white">{p.code}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-soft">
              <Sparkles className="h-3.5 w-3.5" /> {p.category}
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{p.name}</h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">{p.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4 max-w-3xl">
              {[
                { icon: Clock, label: "Duration", value: p.duration },
                { icon: Layers, label: "Modes", value: p.mode.join(" · ") },
                { icon: GraduationCap, label: "Eligibility", value: p.eligibility },
                { icon: Award, label: "Scholarship", value: p.scholarship },
              ].map((s) => (
                <div key={s.label} className="glass-dark p-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-soft">
                    <s.icon className="h-3.5 w-3.5" /> {s.label}
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-white">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-orange text-white hover:bg-orange/90">
                <Link to="/admissions">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                <Link to="/contact">Free Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW & SUBJECTS */}
      <Section title={`Overview & Curriculum`} eyebrow="What you'll learn">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="surface-card p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange">
              <BookOpen className="h-4 w-4" /> Program Overview
            </div>
            <h2 className="mt-3 text-2xl font-bold text-navy md:text-3xl">Why choose {p.code}?</h2>
            <p className="mt-4 leading-relaxed text-foreground/85">
              {p.description} Delivered by our UGC-recognised partner universities across {p.mode.join(", ")} modes, this program is designed for working professionals and full-time students who want an industry-relevant degree without compromising on flexibility.
            </p>
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-navy">Core Subjects</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {subjects.map((s) => (
                  <div key={s} className="flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    <span className="text-foreground/85">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange">
                <IndianRupee className="h-4 w-4" /> Fee Structure
              </div>
              <div className="mt-3 text-2xl font-bold text-navy">On request</div>
              <p className="mt-1 text-sm text-muted-foreground">Fees vary by university and mode. Talk to an advisor for exact numbers.</p>
              <Button asChild size="sm" className="mt-4 w-full bg-navy text-white hover:bg-navy/90">
                <Link to="/contact">Get fee sheet</Link>
              </Button>
            </div>
            <div className="surface-card p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange">
                <Users className="h-4 w-4" /> Admission Process
              </div>
              <ol className="mt-3 space-y-2 text-sm text-foreground/85">
                {["Free counselling", "Application + documents", "Fee payment", "LMS onboarding"].map((s, i) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-white">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      {/* CAREER SCOPE */}
      <Section title="Career Scope & Job Opportunities" eyebrow="After the degree" className="bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {careers.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="surface-card hover-lift p-5"
            >
              <Briefcase className="h-5 w-5 text-orange" />
              <div className="mt-3 text-sm font-semibold text-navy">{c}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* UNIVERSITIES OFFERING */}
      <Section title="Universities offering this program" eyebrow="Where to enrol">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offering.map((u) => (
            <div key={u.slug} className="surface-card overflow-hidden hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={u.image} alt={u.name} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <div className="text-xs text-white/80">{u.location}</div>
                  <div className="text-lg font-bold leading-tight text-white">{u.name}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-orange">
                  <Award className="h-3.5 w-3.5" /> {u.scholarship}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-navy text-white hover:bg-navy/90">
                    <Link to="/universities/$slug" params={{ slug: u.slug }}>View</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link to="/admissions">Apply</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {offering.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-hairline p-8 text-center text-muted-foreground">
              Talk to an advisor — we'll match you with a university offering {p.code}.
            </div>
          )}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-4xl rounded-4xl bg-navy p-10 text-center text-white md:p-14">
          <Building2 className="mx-auto h-10 w-10 text-orange" />
          <h2 className="mt-4 text-3xl md:text-4xl">Ready to enrol in <span className="text-orange">{p.code}</span>?</h2>
          <p className="mt-3 text-white/75">Free counselling · Scholarship check · Zero admission fee.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-orange text-white hover:bg-orange/90">
              <Link to="/admissions">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/contact">Free Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
