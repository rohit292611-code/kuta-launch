import {
  GraduationCap, Compass, Laptop, BookOpen, School, FileText, Award, Search,
  Camera, Projector, Monitor, Cpu, Network, PanelsTopLeft, Volume2, Building2, Wrench, Server,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const educationServices: ServiceItem[] = [
  { title: "Admission Assistance", description: "End-to-end support to secure admission in UGC-recognized universities.", icon: GraduationCap },
  { title: "Career Counselling", description: "1-on-1 sessions to help you pick the right program & specialization.", icon: Compass },
  { title: "Online Programs", description: "Flexible UGC-DEB approved online degrees with live LMS access.", icon: Laptop },
  { title: "Distance Programs", description: "Affordable distance mode degrees from top private universities.", icon: BookOpen },
  { title: "Regular Admissions", description: "Full-time on-campus admissions across UG & PG programs.", icon: School },
  { title: "Documentation Help", description: "We handle verification, uploads & communication with the university.", icon: FileText },
  { title: "Scholarship Guidance", description: "Discover merit, need & category scholarships up to 30%.", icon: Award },
  { title: "University Selection", description: "Data-driven matching between your profile & top-fit universities.", icon: Search },
];

export const institutionalServices: ServiceItem[] = [
  { title: "CCTV Installation", description: "Enterprise-grade surveillance for schools, colleges & government offices.", icon: Camera },
  { title: "Projector Installation", description: "Short-throw and laser projectors for auditoriums & classrooms.", icon: Projector },
  { title: "Interactive Panels", description: "Touch-enabled smart panels for modern collaborative classrooms.", icon: PanelsTopLeft },
  { title: "Computer Supply", description: "Bulk desktops, laptops & workstations with warranty & AMC.", icon: Monitor },
  { title: "Networking Solutions", description: "Structured cabling, Wi-Fi 6, firewalls & campus-wide connectivity.", icon: Network },
  { title: "Smart Classroom Setup", description: "Turn-key smart classrooms with content, hardware & training.", icon: Cpu },
  { title: "Audio Systems", description: "Auditorium PA, conference audio & classroom sound reinforcement.", icon: Volume2 },
  { title: "Government Procurement", description: "GeM, tender & institutional procurement handled end-to-end.", icon: Building2 },
  { title: "AMC Services", description: "Annual maintenance contracts with SLA-backed field support.", icon: Wrench },
  { title: "IT Infrastructure", description: "Servers, storage, backup & data-center readiness for institutions.", icon: Server },
];
