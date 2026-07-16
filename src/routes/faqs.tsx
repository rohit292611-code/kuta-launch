import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/misc";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Kutastha Consultancy" },
      { name: "description", content: "Answers to the most common questions from students and parents about online, distance & regular degree admissions." },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={<>Answers to what parents ask us <span className="text-orange">most.</span></>}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "FAQs" }]}
      />
      <div className="container-x py-14">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-b border-hairline">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
