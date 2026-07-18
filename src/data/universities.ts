import mangalayatanImg from "@/assets/uni-mangalayatan.jpg";
import svnImg from "@/assets/uni-svn.jpg";
import sgvuImg from "@/assets/uni-sgvu.jpg";
import sabarmatiImg from "@/assets/uni-sabarmati.jpg";
import uttaranchalImg from "@/assets/uni-uttaranchal.jpg";
import shooliniImg from "@/assets/uni-shoolini.jpg";
import life1 from "@/assets/campus-life-1.jpg";
import life2 from "@/assets/campus-life-2.jpg";
import life3 from "@/assets/campus-life-3.jpg";
import life4 from "@/assets/campus-life-4.jpg";

export interface CourseDetail {
  name: string;
  duration: string;
  mode: string;
  fee: string;
  category: "UG" | "PG" | "Diploma";
}

export interface ScholarshipTier {
  label: string;
  criteria: string;
  discount: number; // percentage 0-100
}

export interface UniStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface University {
  slug: string;
  name: string;
  short: string;
  location: string;
  established: string;
  tagline: string;
  image: string;
  gallery: string[];
  website: string;
  approvals: string[];
  programs: string[];
  categories: ("Online" | "Distance" | "Regular")[];
  scholarship: string;
  highlights: string[];
  about: string;
  eligibility: {
    ug: string;
    pg: string;
  };
  placement: string[];
  admissionSteps: string[];
  faqs: { q: string; a: string }[];
  campusGallery?: string[];
  courseDetails?: CourseDetail[];
  scholarshipTiers?: ScholarshipTier[];
  stats?: UniStat[];
}

export const sharedCampusGallery = [life1, life2, life3, life4];

