"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function StillnessExperience() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section className="relative overflow-hidden bg-obsidian">

      {/* ── Full-width immersive panel ── */}
      <div
        ref={ref}
        className={`relative transition-opacity duration-[1200ms] ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "clamp(480px, 68vh, 760px)" }}
      >
        {/* Background photography */}
        <Image
          src="/honey-wildflower.jpeg"
          alt="The stillness experience — honey in a moment of quiet beauty"
          fill
          sizes="100vw"
          quality={88}
          className="object-cover"
          style={{ objectPosition: "center 30%", filter: "brightness(0.42) saturate(1.08)" }}
        />

        {/* Cinematic overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(21,20,18,0.60) 0%, rgba(21,20,18,0.15) 38%, rgba(21,20,18,0.72) 100%)",
          }}
        />
        {/* Warm gold centre bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(199,162,98,0.11) 0%, transparent 70%)",
          }}
        />

        {/* Centred editorial text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div
            className="w-px h-10 bg-gradient-to-b from-transparent via-gold/40 to-transparent mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scaleY(1)" : "scaleY(0)",
              transition: "opacity 900ms ease 300ms, transform 900ms ease 300ms",
            }}
          />

          <p
            className="font-inter text-[9px] tracking-[0.4em] text-gold/60 uppercase mb-7"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 900ms ease 450ms, transform 900ms ease 450ms",
            }}
          >
            The Stillness Experience
          </p>

          <h2
            className="font-cormorant font-light text-[clamp(2.4rem,5vw,5rem)] text-ivory leading-[1.0] mb-8 max-w-3xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1000ms ease 560ms, transform 1000ms ease 560ms",
            }}
          >
            More Than Honey.{" "}
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
              A Moment to Remember.
            </span>
          </h2>

          <div className="max-w-xl mx-auto flex flex-col gap-5">
            {[
              "We believe the smallest moments deserve to be celebrated.",
              "Whether stirred into a warm cup of tea, shared at the breakfast table, or enjoyed as part of a daily ritual, honey has a special way of bringing warmth to ordinary experiences.",
              "Stillness Bee Honey is an invitation to embrace these moments — to slow down, reconnect with nature, and enjoy a little golden sweetness.",
            ].map((para, i) => (
              <p
                key={i}
                className="font-cormorant italic text-[1.05rem] text-ivory/55 leading-relaxed"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 1000ms ease ${680 + i * 120}ms, transform 1000ms ease ${680 + i * 120}ms`,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          <div
            className="w-px h-10 bg-gradient-to-b from-transparent via-gold/40 to-transparent mt-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 900ms ease 1000ms",
            }}
          />
        </div>

        {/* Bottom fade to CTA section */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, #151412, transparent)" }}
        />
      </div>
    </section>
  );
}
