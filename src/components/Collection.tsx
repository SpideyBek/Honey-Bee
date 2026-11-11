"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Collection() {
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const { ref: p1Ref, isVisible: p1Visible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  const { ref: p2Ref, isVisible: p2Visible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  const productRefs = [p1Ref, p2Ref];
  const productVisibles = [p1Visible, p2Visible];

  return (
    <section
      id="collection"
      className="relative bg-obsidian overflow-hidden"
      aria-labelledby="collection-heading"
    >
      {/* Subtle centre glow at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(199,162,98,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Ornamental divider ── */}
      <div
        className="flex items-center justify-center gap-5 pt-24 mb-16"
        aria-hidden
      >
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

      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className={`max-w-3xl mx-auto text-center px-6 mb-20 transition-all duration-1000 ease-out ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <p className="font-inter text-[9px] tracking-[0.38em] text-gold/58 uppercase mb-5">
          The Collection
        </p>
        <h2
          id="collection-heading"
          className="font-cormorant font-light text-[clamp(2.4rem,5vw,4.2rem)] text-ivory leading-[1.05] mb-6"
        >
          Two Expressions.{" "}
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
            One Pure Origin.
          </span>
        </h2>
        <p className="font-cormorant italic text-[1.05rem] text-ivory/44 leading-relaxed max-w-xl mx-auto">
          Both honeys are imported directly from Bulgaria — a land celebrated
          for centuries of beekeeping mastery and breathtaking natural
          landscapes.
        </p>
      </div>

      {/* ── Editorial alternating product rows ── */}
      <div className="flex flex-col">
        {products.map((product, i) => (
          <div key={product.id} ref={productRefs[i]}>
            <ProductCard
              product={product}
              isVisible={productVisibles[i]}
              delay={0}
              reverse={i % 2 !== 0}
            />
          </div>
        ))}
      </div>

      {/* ── Bottom ornamental divider ── */}
      <div className="flex items-center justify-center gap-6 py-20">
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold/18" />
        <div className="w-1 h-1 rounded-full bg-gold/38" />
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold/18" />
      </div>
    </section>
  );
}
