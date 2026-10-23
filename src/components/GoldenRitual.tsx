"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

interface RitualCard {
  id: string;
  category: string;
  headline: string;
  tagline: string;
  body: string;
  cta: string;
  visual: React.FC;
  accentFrom: string;
  accentTo: string;
  bgGlow: string;
}

const rituals: RitualCard[] = [
  {
    id: "fitness",
    category: "Fitness & Energy",
    headline: "Fuel Your\nAmbition.",
    tagline: "Nature's original performance fuel.",
    body: "Pure, unprocessed carbohydrates make raw honey an ideal companion before a workout or during recovery — sustained energy without the artificial edge.",
    cta: "Explore Energy Rituals",
    visual: FitnessVisual,
    accentFrom: "#C7A262",
    accentTo: "#E8BC5A",
    bgGlow:
      "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(199,162,98,0.14) 0%, rgba(21,20,18,0) 75%), #151412",
  },
  {
    id: "skincare",
    category: "Skincare & Beauty",
    headline: "Nature's\nGolden Touch.",
    tagline: "A timeless beauty ritual, refined.",
    body: "Honey has been revered for centuries in beauty rituals around the world. Its natural humectant properties help lock in moisture for a luminous, radiant complexion.",
    cta: "Discover Beauty Rituals",
    visual: SkincareVisual,
    accentFrom: "#D4B87A",
    accentTo: "#F1E5CF",
    bgGlow:
      "radial-gradient(ellipse 65% 50% at 50% 35%, rgba(212,184,122,0.16) 0%, rgba(21,20,18,0) 72%), #151412",
  },
  {
    id: "wellness",
    category: "Everyday Wellness",
    headline: "Elevate Your\nEveryday.",
    tagline: "The ritual begins at sunrise.",
    body: "Stirred into morning tea, swirled through yogurt, or savoured alone — a single spoonful of Stillness Bee Honey elevates the ordinary into ceremony.",
    cta: "Explore Daily Rituals",
    visual: WellnessVisual,
    accentFrom: "#A8864A",
    accentTo: "#C7A262",
    bgGlow:
      "radial-gradient(ellipse 60% 50% at 40% 40%, rgba(168,134,74,0.15) 0%, rgba(21,20,18,0) 70%), #151412",
  },
];

