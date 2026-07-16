import { motion } from "framer-motion";
import { stats } from "@/data/misc";
import { Counter } from "@/components/ui/counter";

export function Stats() {
  return (
    <section className="border-y border-hairline bg-card">
      <div className="container-x grid gap-8 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
            className="text-center md:text-left"
          >
            <div className="text-4xl font-bold text-navy md:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
