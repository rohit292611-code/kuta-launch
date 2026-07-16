export type ProgramMode = "Online" | "Distance" | "Regular";
export type ProgramCategory =
  | "Commerce"
  | "Management"
  | "Science"
  | "Computer Applications"
  | "Arts"
  | "Education";

export interface Program {
  id: string;
  name: string;
  code: string;
  category: ProgramCategory;
  mode: ProgramMode[];
  duration: string;
  eligibility: string;
  scholarship: string;
  universities: string[];
  description: string;
}

export const programs: Program[] = [
  {
    id: "bcom",
    name: "Bachelor of Commerce",
    code: "B.Com",
    category: "Commerce",
    mode: ["Online", "Distance", "Regular"],
    duration: "3 Years",
    eligibility: "10+2 in any stream",
    scholarship: "Up to 25%",
    universities: ["mangalayatan-university", "svn-university-sagar", "sabarmati-university"],
    description: "Foundation in accounting, taxation, business & economics for finance careers.",
  },
  {
    id: "mcom",
    name: "Master of Commerce",
    code: "M.Com",
    category: "Commerce",
    mode: ["Online", "Distance"],
    duration: "2 Years",
    eligibility: "B.Com or equivalent",
    scholarship: "Up to 25%",
    universities: ["mangalayatan-university", "svn-university-sagar"],
    description: "Advanced commerce with specialization tracks in accounting & finance.",
  },
  {
    id: "bba",
    name: "Bachelor of Business Administration",
    code: "BBA",
    category: "Management",
    mode: ["Online", "Regular"],
    duration: "3 Years",
    eligibility: "10+2 in any stream",
    scholarship: "Up to 30%",
    universities: ["suresh-gyan-vihar-university", "uttaranchal-university", "sabarmati-university"],
    description: "Modern management fundamentals with real-world case studies.",
  },
  {
    id: "mba",
    name: "Master of Business Administration",
    code: "MBA",
    category: "Management",
    mode: ["Online", "Distance", "Regular"],
    duration: "2 Years",
    eligibility: "Bachelor's degree",
    scholarship: "Up to 30%",
    universities: [
      "mangalayatan-university",
      "svn-university-sagar",
      "suresh-gyan-vihar-university",
      "uttaranchal-university",
    ],
    description: "10+ specializations across finance, HR, marketing, IT, healthcare & operations.",
  },
  {
    id: "bsc",
    name: "Bachelor of Science",
    code: "B.Sc",
    category: "Science",
    mode: ["Distance", "Regular"],
    duration: "3 Years",
    eligibility: "10+2 with Science",
    scholarship: "Up to 20%",
    universities: ["mangalayatan-university", "sabarmati-university", "uttaranchal-university"],
    description: "Broad science foundation with electives in maths, chemistry, biology, CS.",
  },
  {
    id: "msc",
    name: "Master of Science",
    code: "M.Sc",
    category: "Science",
    mode: ["Distance"],
    duration: "2 Years",
    eligibility: "B.Sc in relevant stream",
    scholarship: "Up to 20%",
    universities: ["mangalayatan-university", "svn-university-sagar"],
    description: "Specialized post-graduate science tracks with research focus.",
  },
  {
    id: "pgdca",
    name: "Post Graduate Diploma in Computer Applications",
    code: "PGDCA",
    category: "Computer Applications",
    mode: ["Distance", "Online"],
    duration: "1 Year",
    eligibility: "Any Bachelor's degree",
    scholarship: "Up to 20%",
    universities: ["mangalayatan-university"],
    description: "Fast-track career diploma in computer applications & IT fundamentals.",
  },
  {
    id: "bca",
    name: "Bachelor of Computer Applications",
    code: "BCA",
    category: "Computer Applications",
    mode: ["Online", "Distance"],
    duration: "3 Years",
    eligibility: "10+2 with Maths",
    scholarship: "Up to 25%",
    universities: ["uttaranchal-university"],
    description: "Programming, databases, web & modern software engineering foundations.",
  },
  {
    id: "mca",
    name: "Master of Computer Applications",
    code: "MCA",
    category: "Computer Applications",
    mode: ["Online"],
    duration: "2 Years",
    eligibility: "BCA / B.Sc CS / equivalent",
    scholarship: "Up to 25%",
    universities: ["uttaranchal-university"],
    description: "Advanced computing, cloud, AI/ML electives & industry projects.",
  },
  {
    id: "ba",
    name: "Bachelor of Arts",
    code: "BA",
    category: "Arts",
    mode: ["Distance", "Online"],
    duration: "3 Years",
    eligibility: "10+2 in any stream",
    scholarship: "Up to 20%",
    universities: ["suresh-gyan-vihar-university", "sabarmati-university", "uttaranchal-university"],
    description: "Humanities & social sciences with flexible electives.",
  },
  {
    id: "ma",
    name: "Master of Arts",
    code: "MA",
    category: "Arts",
    mode: ["Distance", "Online"],
    duration: "2 Years",
    eligibility: "Bachelor's degree",
    scholarship: "Up to 20%",
    universities: ["suresh-gyan-vihar-university", "sabarmati-university"],
    description: "Post-graduate humanities specialization for teaching & competitive careers.",
  },
];

export const programCategories: ProgramCategory[] = [
  "Commerce",
  "Management",
  "Science",
  "Computer Applications",
  "Arts",
  "Education",
];

export const programModes: ProgramMode[] = ["Online", "Distance", "Regular"];
