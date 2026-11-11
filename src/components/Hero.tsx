"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const STATS = [
  { num: "100%", label: "Bulgarian Origin" },
  { num: "Raw", label: "& Unfiltered" },
  { num: "0", label: "Additives" },
] as const;

// Duplicated for seamless marquee loop (animation translates by -50%)
const TICKER = [
  "Bulgarian Origin",
  "Cold Extracted",
  "Raw & Unfiltered",
  "Single Origin",
  "Master Beekeepers",
  "No Additives",
  "Bulgarian Origin",
  "Cold Extracted",
  "Raw & Unfiltered",
  "Single Origin",
  "Master Beekeepers",
  "No Additives",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 11;
      const y = (e.clientY / window.innerHeight - 0.5) * 7;
      imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-obsidian"
      aria-label="Hero"
    >
      {/* Ambient warm glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 80% 50%, rgba(199,162,98,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Two-column grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 min-h-screen grid lg:grid-cols-2 items-center gap-10 lg:gap-6 pt-24 pb-24">

        {/* ═══════════════════
            LEFT — Editorial
        ═══════════════════ */}
        <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-10">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-9"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 900ms ease, transform 900ms ease",
              transitionDelay: "100ms",
            }}
          >
            <div className="w-8 h-px bg-gold/50" />
            <span className="font-inter text-[9px] tracking-[0.35em] text-gold/60 uppercase">
              Premium Bulgarian Honey · Naturally Exceptional
            </span>
          </div>

          {/* Headline — large, editorial */}
          <h1
            className="font-cormorant font-light leading-[0.88] tracking-[-0.01em] mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1000ms ease, transform 1000ms ease",
              transitionDelay: "220ms",
            }}
          >
            <span className="block text-[clamp(3.5rem,6.2vw,7rem)] text-ivory">
              Pure by Nature.
            </span>
            <span
              className="block text-[clamp(3.5rem,6.2vw,7rem)] italic"
              style={{
                background:
                  "linear-gradient(135deg, #C7A262 0%, #EDD898 45%, #C7A262 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 5s linear infinite",
              }}
            >
              Exceptional
            </span>
            <span
              className="block text-[clamp(3.5rem,6.2vw,7rem)] italic"
              style={{
                background:
                  "linear-gradient(135deg, #C7A262 0%, #EDD898 45%, #C7A262 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 5s linear infinite",
                animationDelay: "-2.5s",
              }}
            >
              by Origin.
            </span>
          </h1>

          {/* Gold rule */}
          <div
            className="h-px w-12 bg-gold/35 mb-7"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 800ms ease",
              transitionDelay: "370ms",
            }}
          />

          {/* Subtitle */}
          <p
            className="font-cormorant text-lg lg:text-[1.2rem] font-light text-ivory/44 leading-relaxed mb-10 max-w-[21rem]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 1000ms ease, transform 1000ms ease",
              transitionDelay: "420ms",
            }}
          >
            Discover the golden richness of premium honey imported from Bulgaria
            — carefully sourced, naturally exquisite, crafted for the
            discerning palate.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-3 mb-14"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1000ms ease, transform 1000ms ease",
              transitionDelay: "540ms",
            }}
          >
            {/* Primary */}
            <a
              href="#collection"
              className="group relative overflow-hidden px-8 py-[13px] font-inter text-[10px] tracking-[0.22em] uppercase text-obsidian font-medium"
              style={{ background: "linear-gradient(135deg, #C7A262, #D4B87A)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 36px rgba(199,162,98,0.35)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "none")
              }
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Explore Collection
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #D4B87A, #EDD898)" }}
              />
            </a>

            {/* Ghost */}
            <a
              href="#story"
              className="group relative px-8 py-[13px] font-inter text-[10px] tracking-[0.22em] uppercase text-ivory/55 hover:text-ivory border border-ivory/12 hover:border-gold/38 transition-all duration-300"
            >
              Our Story
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-gold/45 transition-all duration-500 group-hover:w-full"
              />
            </a>
          </div>

          {/* Stats row */}
          <div
            className="flex gap-10 pt-7 border-t border-ivory/[0.07]"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 1000ms ease",
              transitionDelay: "660ms",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <span className="font-cormorant text-[2rem] font-light text-gold/80 leading-none">
                  {s.num}
                </span>
                <span className="font-inter text-[8.5px] tracking-[0.22em] text-ivory/28 uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════
            RIGHT — Photo
        ═══════════════════ */}
        <div
          className="relative order-1 lg:order-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1200ms ease, transform 1200ms ease",
            transitionDelay: "160ms",
          }}
        >
          {/* Image frame */}
          <div
            className="relative overflow-hidden"
            style={{ height: "clamp(400px, 68vh, 720px)" }}
          >
            {/* Parallax image */}
            <div
              ref={imgRef}
              className="absolute inset-0"
              style={{
                willChange: "transform",
                transition:
                  "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <Image
                src="/hero-jars.png"
                alt="Stillness Bee Honey — Wildflower and Himalayan Reserve honey jars"
                fill
                priority
                quality={92}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: "50% 48%" }}
              />
            </div>

            {/* Left edge blends into text column */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #151412 0%, transparent 100%)",
              }}
            />
            {/* Bottom blend */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, #151412 0%, transparent 100%)",
              }}
            />
            {/* Gold bloom */}
            <div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 52% 45%, rgba(199,162,98,0.09) 0%, transparent 68%)",
              }}
            />

            {/* Floating product badge */}
            <div
              className="absolute bottom-8 right-8 z-20"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 800ms ease, transform 800ms ease",
                transitionDelay: "1000ms",
              }}
            >
              <div className="bg-obsidian/80 backdrop-blur-sm border border-gold/20 px-5 py-4 min-w-[160px]">
                <p className="font-inter text-[8px] tracking-[0.3em] text-gold/55 uppercase mb-2">
                  Now Available
                </p>
                <p className="font-cormorant text-[14px] font-light text-ivory/88 leading-snug">
                  Himalayan Reserve
                </p>
                <p className="font-cormorant text-[14px] font-light text-ivory/88 leading-snug">
                  Wildflower Collection
                </p>
                <div className="h-px w-full bg-gold/18 mt-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 800ms ease",
          transitionDelay: "1100ms",
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

      {/* ── Marquee ticker strip — bottom of hero ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-gold/[0.08]"
        style={{ height: "34px", background: "rgba(21,20,18,0.7)", backdropFilter: "blur(8px)" }}
        aria-hidden
      >
        <div
          className="flex items-center h-full animate-marquee"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {TICKER.map((item, i) => (
            <span
              key={i}
              className="font-inter text-[7.5px] tracking-[0.32em] text-gold/30 uppercase"
              style={{ padding: "0 28px" }}
            >
              {item}
              <span className="ml-[28px] text-gold/18">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
