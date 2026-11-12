"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const STATS = [
  { num: "100%", label: "Bulgarian Origin" },
  { num: "Raw", label: "& Unfiltered" },
  { num: "0", label: "Additives" },
] as const;

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

const IMAGE_FADE = `
  linear-gradient(
    to right,
    transparent 0%,
    rgba(0,0,0,0.35) 7%,
    black 23%,
    black 82%,
    rgba(0,0,0,0.45) 94%,
    transparent 100%
  ),
  linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0,0,0,0.45) 8%,
    black 22%,
    black 76%,
    rgba(0,0,0,0.45) 91%,
    transparent 100%
  )
`;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Existing subtle image parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 11;
      const y = (e.clientY / window.innerHeight - 0.5) * 7;

      imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.06)`;
    };

    window.addEventListener("mousemove", onMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      className="
        relative bg-obsidian overflow-hidden
        min-h-[100dvh]
        lg:h-[100dvh]
      "
      aria-label="Hero"
    >
      {/* Ambient golden background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 80% 50%, rgba(199,162,98,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Main two-column layout */}
      <div
        className="
          relative z-10 w-full max-w-7xl mx-auto
          px-6 lg:px-14
          grid lg:grid-cols-2
          items-center
          gap-8 lg:gap-6
          pt-20 pb-20
          lg:pt-0 lg:pb-[34px]
          lg:h-full
          lg:min-h-0
        "
      >
        {/* LEFT — Editorial content */}
        <div
          className="
            flex flex-col justify-center
            order-2 lg:order-1
            lg:pr-8
            min-w-0
          "
        >
          {/* Eyebrow */}
          <div
            className="
              flex items-center gap-4
              mb-5 lg:mb-4
            "
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 900ms ease, transform 900ms ease",
              transitionDelay: "100ms",
            }}
          >
            <div className="w-8 h-px bg-gold/50" />

            <span
              className="
                font-inter text-[9px]
                tracking-[0.35em]
                text-gold/60 uppercase
              "
            >
              Premium Bulgarian Honey · Naturally Exceptional
            </span>
          </div>

          {/* Headline */}
          <h1
            className="
              font-cormorant font-light
              leading-[0.88]
              tracking-[-0.01em]
              mb-5 lg:mb-4
            "
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1000ms ease, transform 1000ms ease",
              transitionDelay: "220ms",
            }}
          >
            <span
              className="
                block
                text-[clamp(3.3rem,5.4vw,6.3rem)]
                lg:text-[clamp(3.2rem,5vw,5.8rem)]
                text-ivory
              "
            >
              Pure by Nature.
            </span>

            <span
              className="
                block italic
                text-[clamp(3.3rem,5.4vw,6.3rem)]
                lg:text-[clamp(3.2rem,5vw,5.8rem)]
              "
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
              className="
                block italic
                text-[clamp(3.3rem,5.4vw,6.3rem)]
                lg:text-[clamp(3.2rem,5vw,5.8rem)]
              "
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

          {/* Gold divider */}
          <div
            className="
              h-px w-12 bg-gold/35
              mb-5 lg:mb-4
            "
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 800ms ease",
              transitionDelay: "370ms",
            }}
          />

          {/* Description */}
          <p
            className="
              font-cormorant
              text-lg lg:text-[1.1rem]
              font-light
              text-ivory/65
              leading-relaxed
              mb-6 lg:mb-5
              max-w-[23rem]
            "
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 1000ms ease, transform 1000ms ease",
              transitionDelay: "420ms",
            }}
          >
            Discover the golden richness of premium honey imported from Bulgaria
            — carefully sourced, naturally exquisite, crafted for the discerning
            palate.
          </p>

          {/* CTA buttons */}
          <div
            className="
              flex flex-wrap gap-3
              mb-7 lg:mb-6
            "
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1000ms ease, transform 1000ms ease",
              transitionDelay: "540ms",
            }}
          >
            {/* Primary button */}
            <a
              href="#collection"
              className="
                group relative overflow-hidden
                px-7 py-[12px]
                font-inter text-[10px]
                tracking-[0.22em]
                uppercase text-obsidian
                font-medium
              "
              style={{
                background: "linear-gradient(135deg, #C7A262, #D4B87A)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 36px rgba(199,162,98,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="
                  relative z-10
                  flex items-center gap-2.5
                "
              >
                Explore Collection
                <ArrowRight
                  className="
                    w-3.5 h-3.5
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </span>

              <span
                aria-hidden="true"
                className="
                  absolute inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                "
                style={{
                  background: "linear-gradient(135deg, #D4B87A, #EDD898)",
                }}
              />
            </a>

            {/* Secondary button */}
            <a
              href="/about"
              className="
                group relative
                px-7 py-[12px]
                font-inter text-[10px]
                tracking-[0.22em]
                uppercase
                text-ivory/80
                hover:text-ivory
                border border-ivory/35
                hover:border-gold/60
                transition-all duration-300
              "
            >
              Our Story
              <span
                aria-hidden="true"
                className="
                  absolute bottom-0 left-0
                  h-px w-0 bg-gold/45
                  transition-all duration-500
                  group-hover:w-full
                "
              />
            </a>
          </div>

          {/* Product statistics */}
          <div
            className="
              flex flex-wrap
              gap-x-7 gap-y-4
              lg:gap-x-8
              pt-4 lg:pt-4
              border-t border-ivory/[0.07]
            "
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 1000ms ease",
              transitionDelay: "660ms",
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="
                    font-cormorant
                    text-[1.7rem]
                    lg:text-[1.8rem]
                    font-light
                    text-gold/80
                    leading-none
                  "
                >
                  {stat.num}
                </span>

                <span
                  className="
                    font-inter
                    text-[8px]
                    tracking-[0.18em]
                    text-ivory/65
                    uppercase
                  "
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Borderless honey jar image */}
        <div
          className="
            relative
            order-1 lg:order-2
            min-w-0
          "
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1200ms ease, transform 1200ms ease",
            transitionDelay: "160ms",
          }}
        >
          <div
            className="
              relative
              h-[380px]
              sm:h-[460px]
              lg:h-[min(64dvh,620px)]
            "
          >
            {/*
              Four-sided image mask.

              Both gradients are intersected so the
              image fades at every edge.

              No solid background overlays are used,
              allowing the actual hero background
              to show through naturally.
            */}
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage: IMAGE_FADE,
                WebkitMaskComposite: "source-in",
                maskImage: IMAGE_FADE,
                maskComposite: "intersect",
              }}
            >
              {/* Existing parallax image */}
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
                  style={{
                    objectPosition: "50% 48%",
                  }}
                />
              </div>
            </div>

            {/* Product badge stays outside mask */}
            <div
              className="
                absolute bottom-5 right-5
                lg:bottom-6 lg:right-6
                z-20
              "
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 800ms ease, transform 800ms ease",
                transitionDelay: "1000ms",
              }}
            >
              <div
                className="
                  bg-obsidian/80
                  backdrop-blur-sm
                  border border-gold/20
                  px-4 py-3
                  min-w-[150px]
                "
              >
                <p
                  className="
                    font-inter text-[8px]
                    tracking-[0.3em]
                    text-gold/55 uppercase
                    mb-2
                  "
                >
                  Now Available
                </p>

                <p
                  className="
                    font-cormorant
                    text-[14px] font-light
                    text-ivory/88 leading-snug
                  "
                >
                  Himalayan Reserve
                </p>

                <p
                  className="
                    font-cormorant
                    text-[14px] font-light
                    text-ivory/88 leading-snug
                  "
                >
                  Wildflower Collection
                </p>

                <div className="h-px w-full bg-gold/18 mt-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop */}
      <div
        className="
          hidden xl:flex
          absolute bottom-[52px] left-1/2
          -translate-x-1/2
          z-20
          flex-col items-center gap-1
          pointer-events-none
        "
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 800ms ease",
          transitionDelay: "1100ms",
        }}
      >
        <span
          className="
            font-inter text-[8px]
            tracking-[0.42em]
            text-ivory/40 uppercase
          "
        >
          Scroll
        </span>

        <ChevronDown
          className="w-3.5 h-3.5 text-gold/40"
          style={{
            animation: "subtlePulse 2.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Bottom marquee ticker */}
      <div
        className="
          relative lg:absolute
          bottom-0 left-0 right-0
          z-30 overflow-hidden
          border-t border-gold/[0.08]
        "
        style={{
          height: "34px",
          background: "rgba(21,20,18,0.7)",
          backdropFilter: "blur(8px)",
        }}
        aria-hidden="true"
      >
        <div
          className="
            flex items-center h-full
            animate-marquee
          "
          style={{
            width: "max-content",
            willChange: "transform",
          }}
        >
          {TICKER.map((item, index) => (
            <span
              key={index}
              className="
                font-inter
                text-[7.5px]
                tracking-[0.32em]
                text-gold/30 uppercase
              "
              style={{
                padding: "0 28px",
              }}
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
