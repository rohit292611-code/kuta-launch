import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/misc";
import { Section } from "@/components/ui/section";

export function Faqs() {
  return (
    <Section
      eyebrow="FAQ"
      title={<>Questions parents ask us <span className="text-orange">most often.</span></>}
    >
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-hairline">
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
