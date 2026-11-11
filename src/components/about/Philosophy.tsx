"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const PILLARS = [
  {
    no:       "01",
    title:    "Nature First",
    body:     "We believe nature deserves appreciation and respect. The extraordinary relationship between bees and flowers reminds us of the beauty found in the natural world — patient, purposeful, and endlessly generous.",
    accent:   "#E8BC5A",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" aria-hidden>
        {/* Leaf shape */}
        <path
          d="M16 4 C16 4 6 10 6 20 C6 26 10 28 16 28 C22 28 26 26 26 20 C26 10 16 4 16 4 Z"
          stroke="#C7A262" strokeWidth="0.9" fill="rgba(199,162,98,0.1)" opacity="0.8"
        />
        <line x1="16" y1="8" x2="16" y2="27" stroke="#C7A262" strokeWidth="0.6" opacity="0.5" />
        <line x1="16" y1="16" x2="21" y2="11" stroke="#C7A262" strokeWidth="0.5" opacity="0.4" />
        <line x1="16" y1="20" x2="11" y2="15" stroke="#C7A262" strokeWidth="0.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    no:       "02",
    title:    "Thoughtful Simplicity",
    body:     "From our visual identity to the experience of enjoying honey, we celebrate simplicity, elegance, and meaningful details. True refinement reveals itself quietly — in a jar, a label, a moment.",
    accent:   "#D4B87A",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" aria-hidden>
        {/* Diamond / gem */}
        <polygon points="16,4 26,14 16,28 6,14" stroke="#C7A262" strokeWidth="0.9" fill="rgba(199,162,98,0.08)" opacity="0.75" />
        <line x1="6" y1="14" x2="26" y2="14" stroke="#C7A262" strokeWidth="0.5" opacity="0.4" />
        <line x1="16" y1="4" x2="10" y2="14" stroke="#C7A262" strokeWidth="0.4" opacity="0.3" />
        <line x1="16" y1="4" x2="22" y2="14" stroke="#C7A262" strokeWidth="0.4" opacity="0.3" />
      </svg>
    ),
  },
  {
    no:       "03",
    title:    "Everyday Rituals",
    body:     "A spoonful of honey in morning tea, a drizzle over breakfast, or a quiet moment at the end of the day — small rituals can make everyday life feel extraordinary.",
    accent:   "#C7A262",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" aria-hidden>
        {/* Cup / ritual vessel */}
        <path d="M8 12 Q7 20 10 24 Q13 28 16 28 Q19 28 22 24 Q25 20 24 12 Z"
          stroke="#C7A262" strokeWidth="0.9" fill="rgba(199,162,98,0.1)" opacity="0.75" />
        <line x1="8" y1="12" x2="24" y2="12" stroke="#C7A262" strokeWidth="0.6" opacity="0.5" />
        {/* Steam wisps */}
        <path d="M12 8 Q10 5 12 2" fill="none" stroke="#C7A262" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
        <path d="M16 7 Q14 4 16 1" fill="none" stroke="#C7A262" strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
        <path d="M20 8 Q22 5 20 2" fill="none" stroke="#C7A262" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

export default function Philosophy() {
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  const { ref: cardsRef, isVisible: cardsVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section className="relative bg-obsidian py-24 lg:py-36 overflow-hidden">

      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(199,162,98,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Ornamental dividers */}
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
          Our Philosophy
        </p>
        <h2 className="font-cormorant font-light text-[clamp(2.3rem,4.5vw,4rem)] text-ivory leading-[1.05] mb-6">
          Luxury in Its{" "}
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
            Purest Form.
          </span>
        </h2>
        <p className="font-cormorant italic text-[1.05rem] text-ivory/44 leading-relaxed max-w-lg mx-auto">
          True luxury is not always found in extravagance. Sometimes, it exists in the
          quiet beauty of something natural, thoughtfully presented, and deeply appreciated.
        </p>
      </div>

      {/* Philosophy cards */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.no}
            className={`group relative flex flex-col p-8 lg:p-10 overflow-hidden transition-all duration-1000 ease-out cursor-default ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{
              transitionDelay: `${i * 160}ms`,
              background: "linear-gradient(160deg, #191714 0%, #131210 100%)",
              border: "1px solid rgba(199,162,98,0.07)",
            }}
          >
            {/* Hover gold border reveal */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ border: "1px solid rgba(199,162,98,0.22)" }}
            />

            {/* Top-left corner accent */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-gold/14 group-hover:border-gold/35 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/10 group-hover:border-gold/28 transition-colors duration-500 pointer-events-none" />

            {/* Icon */}
            <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {pillar.icon}
            </div>

            {/* Large number watermark */}
            <span
              className="font-cormorant text-[4rem] font-light leading-none mb-4 select-none"
              style={{ color: pillar.accent, opacity: 0.18 }}
            >
              {pillar.no}
            </span>

            {/* Category line */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-4 h-px" style={{ background: pillar.accent, opacity: 0.55 }} />
              <span className="font-inter text-[9px] tracking-[0.28em] text-gold/55 uppercase">
                {pillar.title}
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-cormorant font-light text-[1.65rem] text-ivory leading-[1.1] mb-5 group-hover:text-gold/90 transition-colors duration-400">
              {pillar.title}.
            </h3>

            {/* Body */}
            <p className="font-inter text-sm text-ivory/44 leading-relaxed flex-1">
              {pillar.body}
            </p>

            {/* Bottom gold accent — grows on hover */}
            <div
              className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
              style={{
                width: "0%",
                background: `linear-gradient(to right, ${pillar.accent}, transparent)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.width = "100%";
              }}
            />
            <div
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out pointer-events-none"
              style={{ background: `linear-gradient(to right, ${pillar.accent}99, transparent)` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
