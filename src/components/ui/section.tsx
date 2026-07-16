import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  eyebrow, title, subtitle, children, className = "", id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-x">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            {eyebrow && <div className="eyebrow justify-center">{eyebrow}</div>}
            {title && <h2 className="mt-4 text-3xl leading-[1.1] text-navy md:text-5xl">{title}</h2>}
            {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>}
          </motion.div>
        )}
        <div className={(eyebrow || title || subtitle) ? "mt-14" : ""}>{children}</div>
      </div>
    </section>
  );
}