export default function GoldenRitual() {
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.25 });

  const { ref: cardsRef, isVisible: cardsVisible } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.05, rootMargin: "0px 0px -60px 0px" });

  return (
    <section
      id="ritual"
      className="relative bg-obsidian py-24 lg:py-36 overflow-hidden"
      aria-labelledby="ritual-heading"
    >
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(199,162,98,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Top divider */}
      <div className="flex items-center justify-center gap-6 mb-16">
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/25" />
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gold/40" />
          <div className="w-6 h-px bg-gold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          <div className="w-6 h-px bg-gold/30" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
        </div>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/25" />
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
          A Life Well Lived
        </p>
        <h2
          id="ritual-heading"
          className="font-cormorant font-light text-[clamp(2.4rem,5vw,4rem)] text-ivory leading-[1.05] mb-6"
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
        <p className="font-cormorant italic text-lg text-ivory/50 leading-relaxed max-w-lg mx-auto">
          Honey, elevated into daily ceremony.
        </p>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {rituals.map((ritual, i) => (
          <RitualCard
            key={ritual.id}
            ritual={ritual}
            isVisible={cardsVisible}
            delay={i * 150}
          />
        ))}
      </div>

      {/* Bottom tagline */}
      <div
        className={`mt-20 text-center transition-all duration-1000 delay-700 ${
          cardsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <p className="font-cormorant italic text-xl text-ivory/30">
          &ldquo;Every ritual deserves a golden touch.&rdquo;
        </p>
      </div>
    </section>
  );
}

/* ── Individual ritual card ── */
function RitualCard({
  ritual,
  isVisible,
  delay,
}: {
  ritual: RitualCard;
  isVisible: boolean;
  delay: number;
}) {
  const Visual = ritual.visual;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Visual area ── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ minHeight: "360px" }}
      >
        {/* Atmospheric background — zooms on hover */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={{ background: ritual.bgGlow }}
        />

        {/* SVG illustration — also zooms slightly */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <Visual />
        </div>

        {/* Corner marks */}
        <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-gold/20 pointer-events-none transition-all duration-500 group-hover:border-gold/45" />
        <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-gold/20 pointer-events-none transition-all duration-500 group-hover:border-gold/45" />

        {/* Category badge */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
          <span className="font-inter text-[9px] tracking-[0.28em] text-gold/70 uppercase bg-obsidian/50 backdrop-blur-sm px-3 py-1.5 border border-gold/15">
            {ritual.category}
          </span>
        </div>

        {/* Bottom gradient overlay blending into content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #151412 10%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Text content ── */}
      <div
        className="relative flex flex-col flex-1 px-7 pt-4 pb-8 gap-4"
        style={{
          background: "linear-gradient(180deg, #151412 0%, #131210 100%)",
          borderTop: "1px solid rgba(199,162,98,0.08)",
        }}
      >
        {/* Headline — whitespace pre-line renders the \n */}
        <h3
          className="font-cormorant font-light text-[1.85rem] text-ivory leading-[1.1] transition-colors duration-300 group-hover:text-gold/95"
          style={{ whiteSpace: "pre-line" }}
        >
          {ritual.headline}
        </h3>

        {/* Tagline */}
        <p className="font-cormorant italic text-sm text-gold/70 leading-snug">
          {ritual.tagline}
        </p>

        {/* Thin divider */}
        <div
          className="w-10 h-px transition-all duration-500 group-hover:w-16"
          style={{
            background: `linear-gradient(to right, ${ritual.accentFrom}, ${ritual.accentTo})`,
          }}
        />

        {/* Body */}
        <p className="font-inter text-sm text-ivory/45 leading-relaxed flex-1">
          {ritual.body}
        </p>

        {/* CTA */}
        <button className="group/btn flex items-center gap-2 font-inter text-[10px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors duration-300 self-start mt-2">
          {ritual.cta}
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
        </button>

        {/* Bottom corner marks */}
        <div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-gold/12 pointer-events-none transition-all duration-500 group-hover:border-gold/35" />
        <div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-gold/12 pointer-events-none transition-all duration-500 group-hover:border-gold/35" />
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────
   VISUAL 1 — Fitness & Energy
   Honeycomb lattice + bold energy bolt
───────────────────────────────────────── */
function FitnessVisual() {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[260px] h-[260px]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8BC5A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#E8BC5A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fit-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D070" />
          <stop offset="100%" stopColor="#C7A262" />
        </linearGradient>
        <filter id="fit-bloom">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx="150" cy="150" r="130" fill="url(#fit-glow)" />

      {/* Outer ring */}
      <circle cx="150" cy="150" r="118" stroke="#C7A262" strokeWidth="0.5" opacity="0.18" />
      <circle cx="150" cy="150" r="108" stroke="#C7A262" strokeWidth="0.3" opacity="0.1" />

      {/* Honeycomb lattice — 7 hexagons arranged in flower pattern */}
      {[
        [150, 150],
        [150, 110], [150, 190],
        [116, 130], [184, 130],
        [116, 170], [184, 170],
      ].map(([cx, cy], i) => (
        <polygon
          key={i}
          points={hexPoints(cx, cy, 28)}
          fill={i === 0 ? "rgba(199,162,98,0.08)" : "rgba(199,162,98,0.04)"}
          stroke="#C7A262"
          strokeWidth={i === 0 ? "0.8" : "0.5"}
          opacity={i === 0 ? 0.7 : 0.35}
        />
      ))}

      {/* Inner honeycomb details */}
      {[
        [150, 150],
        [150, 110], [150, 190],
        [116, 130], [184, 130],
        [116, 170], [184, 170],
      ].map(([cx, cy], i) => (
        <polygon
          key={`inner-${i}`}
          points={hexPoints(cx, cy, 14)}
          fill="none"
          stroke="#C7A262"
          strokeWidth="0.4"
          opacity={i === 0 ? 0.5 : 0.18}
        />
      ))}

      {/* Central energy bolt */}
      <path
        d="M155 118 L140 152 L153 152 L145 182 L164 146 L150 146 Z"
        fill="url(#fit-bolt)"
        filter="url(#fit-bloom)"
        opacity="0.9"
      />

      {/* Radiating lines from centre */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={150 + 60 * Math.cos(rad)}
            y1={150 + 60 * Math.sin(rad)}
            x2={150 + 115 * Math.cos(rad)}
            y2={150 + 115 * Math.sin(rad)}
            stroke="#C7A262"
            strokeWidth="0.4"
            opacity="0.2"
          />
        );
      })}

      {/* Dot accents */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={150 + 100 * Math.cos(rad)}
            cy={150 + 100 * Math.sin(rad)}
            r="2"
            fill="#C7A262"
            opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────
   VISUAL 2 — Skincare & Beauty
   Botanical ring + dropper bottle
───────────────────────────────────────── */
function SkincareVisual() {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[260px] h-[260px]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sk-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#D4B87A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D4B87A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sk-bottle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2218" />
          <stop offset="100%" stopColor="#0E0B08" />
        </linearGradient>
        <linearGradient id="sk-dropper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C7A262" />
          <stop offset="100%" stopColor="#A8864A" />
        </linearGradient>
        <linearGradient id="sk-honey-drop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D070" />
          <stop offset="100%" stopColor="#C7922A" />
        </linearGradient>
        <filter id="sk-glow-filter">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ambient glow */}
      <circle cx="150" cy="145" r="125" fill="url(#sk-glow)" />

      {/* Outer botanical ring */}
      <circle cx="150" cy="150" r="114" stroke="#C7A262" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 6" />
      <circle cx="150" cy="150" r="106" stroke="#D4B87A" strokeWidth="0.3" opacity="0.1" />

      {/* Leaf shapes around the ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 150 + 100 * Math.cos(rad);
        const cy = 150 + 100 * Math.sin(rad);
        const rot = angle;
        return (
          <g key={i} transform={`translate(${cx},${cy}) rotate(${rot + 90})`}>
            <ellipse rx="5" ry="10" fill="#C7A262" opacity={i % 2 === 0 ? 0.25 : 0.14} />
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#C7A262" strokeWidth="0.4" opacity="0.3" />
          </g>
        );
      })}

      {/* Small botanical dots */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle key={i}
            cx={150 + 106 * Math.cos(rad)}
            cy={150 + 106 * Math.sin(rad)}
            r="2.5" fill="#C7A262" opacity="0.3"
          />
        );
      })}

      {/* Inner decorative circles */}
      <circle cx="150" cy="150" r="72" stroke="#C7A262" strokeWidth="0.4" opacity="0.12" />
      <circle cx="150" cy="150" r="60" stroke="#C7A262" strokeWidth="0.3" opacity="0.08" />

      {/* Dropper bottle — elegant minimal silhouette */}
      {/* Bottle body */}
      <rect x="137" y="160" width="26" height="56" rx="8" fill="url(#sk-bottle)" />
      <rect x="139" y="162" width="22" height="52" rx="7" fill="none" stroke="#C7A262" strokeWidth="0.5" opacity="0.4" />
      {/* Bottle highlight */}
      <rect x="140" y="165" width="6" height="46" rx="3" fill="#C7A262" opacity="0.07" />
      {/* Dropper neck */}
      <rect x="143" y="148" width="14" height="15" rx="3" fill="url(#sk-bottle)" />
      <rect x="144" y="149" width="12" height="13" rx="2.5" fill="none" stroke="#C7A262" strokeWidth="0.4" opacity="0.35" />
      {/* Dropper bulb */}
      <ellipse cx="150" cy="145" rx="11" ry="7" fill="url(#sk-dropper)" opacity="0.85" />
      <ellipse cx="150" cy="145" rx="8" ry="4.5" fill="#E0C078" opacity="0.4" />

      {/* Honey drop falling */}
      <path
        d="M150 218 Q150 226 148 230 Q146 235 150 237 Q154 235 152 230 Q150 226 150 218 Z"
        fill="url(#sk-honey-drop)"
        filter="url(#sk-glow-filter)"
        opacity="0.85"
      />

      {/* Gold label on bottle */}
      <rect x="139" y="178" width="22" height="26" rx="2" fill="none" stroke="#C7A262" strokeWidth="0.5" opacity="0.35" />
      <text x="150" y="190" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4" letterSpacing="0.5" fill="#C7A262" opacity="0.65">SBH</text>
      <line x1="142" y1="193" x2="158" y2="193" stroke="#C7A262" strokeWidth="0.3" opacity="0.35"/>
      <text x="150" y="199" textAnchor="middle" fontFamily="Georgia,serif" fontSize="3.5" fontStyle="italic" fill="#C7A262" opacity="0.45">honey serum</text>

      {/* Petal accents near top */}
      {[300, 330, 0, 30, 60].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 45 + i * 3;
        return (
          <circle key={i}
            cx={150 + r * Math.cos(rad)}
            cy={150 + r * Math.sin(rad)}
            r="1.2" fill="#D4B87A" opacity="0.35"
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────
   VISUAL 3 — Everyday Wellness
   Morning table scene: tea + honey jar + dipper
───────────────────────────────────────── */
function WellnessVisual() {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[260px] h-[260px]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wl-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#C7A262" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C7A262" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wl-jar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8BC5A" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#C7922A" stopOpacity="1" />
          <stop offset="100%" stopColor="#A56A10" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="wl-jar-hi" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wl-tea" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5C3A14" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3A2008" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="wl-drizzle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D070" />
          <stop offset="100%" stopColor="#C7922A" />
        </linearGradient>
        <filter id="wl-soft">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Warm ambient glow */}
      <circle cx="150" cy="165" r="115" fill="url(#wl-glow)" />

      {/* Outer arc decoration */}
      <circle cx="150" cy="150" r="118" stroke="#C7A262" strokeWidth="0.4" opacity="0.12" strokeDasharray="3 8" />

      {/* ── Table surface line ── */}
      <line x1="40" y1="245" x2="260" y2="245" stroke="#C7A262" strokeWidth="0.6" opacity="0.2" />
      <line x1="30" y1="248" x2="270" y2="248" stroke="#C7A262" strokeWidth="0.3" opacity="0.1" />

      {/* ── Honey jar (small, left) ── */}
      <g transform="translate(58, 165)">
        {/* Body */}
        <path d="M10 44 Q6 48 5 56 L3 118 Q3 125 10 128 L54 128 Q61 125 61 118 L59 56 Q58 48 54 44 Z" fill="url(#wl-jar)" opacity="0.9"/>
        <path d="M12 46 Q8 50 7 57 L5 116 Q5 122 11 125 L53 125 Q59 122 59 116 L57 57 Q56 50 52 46 Z" fill="#E8BC5A" opacity="0.25"/>
        <path d="M12 46 Q8 50 7 57 L6 95 Q14 92 17 82 L18 52 Z" fill="url(#wl-jar-hi)" opacity="0.5"/>
        {/* Neck */}
        <path d="M18 28 Q12 35 10 44 L54 44 Q52 35 46 28 Z" fill="url(#wl-jar)" opacity="0.9"/>
        {/* Lid */}
        <rect x="14" y="16" width="36" height="14" rx="3" fill="#1A1410"/>
        <rect x="18" y="11" width="28" height="8" rx="4" fill="#1A1410"/>
        <rect x="12" y="15" width="40" height="3" rx="1" fill="#C7A262" opacity="0.8"/>
        <rect x="12" y="27" width="40" height="2" rx="1" fill="#C7A262" opacity="0.6"/>
        {/* Label */}
        <rect x="12" y="68" width="40" height="40" rx="1" fill="#1A1410" opacity="0.8"/>
        <rect x="14" y="70" width="36" height="36" rx="1" fill="none" stroke="#C7A262" strokeWidth="0.5" opacity="0.45"/>
        <text x="32" y="84" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.5" letterSpacing="1" fill="#C7A262" opacity="0.8">SBH</text>
        <line x1="16" y1="87" x2="48" y2="87" stroke="#C7A262" strokeWidth="0.3" opacity="0.35"/>
        <text x="32" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="3.5" fontStyle="italic" fill="#D4B87A" opacity="0.55">raw honey</text>
      </g>

      {/* ── Honey dipper ── */}
      <g transform="translate(127, 95) rotate(30)">
        {/* Handle */}
        <rect x="-2" y="-70" width="4" height="85" rx="2" fill="#8B6020" opacity="0.7"/>
        {/* Spiral grooves on handle */}
        {[-60,-50,-40,-30,-20,-10,0].map((y,i)=>(
          <line key={i} x1="-2" y1={y} x2="2" y2={y} stroke="#C7A262" strokeWidth="0.4" opacity="0.3"/>
        ))}
        {/* Dipper head */}
        <ellipse cx="0" cy="18" rx="10" ry="8" fill="url(#wl-drizzle)" opacity="0.85"/>
        {/* Honey drip from dipper */}
        <path d="M0 26 Q1 34 0 38 Q-1 43 0 45 Q1 43 0 38 Q1 34 0 26 Z" fill="url(#wl-drizzle)" opacity="0.8" filter="url(#wl-soft)"/>
      </g>

      {/* ── Honey drizzle arc (between jar and cup) ── */}
      <path
        d="M130 200 Q175 175 200 195"
        stroke="url(#wl-drizzle)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />
      {/* drizzle drops */}
      <circle cx="165" cy="183" r="2.5" fill="#E8BC5A" opacity="0.6"/>
      <circle cx="155" cy="188" r="1.5" fill="#E8BC5A" opacity="0.45"/>
      <circle cx="178" cy="186" r="1.8" fill="#E8BC5A" opacity="0.5"/>

      {/* ── Tea cup (right) ── */}
      <g transform="translate(185, 178)">
        {/* Saucer */}
        <ellipse cx="35" cy="67" rx="40" ry="6" fill="#2A1E10" opacity="0.5"/>
        <ellipse cx="35" cy="67" rx="35" ry="4.5" fill="none" stroke="#C7A262" strokeWidth="0.4" opacity="0.3"/>
        {/* Cup body */}
        <path d="M8 20 Q5 25 4 35 L8 63 Q12 68 35 68 Q58 68 62 63 L66 35 Q65 25 62 20 Z" fill="#1E150A" opacity="0.9"/>
        <path d="M10 22 Q7 27 6 36 L10 61 Q14 65 35 65 Q56 65 60 61 L64 36 Q63 27 60 22 Z" fill="none" stroke="#C7A262" strokeWidth="0.4" opacity="0.3"/>
        {/* Tea liquid surface */}
        <ellipse cx="35" cy="24" rx="26" ry="6" fill="url(#wl-tea)" opacity="0.8"/>
        <ellipse cx="35" cy="24" rx="22" ry="4" fill="#7A4A20" opacity="0.3"/>
        {/* Cup handle */}
        <path d="M62 30 Q76 30 76 42 Q76 55 62 55" fill="none" stroke="#2A1E10" strokeWidth="6" strokeLinecap="round"/>
        <path d="M62 30 Q74 30 74 42 Q74 54 62 54" fill="none" stroke="#C7A262" strokeWidth="0.4" opacity="0.3"/>
        {/* Steam wisps */}
        <path d="M22 14 Q18 8 22 2" fill="none" stroke="#C7A262" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        <path d="M35 10 Q31 3 35 -3" fill="none" stroke="#C7A262" strokeWidth="1" strokeLinecap="round" opacity="0.25"/>
        <path d="M48 14 Q52 8 48 2" fill="none" stroke="#C7A262" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        {/* Gold rim accent */}
        <path d="M10 22 Q7 27 6 36 L10 38" fill="none" stroke="#C7A262" strokeWidth="0.5" opacity="0.15"/>
        <ellipse cx="35" cy="22" rx="26" ry="3" fill="none" stroke="#C7A262" strokeWidth="0.4" opacity="0.25"/>
      </g>

      {/* Small decorative dots */}
      {[70,110,160,200,240,280,320,355].map((angle, i)=>{
        const rad = (angle * Math.PI) / 180;
        const r = 110;
        return <circle key={i} cx={150 + r*Math.cos(rad)} cy={150 + r*Math.sin(rad)} r="1" fill="#C7A262" opacity="0.2"/>;
      })}
    </svg>
  );
}

/* helper — regular hexagon points string */
function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}
