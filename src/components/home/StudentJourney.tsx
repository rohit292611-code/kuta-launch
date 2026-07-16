import { motion } from "framer-motion";
import { journey } from "@/data/misc";
import { Section } from "@/components/ui/section";

export function StudentJourney() {
  return (
    <Section
      eyebrow="Student Journey"
      title={<>From first question to <span className="text-orange">final degree.</span></>}
      subtitle="A guided 8-step path. You never walk alone."
    >
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-hairline md:block" />
        <ol className="space-y-6 md:space-y-0">
          {journey.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li key={s.title} className="relative md:grid md:grid-cols-2 md:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
                  className={`surface-card p-6 md:my-6 ${isLeft ? "md:col-start-1" : "md:col-start-2"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
                <span className="absolute left-1/2 top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-4 border-background bg-orange md:block" />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
