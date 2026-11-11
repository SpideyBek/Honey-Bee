"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STORY_PARAGRAPHS = [
  "Every drop of honey begins with a remarkable journey. From blooming wildflowers to the tireless work of bees, nature creates something extraordinary through patience, harmony, and time.",
  "Stillness Bee Honey was inspired by this beautiful process and by the rich natural landscapes of Bulgaria, a country known for its mountains, valleys, and diverse flowering plants.",
  "Our brand was created around a simple idea: honey should be more than an everyday ingredient. It should be an invitation to slow down, appreciate nature, and discover the richness of life\u2019s simplest pleasures.",
  "Through Stillness Bee Honey, we aim to bring a sense of natural elegance to the everyday.",
];

export default function OurStory() {
  const { ref: imgRef,  isVisible: imgVisible  } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const { ref: textRef, isVisible: textVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section className="relative bg-obsidian py-24 lg:py-36 overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 20% 50%, rgba(199,162,98,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-14">

        {/* ── Two-column editorial layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image panel */}
          <div
            ref={imgRef}
            className={`relative overflow-hidden transition-all duration-1000 ease-out ${
              imgVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ height: "clamp(420px, 65vh, 680px)" }}
          >
            <Image
              src="/honey-wildflower.jpeg"
              alt="Wildflower honey — inspired by Bulgaria's natural landscapes"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={88}
              className="object-cover"
              style={{ objectPosition: "center 38%" }}
            />
            {/* Cinematic vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(160deg, rgba(21,20,18,0.3) 0%, rgba(21,20,18,0.08) 50%, rgba(21,20,18,0.5) 100%)",
              }}
            />
            {/* Right edge blend */}
            <div
              className="absolute inset-y-0 right-0 w-24 pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent, #151412)" }}
            />
            {/* Bottom edge blend */}
            <div
              className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
              style={{ background: "linear-gradient(to top, #151412, transparent)" }}
            />
          </div>

          {/* Text panel */}
          <div
            ref={textRef}
            className={`flex flex-col transition-all duration-1000 ease-out ${
              textVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-5 h-px bg-gold/50" />
              <span className="font-inter text-[9px] tracking-[0.35em] text-gold/60 uppercase">
                Our Story
              </span>
            </div>

            {/* Section heading */}
            <h2 className="font-cormorant font-light text-[clamp(2.2rem,4vw,3.4rem)] text-ivory leading-[1.05] mb-7">
              A Story Written{" "}
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
                by Nature.
              </span>
            </h2>

            {/* Gold divider */}
            <div
              className="w-10 h-px mb-8"
              style={{ background: "linear-gradient(to right, #C7A262, #E8BC5A)" }}
            />

            {/* Story paragraphs */}
            <div className="flex flex-col gap-5">
              {STORY_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="font-inter text-[0.9rem] text-ivory/48 leading-relaxed"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Decorative bottom rule */}
            <div className="flex items-center gap-4 mt-10">
              <div className="w-6 h-px bg-gold/30" />
              <span className="font-cormorant italic text-sm text-gold/40">
                Stillness Bee Honey
              </span>
              <div className="flex-1 h-px bg-gold/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
