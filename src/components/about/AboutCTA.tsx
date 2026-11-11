"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutCTA() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative bg-obsidian py-24 lg:py-36 overflow-hidden">

      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(199,162,98,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Thin full-width rule at top */}
      <div
        className="max-w-3xl mx-auto px-6 mb-20"
        style={{ borderTop: "1px solid rgba(199,162,98,0.1)" }}
      />

      {/* Content */}
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center px-6 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Eyebrow ornament */}
        <div className="flex items-center justify-center gap-5 mb-10" aria-hidden>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/22" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/22" />
        </div>

        <p className="font-inter text-[9px] tracking-[0.4em] text-gold/55 uppercase mb-6">
          Begin Your Collection
        </p>

        <h2 className="font-cormorant font-light text-[clamp(2.6rem,5.5vw,5rem)] text-ivory leading-[0.95] tracking-[-0.01em] mb-8">
          Discover Your{" "}
          <span
            className="italic"
            style={{
              background:
                "linear-gradient(135deg, #C7A262 0%, #EDD898 50%, #C7A262 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
            }}
          >
            Golden Moment.
          </span>
        </h2>

        <p className="font-cormorant italic text-lg text-ivory/42 leading-relaxed max-w-md mx-auto mb-14">
          Explore our collection and discover the natural elegance of Stillness Bee Honey.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#collection"
            className="group relative overflow-hidden px-10 py-[14px] font-inter text-[10px] tracking-[0.22em] uppercase text-obsidian font-medium transition-all duration-300 hover:shadow-[0_8px_36px_rgba(199,162,98,0.35)]"
            style={{ background: "linear-gradient(135deg, #C7A262, #D4B87A)" }}
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Explore the Collection
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #D4B87A, #EDD898)" }}
            />
          </Link>

          <Link
            href="/"
            className="group relative px-10 py-[14px] font-inter text-[10px] tracking-[0.22em] uppercase text-ivory/50 hover:text-ivory border border-ivory/12 hover:border-gold/35 transition-all duration-300"
          >
            Back to Home
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-px w-0 bg-gold/45 transition-all duration-500 group-hover:w-full"
            />
          </Link>
        </div>
      </div>

      {/* Closing quote */}
      <div
        className={`mt-20 text-center transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="font-cormorant italic text-xl text-ivory/18 px-6">
          &ldquo;In every drop, a golden story.&rdquo;
        </p>
      </div>
    </section>
  );
}
