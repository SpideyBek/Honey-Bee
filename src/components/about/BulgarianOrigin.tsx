"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ORIGIN_CARDS = [
  {
    no: "01",
    title: "The Rose Valley",
    body: "Bulgaria's Rose Valley is one of the world's most celebrated natural regions, where wildflowers bloom in breathtaking abundance across sun-drenched hillsides and fertile valleys.",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9" aria-hidden>
        <circle cx="18" cy="18" r="6" stroke="#C7A262" strokeWidth="0.9" opacity="0.7" />
        {[0,45,90,135,180,225,270,315].map((a) => {
          const r = (a * Math.PI) / 180;
          const x1 = 18 + 8  * Math.cos(r), y1 = 18 + 8  * Math.sin(r);
          const x2 = 18 + 14 * Math.cos(r), y2 = 18 + 14 * Math.sin(r);
          return <ellipse key={a} cx={(x1+x2)/2} cy={(y1+y2)/2} rx="3.2" ry="1.8" fill="#C7A262" opacity="0.25" transform={`rotate(${a + 90} ${(x1+x2)/2} ${(y1+y2)/2})`} />;
        })}
        <circle cx="18" cy="18" r="3" fill="#C7A262" opacity="0.5" />
      </svg>
    ),
  },
  {
    no: "02",
    title: "The Balkan Mountains",
    body: "The ancient Balkan range creates remarkable highland ecosystems where rare mountain plants thrive in pristine, mineral-rich conditions — inspiring the character of our Reserve.",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9" aria-hidden>
        <polyline points="2,30 12,14 20,22 28,8 34,30" stroke="#C7A262" strokeWidth="0.9" strokeLinejoin="round" opacity="0.65" />
        <line x1="2" y1="30" x2="34" y2="30" stroke="#C7A262" strokeWidth="0.5" opacity="0.3" />
        <polyline points="2,30 12,14 20,22 28,8 34,30" stroke="#C7A262" strokeWidth="0.4" strokeLinejoin="round" opacity="0.15" fill="#C7A262" />
      </svg>
    ),
  },
  {
    no: "03",
    title: "Nature's Golden Harvest",
    body: "Bulgaria's rich beekeeping tradition spans centuries, honoring the profound relationship between people, bees, and the extraordinary landscapes they share each season.",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9" aria-hidden>
        {/* Honeycomb — 7 hexagons */}
        {[
          [18, 18], [18, 10], [18, 26],
          [11, 14], [25, 14], [11, 22], [25, 22],
        ].map(([cx, cy], i) => {
          const pts = Array.from({ length: 6 }, (_, k) => {
            const a = (Math.PI / 180) * (60 * k - 30);
            return `${cx + 4.5 * Math.cos(a)},${cy + 4.5 * Math.sin(a)}`;
          }).join(" ");
          return (
            <polygon
              key={i}
              points={pts}
              stroke="#C7A262"
              strokeWidth={i === 0 ? "0.9" : "0.6"}
              fill={i === 0 ? "rgba(199,162,98,0.15)" : "none"}
              opacity={i === 0 ? 0.8 : 0.4}
            />
          );
        })}
      </svg>
    ),
  },
];

export default function BulgarianOrigin() {
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: bannerRef, isVisible: bannerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: cardsRef, isVisible: cardsVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="relative bg-obsidian overflow-hidden">

      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className={`max-w-3xl mx-auto text-center px-6 pt-24 pb-16 transition-all duration-1000 ease-out ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center justify-center gap-5 mb-8" aria-hidden>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/22" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/22" />
        </div>
        <p className="font-inter text-[9px] tracking-[0.38em] text-gold/58 uppercase mb-5">
          Origin & Inspiration
        </p>
        <h2 className="font-cormorant font-light text-[clamp(2.3rem,4.5vw,4rem)] text-ivory leading-[1.05] mb-6">
          From the Heart of{" "}
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
            Bulgaria.
          </span>
        </h2>
        <p className="font-cormorant italic text-[1.05rem] text-ivory/44 leading-relaxed max-w-xl mx-auto">
          Bulgaria is home to remarkable natural landscapes — from the picturesque
          Rose Valley to the majestic Balkan Mountains.
        </p>
      </div>

      {/* ── Cinematic landscape banner ── */}
      <div
        ref={bannerRef}
        className={`relative overflow-hidden transition-opacity duration-[1200ms] ease-out ${
          bannerVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "clamp(280px, 42vh, 500px)" }}
      >
        <Image
          src="/honey-himalayan.jpeg"
          alt="Bulgarian highland landscape inspiring Stillness Bee Honey"
          fill
          sizes="100vw"
          quality={88}
          className="object-cover"
          style={{ objectPosition: "center 42%", filter: "brightness(0.55) saturate(1.1)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(21,20,18,0.55) 0%, rgba(21,20,18,0.1) 45%, rgba(21,20,18,0.72) 100%)",
          }}
        />
        {/* Centred text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="font-cormorant italic text-[clamp(1.4rem,3vw,2.8rem)] text-ivory/60 text-center px-6 max-w-2xl leading-relaxed"
            style={{
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
            }}
          >
            &ldquo;These landscapes inspire our appreciation for the diversity
            of flowers, seasons, and natural environments.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Three editorial feature cards ── */}
      <div ref={cardsRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(199,162,98,0.07)" }}>
          {ORIGIN_CARDS.map((card, i) => (
            <div
              key={card.no}
              className={`bg-obsidian flex flex-col px-8 lg:px-10 py-10 transition-all duration-1000 ease-out ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              {/* Icon */}
              <div className="mb-6">{card.icon}</div>

              {/* Number + category */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-cormorant text-[3.5rem] font-light leading-none select-none"
                  style={{ color: "#C7A262", opacity: 0.18 }}
                >
                  {card.no}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-cormorant font-light text-[1.6rem] text-ivory leading-tight mb-4">
                {card.title}
              </h3>

              {/* Gold rule */}
              <div className="w-8 h-px bg-gold/40 mb-5" />

              {/* Body */}
              <p className="font-inter text-sm text-ivory/44 leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
