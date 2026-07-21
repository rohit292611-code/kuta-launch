
# Premium Consultancy Platform Overhaul

Scoping this into a focused, high-impact pass that ships the requested premium feel without ballooning into hundreds of new hand-authored pages. Content-heavy sections (per-university full pages, per-course pages) use dynamic route templates driven by existing `src/data/` files so every entity gets a real page without duplicating markup.

## 1. Global design system (src/styles.css)
- Lock palette: `--navy #0B1F3A`, `--orange #FF7A00`, `--surface #F5F7FA`, white.
- Refined typography scale (larger display sizes, tighter tracking on headings).
- Reusable utilities: `.glass-card`, `.soft-shadow`, `.btn-primary`, `.btn-secondary`, `.hover-lift`.
- Consistent radius (`--radius-lg: 1.25rem`) and spacing rhythm.

## 2. Header / Navbar (src/components/layout/Header.tsx + new MegaMenu)
- **Adaptive contrast**: `IntersectionObserver` tracks sections marked `data-nav="dark"`; nav text/logo swap between white and navy with smooth transition.
- **Active state**: rounded capsule, soft shadow, hairline border, animated orange underline; hover lift 2px + underline sweep.
- **Remove circular phone chip.** Replace top-right with **"Free Consultation"** orange CTA (lift + arrow slide on hover) linking to `/contact`.
- **Mega dropdowns** for: Universities (list from `universities.ts` → detail pages), Programs, Services, Admissions, Scholarships, Institutional, Blogs, About, Contact. Each dropdown is a glass panel with icon + label + short description, keyboard accessible, closes on route change.
- Mobile: accordion-style dropdowns inside the existing sheet.

## 3. University detail pages
- Already dynamic at `src/routes/universities.$slug.tsx`. Extend the template so every section listed (Hero, Overview, About, Recognition, Approvals, Accreditation, Campus, Facilities, Placement, Eligibility, Admission Process, Courses + Fees + Duration + Mode, Scholarships, FAQs, Gallery, Contact form, Apply/Official buttons) renders from data. Fill any missing fields in `src/data/universities.ts` with sensible defaults.

## 4. Course pages (new)
- New dynamic route `src/routes/programs.$slug.tsx` driven by `src/data/programs.ts` (extend schema with overview, eligibility, duration, fees, careerScope, jobs, subjects, universitiesOffering, admissionProcess).
- Programs listing links each card to its detail page.

## 5. University Showcase (src/components/home/UniversityShowcase.tsx)
- Auto-advance every **2.8s**, transition **650ms** with premium easing.
- Single card on stage; use AnimatePresence with slide+fade+subtle scale — no overlap, no merged frames.
- Preload next image via `new Image()`; `loading="lazy"` for the rest.
- Phone/details panel updates from the same `activeIndex` (already synced; verify).

## 6. Scholarship values
- Global sweep: Army **up to 30%**, Regular **up to 25%**, Distance **up to 25%**. Update `src/data/universities.ts`, `src/routes/scholarships.tsx`, home Scholarship section, and any card copy. Premium icons via lucide.

## 7. Buttons & cards
- Standardize on `.btn-primary` / `.btn-secondary` variants in `src/components/ui/button.tsx` extensions.
- Card component pass: equal heights, rounded-2xl, soft shadow, hover lift, glass where on imagery.

## 8. Footer (src/components/layout/Footer.tsx)
- Redesign: Quick Links, Programs, Universities, Services, Scholarships, About, Contact columns; embed Google Map iframe for office; social icons row; newsletter input (client-only, no backend); legal row.

## 9. Animations
- Framer Motion: consistent `fadeInUp`, `staggerChildren`, hover micro-interactions. Prune anything excessive.

## 10. Responsive + SEO + perf QA
- Verify layouts at 360 / 768 / 1024 / 1440. Fix overflow with `min-w-0` / grid patterns.
- Confirm each route's `head()` has unique title, description, OG tags; add breadcrumbs JSON-LD on detail pages.
- `loading="lazy"` on non-critical images; ensure no CLS from hero.
- Run `bun run build`; resolve any errors.

## Out of scope (call out explicitly)
- Hand-authored bespoke long-form copy for every one of 12+ programs and 6 universities — templates render from data; user can enrich copy later.
- Backend newsletter capture (frontend-only unless Lovable Cloud is requested).

## Deliverables
Adaptive premium navbar with mega menus, faster non-overlapping showcase, corrected scholarships, dynamic university + course detail pages, redesigned footer, polished tokens/buttons/cards, clean build.
