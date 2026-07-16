import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import { Button } from "@/components/ui/button";

const slides = [
  { src: hero1, kicker: "Campus Life" },
  { src: hero2, kicker: "World-class Libraries" },
  { src: hero3, kicker: "Graduation Day" },
  { src: hero4, kicker: "Smart Classrooms" },
];

const floatingBadges = ["UGC", "NAAC", "AICTE", "UGC-DEB", "Admission Open", "Scholarships"];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-navy text-white">
      {/* Cinematic slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[i].src}
              alt=""
              className="h-full w-full object-cover"
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,61,0.35)_0%,rgba(15,30,61,0.65)_45%,rgba(15,30,61,0.9)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pt-32 pb-16 md:justify-center md:pt-24 md:pb-24">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-orange-soft" /> India's premium education consultancy
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Shape Your Future with
              <span className="block bg-gradient-to-r from-orange-soft to-orange bg-clip-text text-transparent">
                India's Leading Universities.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Helping students choose the right Online, Distance and Regular degree programs — from UGC, NAAC and AICTE approved universities across India.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="btn-magnetic bg-orange text-white hover:bg-orange/90">
                <Link to="/admissions">Apply Now <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white">
                <Link to="/universities">Explore Universities</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link to="/contact"><PlayCircle className="mr-1.5 h-4 w-4" /> Book Free Counselling</Link>
              </Button>
            </div>

            {/* Floating badges */}
            <div className="mt-10 flex flex-wrap gap-2">
              {floatingBadges.map((b, idx) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.08, duration: 0.6 }}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur-md"
                >
                  {b}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={idx}
            aria-label={`Show slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1 rounded-full transition-all ${idx === i ? "w-10 bg-orange" : "w-5 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
