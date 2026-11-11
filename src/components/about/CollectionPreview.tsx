"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/data/products";

export default function CollectionPreview() {
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  const { ref: gridRef, isVisible: gridVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section className="relative bg-obsidian py-24 lg:py-36 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(199,162,98,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Ornamental divider */}
      <div className="flex items-center justify-center gap-5 mb-16" aria-hidden>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/22" />
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-gold/32" />
          <div className="w-5 h-px bg-gold/22" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <div className="w-5 h-px bg-gold/22" />
          <div className="w-1 h-1 rounded-full bg-gold/32" />
        </div>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/22" />
      </div>

      {/* Section header */}
      <div
        ref={headerRef}
        className={`max-w-3xl mx-auto text-center px-6 mb-20 transition-all duration-1000 ease-out ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="font-inter text-[9px] tracking-[0.38em] text-gold/58 uppercase mb-5">
          The Collection
        </p>
        <h2 className="font-cormorant font-light text-[clamp(2.3rem,4.5vw,4rem)] text-ivory leading-[1.05] mb-6">
          Two Expressions.{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #C7A262 0%, #F1E5CF 50%, #C7A262 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            One Pure Origin.
          </span>
        </h2>
        <p className="font-cormorant italic text-[1.05rem] text-ivory/44 leading-relaxed max-w-xl mx-auto">
          Our collection celebrates the character and beauty associated with Bulgarian
          honey — golden flavours inspired by an extraordinary region.
        </p>
      </div>

      {/* Product preview grid */}
      <div
        ref={gridRef}
        className="max-w-5xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-8 mb-16"
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className={`group relative overflow-hidden transition-all duration-1000 ease-out ${
              gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${i * 180}ms` }}
          >
            {/* Product image */}
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(280px, 40vh, 440px)" }}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                  className="object-cover"
                  style={{
                    objectPosition:
                      product.variant === "wildflower" ? "center 38%" : "center 42%",
                  }}
                />
              </div>

              {/* Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(21,20,18,0.3) 0%, rgba(21,20,18,0.08) 50%, rgba(21,20,18,0.65) 100%)",
                }}
              />
              {/* Bottom fade to card content */}
              <div
                className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                style={{ background: "linear-gradient(to top, #151412, transparent)" }}
              />

              {/* Collection badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="font-inter text-[8px] tracking-[0.28em] text-gold/70 uppercase bg-obsidian/55 backdrop-blur-sm px-3 py-1.5 border border-gold/18">
                  No.&nbsp;{product.collectionNo}
                </span>
              </div>
            </div>

            {/* Card content */}
            <div
              className="px-6 py-6"
              style={{ background: "linear-gradient(180deg, #151412 0%, #131210 100%)" }}
            >
              <h3 className="font-cormorant font-light text-[1.6rem] text-ivory leading-tight mb-1 group-hover:text-gold/90 transition-colors duration-300">
                {product.name}
              </h3>
              <p className="font-cormorant italic text-sm text-gold/65 mb-3">
                {product.tagline}
              </p>
              <p className="font-inter text-xs text-ivory/40 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className={`text-center transition-all duration-1000 delay-500 ${
          gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Link
          href="/#collection"
          className="group inline-flex items-center gap-3 px-10 py-[14px] font-inter text-[10px] tracking-[0.22em] uppercase text-obsidian font-medium transition-all duration-300 hover:shadow-[0_8px_36px_rgba(199,162,98,0.32)]"
          style={{ background: "linear-gradient(135deg, #C7A262, #D4B87A)" }}
        >
          Explore Our Collection
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
