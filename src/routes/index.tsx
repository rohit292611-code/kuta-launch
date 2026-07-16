import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { PartnerUniversities } from "@/components/home/PartnerUniversities";
import { About } from "@/components/home/About";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { StudentJourney } from "@/components/home/StudentJourney";
import { Services, GovernmentSolutions } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { Faqs } from "@/components/home/Faqs";
import { BlogsPreview } from "@/components/home/BlogsPreview";
import { CtaBanner } from "@/components/home/CtaBanner";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <PartnerUniversities />
      <About />
      <ProgramsPreview />
      <WhyChoose />
      <StudentJourney />
      <Services />
      <GovernmentSolutions />
      <Testimonials />
      <Faqs />
      <BlogsPreview />
      <CtaBanner />
    </>
  );
}
