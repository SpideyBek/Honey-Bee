"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const honeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax on mousemove
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!honeyRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      honeyRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">
      {/* ── Background Atmospheric Layers ── */}
      <div className="absolute inset-0 z-0">
        {/* Deep radial glow — warm centre */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 65% 50%, rgba(199,162,98,0.12) 0%, rgba(21,20,18,0) 70%)",
          }}
        />
        {/* Top-left dark corner vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 0%, rgba(10,9,8,0.8) 0%, transparent 60%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background:
              "linear-gradient(to top, #151412 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Floating Particle Orbs ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[
          { w: 300, h: 300, top: "10%", left: "55%", delay: "0s", dur: "8s" },
          { w: 180, h: 180, top: "60%", left: "75%", delay: "2s", dur: "10s" },
          { w: 120, h: 120, top: "30%", left: "85%", delay: "4s", dur: "7s" },
          { w: 200, h: 200, top: "75%", left: "40%", delay: "1s", dur: "9s" },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.w,
              height: orb.h,
              top: orb.top,
              left: orb.left,
              background:
                "radial-gradient(circle, rgba(199,162,98,0.06) 0%, transparent 70%)",
              animation: `subtlePulse ${orb.dur} ease-in-out infinite`,
              animationDelay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* ── Thin Gold Vertical Lines (decorative) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "50%",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(199,162,98,0.12) 30%, rgba(199,162,98,0.06) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Main Content Grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen pt-28 pb-20">
        {/* Left Column — Text */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          {/* Eyebrow label */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-8 h-px bg-gold/60" />
            <span className="font-inter text-xs tracking-[0.3em] text-gold/80 uppercase">
              Premium Honey Collection
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`font-cormorant font-light leading-[0.95] mb-6 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <span
              className="block text-[clamp(3.5rem,7vw,6.5rem)] text-ivory"
            >
              Nature&apos;s Gold.
            </span>
            <span
              className="block text-[clamp(3.5rem,7vw,6.5rem)] italic"
              style={{
                background:
                  "linear-gradient(135deg, #C7A262 0%, #F1E5CF 45%, #C7A262 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Refined.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`font-cormorant text-xl lg:text-2xl font-light text-ivory/60 leading-relaxed mb-10 max-w-md transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            Extraordinary honey for everyday rituals.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 mb-14 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "650ms" }}
          >
            {/* Primary Button */}
            <button
              className="group relative overflow-hidden px-8 py-4 font-inter text-sm tracking-[0.2em] uppercase text-obsidian font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(199,162,98,0.35)]"
              style={{ background: "linear-gradient(135deg, #C7A262, #D4B87A)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              {/* Hover shimmer overlay */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #D4B87A, #F1E5CF, #D4B87A)",
                }}
              />
            </button>

            {/* Secondary Button */}
            <button className="group relative px-8 py-4 font-inter text-sm tracking-[0.2em] uppercase text-ivory/80 hover:text-gold transition-all duration-300 border border-ivory/20 hover:border-gold/50">
              <span className="flex items-center gap-2">
                Our Story
              </span>
              {/* Bottom line animation */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </button>
          </div>

          {/* Stats Row */}
          <div
            className={`flex gap-10 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {[
              { num: "12+", label: "Varieties" },
              { num: "100%", label: "Raw & Unfiltered" },
              { num: "8", label: "Regions" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-cormorant text-2xl font-light text-gold">
                  {stat.num}
                </span>
                <span className="font-inter text-[10px] tracking-[0.2em] text-ivory/40 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Visual */}
        <div className="flex items-center justify-center order-1 lg:order-2 relative">
          {/* Glow circle behind jar */}
          <div
            className={`absolute w-[500px] h-[500px] rounded-full transition-all duration-1500 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{
              transitionDelay: "300ms",
              background:
                "radial-gradient(circle, rgba(199,162,98,0.15) 0%, rgba(199,162,98,0.05) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Orbiting ring */}
          <div
            className={`absolute w-[420px] h-[420px] rounded-full border border-gold/10 transition-all duration-1500 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: "400ms" }}
          />
          <div
            className={`absolute w-[360px] h-[360px] rounded-full border border-gold/8 transition-all duration-1500 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: "500ms", borderWidth: "0.5px" }}
          />

          {/* Honey Jar Illustration */}
          <div
            ref={honeyRef}
            className={`relative transition-all duration-1500 ease-out ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "400ms", willChange: "transform" }}
          >
            <HoneyJarIllustration />
          </div>

          {/* Floating "drip" badge */}
          <div
            className={`absolute bottom-8 right-4 lg:right-0 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <div className="flex flex-col items-center gap-1 px-5 py-4 border border-gold/20 bg-obsidian/60 backdrop-blur-sm">
              <span className="font-cormorant text-xs tracking-[0.25em] text-gold/70 uppercase">
                Single Origin
              </span>
              <span className="font-cormorant text-lg font-light text-ivory">
                Highland Reserve
              </span>
              <div className="w-8 h-px bg-gold/40 mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <span className="font-inter text-[9px] tracking-[0.35em] text-ivory/30 uppercase">
          Scroll
        </span>
        <ChevronDown
          className="w-4 h-4 text-gold/40"
          style={{ animation: "subtlePulse 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Inline SVG Honey Jar Illustration
   A high-quality, fully custom SVG to avoid 
   any external image dependency.
──────────────────────────────────────────────── */
function HoneyJarIllustration() {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[260px] h-[340px] sm:w-[300px] sm:h-[390px] lg:w-[340px] lg:h-[440px] drop-shadow-2xl"
      aria-label="Stillness Bee Honey Premium Honey Jar"
    >
      <defs>
        {/* Jar body gradient */}
        <linearGradient id="jarBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A843" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#E8BC5A" stopOpacity="1" />
          <stop offset="65%" stopColor="#C7922A" stopOpacity="1" />
          <stop offset="100%" stopColor="#A67620" stopOpacity="0.9" />
        </linearGradient>

        {/* Honey interior */}
        <linearGradient id="honeyFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0C842" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#D4941E" stopOpacity="1" />
          <stop offset="100%" stopColor="#B07210" stopOpacity="0.95" />
        </linearGradient>

        {/* Lid gradient */}
        <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2520" />
          <stop offset="40%" stopColor="#1A1612" />
          <stop offset="100%" stopColor="#0E0C0A" />
        </linearGradient>

        {/* Lid rim gold */}
        <linearGradient id="lidRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A8864A" />
          <stop offset="30%" stopColor="#C7A262" />
          <stop offset="60%" stopColor="#E0C078" />
          <stop offset="100%" stopColor="#A8864A" />
        </linearGradient>

        {/* Label gradient */}
        <linearGradient id="labelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A1612" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#0E0C0A" stopOpacity="0.98" />
        </linearGradient>

        {/* Glass highlight */}
        <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Glass shadow right */}
        <linearGradient id="glassShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A5010" stopOpacity="0" />
          <stop offset="100%" stopColor="#7A5010" stopOpacity="0.4" />
        </linearGradient>

        {/* Honey drip */}
        <linearGradient id="dripGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8BC5A" />
          <stop offset="100%" stopColor="#C7922A" />
        </linearGradient>

        {/* Filter for glow */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft shadow */}
        <filter id="softShadow" x="-10%" y="-5%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#C7922A" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ── Bottom shadow / ground plane ── */}
      <ellipse cx="160" cy="405" rx="90" ry="12" fill="#C7A262" opacity="0.08" />
      <ellipse cx="160" cy="405" rx="60" ry="7" fill="#C7A262" opacity="0.06" />

      {/* ── JAR BODY ── */}
      <g filter="url(#softShadow)">
        {/* Main jar silhouette */}
        <path
          d="M88 160 Q82 168 80 185 L76 340 Q76 355 90 362 L230 362 Q244 355 244 340 L240 185 Q238 168 232 160 Z"
          fill="url(#jarBody)"
        />
        {/* Interior honey depth */}
        <path
          d="M92 165 Q86 172 84 188 L81 338 Q81 350 92 356 L228 356 Q239 350 239 338 L236 188 Q234 172 228 165 Z"
          fill="url(#honeyFill)"
          opacity="0.85"
        />
        {/* Left highlight (glass effect) */}
        <path
          d="M88 160 Q82 168 80 185 L78 300 Q90 295 96 280 L98 172 Z"
          fill="url(#glassHighlight)"
          opacity="0.6"
        />
        {/* Right shadow */}
        <path
          d="M232 160 Q238 168 240 185 L242 310 Q230 305 224 290 L222 172 Z"
          fill="url(#glassShadow)"
          opacity="0.5"
        />
        {/* Jar neck / shoulder taper */}
        <path
          d="M106 108 Q96 118 88 140 L88 160 L232 160 L232 140 Q224 118 214 108 Z"
          fill="url(#jarBody)"
        />
        <path
          d="M110 112 Q100 122 92 142 L92 158 L228 158 L228 142 Q220 122 210 112 Z"
          fill="url(#honeyFill)"
          opacity="0.7"
        />
        {/* Shoulder highlight */}
        <path
          d="M106 108 Q96 118 88 140 L92 142 Q100 122 110 112 Z"
          fill="white"
          opacity="0.15"
        />
      </g>

      {/* ── JAR LID ── */}
      {/* Lid body */}
      <rect x="100" y="72" width="120" height="40" rx="4" fill="url(#lidGrad)" />
      {/* Lid top cap */}
      <rect x="108" y="62" width="104" height="14" rx="7" fill="url(#lidGrad)" />
      {/* Lid gold rim top */}
      <rect x="98" y="70" width="124" height="5" rx="2" fill="url(#lidRim)" opacity="0.9" />
      {/* Lid gold rim bottom */}
      <rect x="98" y="107" width="124" height="5" rx="2" fill="url(#lidRim)" opacity="0.9" />
      {/* Lid highlight */}
      <rect x="100" y="72" width="40" height="40" rx="4" fill="white" opacity="0.04" />
      {/* Lid knurling lines */}
      {[110, 120, 130, 145, 160, 175, 190, 200, 210].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="74"
          x2={x}
          y2="108"
          stroke="#C7A262"
          strokeWidth="0.5"
          opacity="0.2"
        />
      ))}

      {/* ── LABEL ── */}
      <rect x="98" y="190" width="124" height="135" rx="2" fill="url(#labelGrad)" opacity="0.92" />
      {/* Label border */}
      <rect x="100" y="192" width="120" height="131" rx="1" fill="none" stroke="#C7A262" strokeWidth="0.6" opacity="0.6" />
      {/* Inner border */}
      <rect x="105" y="197" width="110" height="121" rx="1" fill="none" stroke="#C7A262" strokeWidth="0.3" opacity="0.35" />

      {/* Label ornament top */}
      <path
        d="M130 210 L160 210 L190 210"
        stroke="#C7A262"
        strokeWidth="0.4"
        opacity="0.5"
      />
      <polygon
        points="160,204 164,210 160,216 156,210"
        fill="#C7A262"
        opacity="0.5"
      />

      {/* Brand name on label */}
      <text
        x="160"
        y="238"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="300"
        letterSpacing="3"
        fill="#C7A262"
        opacity="0.95"
      >
        SBH
      </text>

      {/* Divider line */}
      <line x1="120" y1="246" x2="200" y2="246" stroke="#C7A262" strokeWidth="0.4" opacity="0.4" />

      {/* Product type */}
      <text
        x="160"
        y="262"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="7.5"
        fontStyle="italic"
        letterSpacing="2.5"
        fill="#F1E5CF"
        opacity="0.6"
      >
        Highland Reserve
      </text>

      {/* Honeycomb icon */}
      <g transform="translate(148, 272)" opacity="0.45">
        <polygon points="12,0 20,4.6 20,13.8 12,18.4 4,13.8 4,4.6" fill="none" stroke="#C7A262" strokeWidth="0.8" />
        <polygon points="12,5 17,7.9 17,13.7 12,16.6 7,13.7 7,7.9" fill="none" stroke="#C7A262" strokeWidth="0.5" />
      </g>

      {/* Weight label */}
      <text
        x="160"
        y="306"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="7"
        letterSpacing="2"
        fill="#F1E5CF"
        opacity="0.35"
      >
        340g / 12oz
      </text>

      {/* Label ornament bottom */}
      <path
        d="M120 312 Q160 308 200 312"
        stroke="#C7A262"
        strokeWidth="0.4"
        opacity="0.4"
        fill="none"
      />

      {/* ── HONEY DRIP ── */}
      <path
        d="M192 158 L194 172 Q195 182 192 186 Q189 190 186 186 Q183 182 184 172 L186 158 Z"
        fill="url(#dripGrad)"
        opacity="0.9"
      />
      <path
        d="M118 158 L120 168 Q121 175 118 178 Q115 181 113 178 Q111 175 112 168 L114 158 Z"
        fill="url(#dripGrad)"
        opacity="0.65"
      />

      {/* ── AMBIENT GLOW ── */}
      <ellipse
        cx="160"
        cy="250"
        rx="100"
        ry="120"
        fill="#E8BC5A"
        opacity="0.025"
        filter="url(#glow)"
      />
    </svg>
  );
}
