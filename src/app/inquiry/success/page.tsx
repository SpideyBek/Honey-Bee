import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Inquiry Received — Stillness Bee Honey",
  description:
    "Your inquiry has been received. A member of our team will be in touch within 1–2 business days.",
};

export default function InquirySuccessPage() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">

      {/* Decorative gold ring */}
      <div className="relative mb-10">
        {/* Outer ring */}
        <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center">
          {/* Inner ring */}
          <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center">
            {/* Checkmark */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 11.5L9 16.5L18 7"
                stroke="#C7A262"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(199,162,98,0.12) 0%, transparent 70%)",
            transform: "scale(2.5)",
          }}
        />
      </div>

      {/* Heading */}
      <p className="font-inter text-[9px] tracking-[0.32em] uppercase text-gold/60 mb-4">
        Inquiry Received
      </p>
      <h1 className="font-cormorant text-4xl md:text-5xl text-ivory font-light leading-tight mb-5">
        Thank You for Your Interest.
      </h1>
      <p className="font-cormorant text-xl text-ivory/55 font-light italic max-w-md mb-10 leading-relaxed">
        A member of our team will be in touch within&nbsp;1–2 business days to
        discuss your order and answer any questions.
      </p>

      {/* What happens next */}
      <div className="flex flex-col sm:flex-row gap-px mb-14 max-w-xl w-full">
        {[
          { no: "01", label: "Inquiry logged",    body: "Your details and product selection have been noted by our team." },
          { no: "02", label: "We'll reach out",   body: "Expect a personal message within 1–2 business days." },
          { no: "03", label: "Your order ships",  body: "Once confirmed, your honey is carefully packed and dispatched." },
        ].map(({ no, label, body }) => (
          <div
            key={no}
            className="flex-1 bg-ivory/[0.025] border border-ivory/[0.06] p-6 text-left"
          >
            <p className="font-inter text-[9px] tracking-[0.28em] uppercase text-gold/50 mb-3">
              {no}
            </p>
            <p className="font-cormorant text-[17px] text-ivory/80 font-medium mb-2">
              {label}
            </p>
            <p className="font-inter text-[11px] text-ivory/35 leading-relaxed">
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-inter text-[11px] tracking-[0.22em] uppercase
                     bg-gold text-obsidian px-8 py-3.5 hover:bg-gold-light transition-colors"
        >
          Back to Home
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
        <Link
          href="/#collection"
          className="inline-flex items-center gap-2 font-inter text-[11px] tracking-[0.22em] uppercase
                     text-gold border border-gold/35 px-8 py-3.5 hover:bg-gold/8 transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
