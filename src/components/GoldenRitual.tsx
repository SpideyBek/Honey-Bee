"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

/* ── Data ── */
const RITUALS = [
  {
    id: "fitness",
    no: "01",
    category: "Fitness & Energy",
    headline: "Fuel Your\nAmbition.",
    body: "Pure, unprocessed carbohydrates make raw honey an ideal companion before a workout or during recovery — sustained energy without the artificial edge.",
    cta: "Explore Energy Rituals",
    accentColor: "#E8BC5A",
  },
  {
    id: "skincare",
    no: "02",
    category: "Skincare & Beauty",
    headline: "Nature's\nGolden Touch.",
    body: "Honey has been revered for centuries in beauty rituals around the world. Its natural humectant properties help lock in moisture for a luminous, radiant complexion.",
    cta: "Discover Beauty Rituals",
    accentColor: "#D4B87A",
  },
  {
    id: "wellness",
    no: "03",
    category: "Everyday Wellness",
    headline: "Elevate Your\nEveryday.",
    body: "Stirred into morning tea, swirled through yogurt, or savoured alone — a single spoonful of our Bulgarian honey transforms the ordinary into a quiet, golden ceremony.",
    cta: "Explore Daily Rituals",
    accentColor: "#C7A262",
  },
] as const;

export default function GoldenRitual() {
  const { ref: bannerRef, isVisible: bannerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  const { ref: columnsRef, isVisible: columnsVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  const { ref: quoteRef, isVisible: quoteVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section
      id="ritual"
      className="relative bg-obsidian overflow-hidden"
      aria-labelledby="ritual-heading"
    >
      {/* ════════════════════════════════════
          CINEMATIC BANNER — product image
          as atmospheric full-width header
      ════════════════════════════════════ */}
      <div
        ref={bannerRef}
        className={`relative overflow-hidden transition-opacity duration-[1200ms] ease-out ${
          bannerVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "clamp(400px, 58vh, 700px)" }}
      >
        {/* Background photography */}
        <Image
          src="/hero-jars.png"
          alt="Stillness Bee Honey jars — cinematic studio still"
          fill
          quality={88}
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.5) saturate(1.15)" }}
        />

        {/* Top-to-bottom dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(21,20,18,0.68) 0%, rgba(21,20,18,0.18) 40%, rgba(21,20,18,0.82) 100%)",
          }}
        />

        {/* Centred warm gold bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 72% 65% at 50% 50%, rgba(199,162,98,0.13) 0%, transparent 70%)",
          }}
        />

        {/* ── Centred text ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {/* Vertical bar */}
          <div
            className="w-px h-12 bg-gradient-to-b from-transparent via-gold/45 to-transparent mb-8"
            style={{
              opacity: bannerVisible ? 1 : 0,
              transform: bannerVisible ? "scaleY(1)" : "scaleY(0)",
              transition: "opacity 900ms ease 300ms, transform 900ms ease 300ms",
            }}
          />

          <p
            className="font-inter text-[9px] tracking-[0.42em] text-gold/62 uppercase mb-6"
            style={{
              opacity: bannerVisible ? 1 : 0,
              transform: bannerVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 900ms ease 400ms, transform 900ms ease 400ms",
            }}
          >
            A Life Well Lived
          </p>

          <h2
            id="ritual-heading"
            className="font-cormorant font-light text-[clamp(2.8rem,5.5vw,5.2rem)] text-ivory leading-[1.0] mb-5 max-w-2xl"
            style={{
              opacity: bannerVisible ? 1 : 0,
              transform: bannerVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1000ms ease 500ms, transform 1000ms ease 500ms",
            }}
          >
            The{" "}
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(135deg, #C7A262 0%, #F1E5CF 50%, #C7A262 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Golden Ritual
            </span>
          </h2>

          <p
            className="font-cormorant italic text-[1.2rem] text-ivory/50 leading-relaxed max-w-sm"
            style={{
              opacity: bannerVisible ? 1 : 0,
              transform: bannerVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1000ms ease 640ms, transform 1000ms ease 640ms",
            }}
          >
            Honey, elevated into daily ceremony.
          </p>

          {/* Vertical bar */}
          <div
            className="w-px h-12 bg-gradient-to-b from-transparent via-gold/45 to-transparent mt-8"
            style={{
              opacity: bannerVisible ? 1 : 0,
              transition: "opacity 900ms ease 750ms",
            }}
          />
        </div>

        {/* Bottom fade to section body */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "100px",
            background:
              "linear-gradient(to top, #151412 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ════════════════════════════════════
          THREE EDITORIAL COLUMNS
      ════════════════════════════════════ */}
      <div
        ref={columnsRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8"
      >
        {/* Thin full-width rule */}
        <div
          className="w-full h-px mb-14"
          style={{ background: "rgba(199,162,98,0.08)" }}
        />

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(199,162,98,0.07)" }}>
          {RITUALS.map((ritual, i) => (
            <div
              key={ritual.id}
              className={`bg-obsidian flex flex-col px-8 lg:px-10 py-10 transition-all duration-1000 ease-out ${
                columnsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 170}ms` }}
            >
              {/* Large faded number */}
              <span
                className="font-cormorant text-[5rem] font-light leading-none mb-5 select-none"
                style={{ color: ritual.accentColor, opacity: 0.2 }}
              >
                {ritual.no}
              </span>

              {/* Category label */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-4 h-px"
                  style={{ background: ritual.accentColor, opacity: 0.55 }}
                />
                <span className="font-inter text-[9px] tracking-[0.3em] text-gold/55 uppercase">
                  {ritual.category}
                </span>
              </div>

              {/* Headline */}
              <h3
                className="font-cormorant font-light text-[1.75rem] text-ivory leading-[1.1] mb-5"
                style={{ whiteSpace: "pre-line" }}
              >
                {ritual.headline}
              </h3>

              {/* Body */}
              <p className="font-inter text-sm text-ivory/44 leading-relaxed mb-8 flex-1">
                {ritual.body}
              </p>

              {/* CTA */}
              <button className="group flex items-center gap-2 font-inter text-[9px] tracking-[0.22em] uppercase text-gold/52 hover:text-gold transition-colors duration-300 self-start mt-auto">
                {ritual.cta}
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          CLOSING QUOTE
      ════════════════════════════════════ */}
      <div
        ref={quoteRef}
        className={`py-20 text-center transition-all duration-1000 ease-out ${
          quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Thin rule */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/18" />
          <div className="w-1 h-1 rounded-full bg-gold/32" />
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/18" />
        </div>

        <p className="font-cormorant italic text-xl text-ivory/22 px-6">
          &ldquo;Every ritual deserves a golden touch.&rdquo;
        </p>
      </div>
    </section>
  );
}