export const universities: University[] = [
  {
    slug: "mangalayatan-university",
    name: "Mangalayatan University",
    short: "MU",
    location: "Aligarh, Uttar Pradesh",
    established: "2006",
    tagline: "One of the most recognized private universities for online & distance degrees.",
    image: mangalayatanImg,
    gallery: [mangalayatanImg],
    website: "https://www.mangalayatan.in",
    approvals: ["UGC", "UGC-DEB", "NAAC A+"],
    programs: ["B.Com", "M.Com", "B.Sc", "M.Sc", "BBA", "MBA", "BA", "MA", "PGDCA"],
    categories: ["Online", "Distance", "Regular"],
    scholarship: "Up to 30% merit scholarship on eligible programs",
    highlights: ["NAAC A+ Accredited", "20+ Years of Legacy", "Pan-India Learner Base"],
    about:
      "Mangalayatan University is a UGC-recognized private university located in Aligarh, Uttar Pradesh. Its Online & Distance wing (muonline.ac.in) delivers career-focused UG and PG programs with merit-based admissions and no entrance test for most courses.",
    eligibility: {
      ug: "10+2 from a recognized board with minimum 45% aggregate.",
      pg: "Bachelor's degree in a relevant stream from a recognized university.",
    },
    placement: ["Amazon", "TCS", "Wipro", "HDFC Bank", "ICICI Bank"],
    admissionSteps: [
      "Free counselling with Kutastha advisor",
      "Fill online application form",
      "Upload documents (ID, marksheets, photo)",
      "Pay first-semester fee",
      "Receive LMS access & student ID",
    ],
    faqs: [
      { q: "Is the online degree UGC recognised?", a: "Yes. The programs are approved by UGC-DEB and equivalent to regular mode degrees." },
      { q: "Is there any entrance exam?", a: "No entrance exam for most UG/PG online programs — admission is merit based." },
    ],
  },
  {
    slug: "svn-university-sagar",
    name: "Swami Vivekanand University (SVN University)",
    short: "SVN",
    location: "Sagar, Madhya Pradesh",
    established: "2011",
    tagline: "A sprawling 65-acre campus with UGC, AICTE, NCTE, BCI & PCI approved streams.",
    image: svnImg,
    gallery: [svnImg],
    website: "https://www.svnuniversity.co.in",
    approvals: ["UGC", "AICTE", "NCTE", "BCI", "PCI", "AIU"],
    programs: ["B.Com", "M.Com", "B.Sc", "M.Sc", "BBA", "MBA", "BA", "MA"],
    categories: ["Distance", "Online", "Regular"],
    scholarship: "Merit scholarship up to 25% on tuition",
    highlights: ["65-acre Green Campus", "Multi-discipline University", "AIU Member"],
    about:
      "Swami Vivekanand University, Sagar is a state private university with a 65-acre campus. It offers a broad portfolio of UG and PG streams across Commerce, Management, Science and Humanities via regular, distance and online modes.",
    eligibility: {
      ug: "10+2 with 45% marks (relaxation for reserved categories).",
      pg: "Graduation in a relevant discipline with 50% marks.",
    },
    placement: ["Infosys", "Cognizant", "Byju's", "Reliance"],
    admissionSteps: [
      "Talk to a Kutastha advisor",
      "Choose your program & mode",
      "Submit application + documents",
      "Fee payment & confirmation",
      "Onboarding & orientation",
    ],
    faqs: [
      { q: "Which mode should I pick — Online or Distance?", a: "Online mode gives you a live LMS, recorded classes and digital exams. Distance is document-based and cheaper." },
    ],
  },
  {
    slug: "suresh-gyan-vihar-university",
    name: "Suresh Gyan Vihar University",
    short: "SGVU",
    location: "Jaipur, Rajasthan",
    established: "2008",
    tagline: "Rajasthan's first private university with NAAC 'A' grade and a strong placement network.",
    image: sgvuImg,
    gallery: [sgvuImg],
    website: "https://www.sgvu.edu.in",
    approvals: ["UGC-DEB", "AICTE", "NAAC A", "AIU"],
    programs: ["BA", "B.Com", "BBA", "MA", "M.Com", "MBA"],
    categories: ["Distance", "Online"],
    scholarship: "Up to 25% scholarship for eligible students",
    highlights: ["NAAC 'A' Grade", "CDOE Learning Platform", "Corporate Tie-ups"],
    about:
      "Suresh Gyan Vihar University is Rajasthan's first private university with a NAAC 'A' accreditation. Its Centre for Distance and Online Education (CDOE) offers UG and PG programs including MBA with multiple specializations.",
    eligibility: {
      ug: "10+2 pass from a recognized board.",
      pg: "Bachelor's degree from a recognized university.",
    },
    placement: ["Amazon", "IBM", "Deloitte", "Accenture"],
    admissionSteps: [
      "Book free counselling",
      "Select course & specialization",
      "Complete online application",
      "Pay semester fee",
      "Access CDOE learning portal",
    ],
    faqs: [
      { q: "How many MBA specializations are offered?", a: "SGVU offers 10+ MBA specializations across finance, HR, marketing, IT and healthcare." },
    ],
  },
  {
    slug: "sabarmati-university",
    name: "Sabarmati University",
    short: "SU",
    location: "Ahmedabad, Gujarat",
    established: "2009",
    tagline: "Gujarat's first private dual-mode distance education university.",
    image: sabarmatiImg,
    gallery: [sabarmatiImg],
    website: "https://www.sabarmatiuniversity.edu.in",
    approvals: ["UGC", "AIU", "NCTE", "PCI", "BCI"],
    programs: ["BA", "MA", "BBA", "MBA", "B.Com", "M.Com", "B.Sc", "M.Sc"],
    categories: ["Distance", "Regular"],
    scholarship: "Merit-based scholarship up to 25%",
    highlights: ["Dual-Mode University", "AIU Member", "Wide Program Portfolio"],
    about:
      "Sabarmati University (formerly Calorx Teachers' University) is the first private dual-mode university in Gujarat. It offers a wide spread of Commerce, Management, Science and Humanities programs via its Directorate of Distance Education.",
    eligibility: {
      ug: "10+2 with minimum 45% aggregate.",
      pg: "Graduation with minimum 50% marks in relevant subject.",
    },
    placement: ["Adani", "Torrent", "Zydus", "Nirma"],
    admissionSteps: [
      "Free consultation with Kutastha",
      "Choose program stream",
      "Application + document upload",
      "Fee payment",
      "Student ID + LMS access",
    ],
    faqs: [
      { q: "Are Sabarmati distance degrees valid for government jobs?", a: "Yes, all UGC-recognized degrees are equivalent to regular degrees and valid for government exams." },
    ],
  },
  {
    slug: "uttaranchal-university",
    name: "Uttaranchal University",
    short: "UU",
    location: "Dehradun, Uttarakhand",
    established: "2013",
    tagline: "First private university in Uttarakhand to earn NAAC A+ in its first accreditation cycle.",
    image: uttaranchalImg,
    gallery: [uttaranchalImg],
    website: "https://www.uttaranchaluniversity.ac.in",
    approvals: ["UGC 2(f) & 12(B)", "AICTE", "NAAC A+"],
    programs: ["BA", "BBA", "MBA", "BCA", "MCA", "B.Com", "M.Com", "B.Sc", "M.Sc"],
    categories: ["Online", "Distance"],
    scholarship: "Up to 30% early-bird & merit scholarship",
    highlights: ["NAAC A+ (Cycle 1)", "Top 5% HEIs (self-reported)", "U-CODE Online Platform"],
    about:
      "Uttaranchal University is a leading private university located in Dehradun. Through its College of Online & Distance Education (U-CODE), it delivers career-focused UG and PG programs designed for working professionals.",
    eligibility: {
      ug: "10+2 in any stream from a recognized board.",
      pg: "Bachelor's degree in a relevant discipline.",
    },
    placement: ["TCS", "Wipro", "Genpact", "HCL"],
    admissionSteps: [
      "Free profile assessment",
      "Program & specialization selection",
      "Application submission",
      "Fee payment & enrolment",
      "Onboarding on U-CODE",
    ],
    faqs: [
      { q: "Is the MBA at Uttaranchal AICTE approved?", a: "Yes, the MBA programs at Uttaranchal University are AICTE-approved and industry aligned." },
    ],
  },
];

