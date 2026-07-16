import { Link } from "@tanstack/react-router";
import { MessageCircle, ArrowRight } from "lucide-react";
import { site } from "@/data/site";

export function FloatingActions() {
  return (
    <>
      <a
        href={`https://wa.me/${site.whatsapp}?text=Hi%20Kutastha%2C%20I'd%20like%20to%20know%20more%20about%20admissions.`}
        target="_blank" rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_40px_-15px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/30" />
      </a>
      <Link
        to="/admissions"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-orange px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-15px_rgba(234,120,40,0.7)] transition-transform hover:scale-[1.03] md:inline-flex"
      >
        Apply Now <ArrowRight className="h-4 w-4" />
      </Link>
    </>
  );
}
