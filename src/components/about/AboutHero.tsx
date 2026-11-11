"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function AboutHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-obsidian flex items-center justify-center"
      aria-label="About Stillness Bee Honey"
    >
      {/* Background photography */}
      <div className="absolute inset-0">
        <Image
          src="/hero-jars.png"
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.38) saturate(1.1)" }}
        />
      </div>

      {/* Top-to-bottom cinematic overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(21,20,18,0.72) 0%, rgba(21,20,18,0.22) 40%, rgba(21,20,18,0.78) 100%)",
        }}
      />

      {/* Warm gold centre bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 72% 65% at 50% 50%, rgba(199,162,98,0.12) 0%, transparent 72%)",
        }}
      />

      {/* ── Centred editorial content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 py-36 text-center">

        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-4 mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 900ms ease 100ms, transform 900ms ease 100ms",
          }}
        >
          <div className="w-8 h-px bg-gold/50" />
          <span className="font-inter text-[9px] tracking-[0.4em] text-gold/60 uppercase">
            Our Story
          </span>
          <div className="w-8 h-px bg-gold/50" />
        </div>

        {/* Main headline */}
        <h1
          className="font-cormorant font-light text-[clamp(3rem,6vw,6.5rem)] text-ivory leading-[0.92] tracking-[-0.01em] mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1000ms ease 240ms, transform 1000ms ease 240ms",
          }}
        >
          Rooted in Nature.
          <br />
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
            Crafted for Stillness.
          </span>
        </h1>

        {/* Gold rule */}
        <div
          className="flex justify-center mb-9"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 800ms ease 420ms",
          }}
        >
          <div className="w-12 h-px bg-gold/40" />
        </div>

        {/* Subheading */}
        <p
          className="font-cormorant italic text-xl lg:text-2xl text-ivory/62 leading-relaxed mb-7 max-w-2xl mx-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 1000ms ease 480ms, transform 1000ms ease 480ms",
          }}
        >
          &ldquo;Discover a world where nature&rsquo;s golden sweetness meets the
          art of living beautifully.&rdquo;
        </p>

        {/* Supporting paragraph */}
        <p
          className="font-inter text-sm text-ivory/40 leading-relaxed max-w-lg mx-auto mb-14"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1000ms ease 580ms, transform 1000ms ease 580ms",
          }}
        >
          At Stillness Bee Honey, we believe that life&rsquo;s most meaningful moments
          are often the simplest. Inspired by the natural beauty of Bulgaria, our
          brand celebrates the timeless relationship between flowers, bees, and the
          golden honey they create.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 1000ms ease 680ms, transform 1000ms ease 680ms",
          }}
        >
          <Link
            href="/#collection"
            className="group inline-flex items-center gap-3 font-inter text-[10px] tracking-[0.26em] uppercase text-gold/60 hover:text-gold transition-colors duration-300"
          >
            Explore Our Collection
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>

      {/* Bottom edge fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #151412, transparent)" }}
      />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 800ms ease 1100ms",
        }}
      >
        <span className="font-inter text-[8px] tracking-[0.42em] text-ivory/18 uppercase">
          Scroll
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 text-gold/26"
          style={{ animation: "subtlePulse 2.5s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