export const findUniversity = (slug: string) =>
  universities.find((u) => u.slug === slug);

const feeMap: Record<string, string> = {
  "B.Com": "₹18,000/sem", "M.Com": "₹22,000/sem",
  "B.Sc": "₹20,000/sem", "M.Sc": "₹24,000/sem",
  "BBA": "₹28,000/sem", "MBA": "₹42,000/sem",
  "BA": "₹15,000/sem", "MA": "₹18,000/sem",
  "BCA": "₹26,000/sem", "MCA": "₹34,000/sem",
  "PGDCA": "₹20,000/sem",
};

const isPG = (p: string) => /^(M|PG)/.test(p);

export const deriveCourseDetails = (u: University): CourseDetail[] =>
  u.courseDetails ?? u.programs.map((p) => ({
    name: p,
    duration: isPG(p) ? "2 Years" : p === "PGDCA" ? "1 Year" : "3 Years",
    mode: u.categories.join(" · "),
    fee: feeMap[p] ?? "On request",
    category: p === "PGDCA" ? "Diploma" : isPG(p) ? "PG" : "UG",
  }));

export const defaultScholarshipTiers: ScholarshipTier[] = [
  { label: "Merit Star", criteria: "85%+ in qualifying exam", discount: 30 },
  { label: "Early Bird", criteria: "Apply within first 30 days", discount: 20 },
  { label: "Defence & Divyang", criteria: "Wards of defence / PwD", discount: 25 },
  { label: "Sibling Waiver", criteria: "Second family member enrolled", discount: 10 },
];

export const defaultStats: UniStat[] = [
  { label: "Learners enrolled", value: 45, suffix: "K+" },
  { label: "Programs offered", value: 60, suffix: "+" },
  { label: "Recruiters", value: 250, suffix: "+" },
  { label: "Placement rate", value: 92, suffix: "%" },
];

