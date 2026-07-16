import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-4xl bg-navy p-10 text-white md:p-16"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-orange/10 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <div className="eyebrow text-orange-soft">Take the first step</div>
              <h2 className="mt-4 text-3xl leading-[1.1] md:text-5xl">
                Book a free 20-minute counselling <span className="text-orange">with a certified advisor.</span>
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Bring your questions. Walk away with a personalised university & program shortlist — no pressure, no fees.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="btn-magnetic bg-orange text-white hover:bg-orange/90">
                <Link to="/contact">Book Free Counselling <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}
                 className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                <PhoneCall className="h-4 w-4" /> Call {site.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
