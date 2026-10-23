"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Collection() {
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const { ref: gridRef, isVisible: gridVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

  return (
    <section
      id="collection"
      className="relative bg-obsidian py-24 lg:py-32 overflow-hidden"
      aria-labelledby="collection-heading"
    >
      {/* Subtle centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(199,162,98,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top ornamental divider */}
      <div className="flex items-center justify-center gap-6 mb-16">
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold/30" />
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 opacity-50">
          <polygon
            points="12,1 15,9 23,9 17,14 19.5,22 12,17 4.5,22 7,14 1,9 9,9"
            fill="none"
            stroke="#C7A262"
            strokeWidth="1"
          />
        </svg>
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold/30" />
      </div>

      {/* Section header */}
      <div
        ref={headerRef}
        className={`max-w-3xl mx-auto text-center px-6 mb-20 transition-all duration-1000 ease-out ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <p className="font-inter text-[10px] tracking-[0.35em] text-gold/65 uppercase mb-5">
          The Collection
        </p>
        <h2
          id="collection-heading"
          className="font-cormorant font-light text-[clamp(2.4rem,5vw,4rem)] text-ivory leading-[1.05] mb-6"
        >
          Two Origins.{" "}
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
            One Golden Standard.
          </span>
        </h2>
        <p className="font-cormorant italic text-lg text-ivory/50 leading-relaxed max-w-xl mx-auto">
          Discover two extraordinary expressions of nature&apos;s finest golden
          treasure.
        </p>
      </div>

      {/* Product grid */}
      <div
        ref={gridRef}
        className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-px bg-gold/10"
      >
        {products.map((product, i) => (
          <div key={product.id} className="bg-obsidian">
            <ProductCard
              product={product}
              isVisible={gridVisible}
              delay={i * 180}
            />
          </div>
        ))}
      </div>

      {/* Bottom ornamental divider */}
      <div className="flex items-center justify-center gap-6 mt-16">
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold/20" />
        <div className="w-1 h-1 rounded-full bg-gold/40" />
        <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold/20" />
      </div>
    </section>
  );
}
