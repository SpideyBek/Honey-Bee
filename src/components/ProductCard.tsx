"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ChevronDown, Check, MapPin, Droplets } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  isVisible: boolean;
  delay?: number;
}

export default function ProductCard({
  product,
  isVisible,
  delay = 0,
}: ProductCardProps) {
  const { addItem, lastAdded } = useCart();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const isWild = product.variant === "wildflower";
  const justAdded = lastAdded === product.id;

  const handleAddToBag = () => addItem(product.id);

  return (
    <article
      className={`relative flex flex-col overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Visual Panel ── */}
      <div
        className="relative overflow-hidden group"
        style={{ minHeight: "520px" }}
      >
        {/* Real photo — zooms on hover */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{
              objectPosition: isWild ? "center 40%" : "center center",
            }}
          />
        </div>

        {/* Dark luxury overlay — preserves obsidian brand feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isWild
              ? "linear-gradient(160deg, rgba(21,20,18,0.55) 0%, rgba(21,20,18,0.25) 40%, rgba(21,20,18,0.72) 100%)"
              : "linear-gradient(160deg, rgba(10,9,8,0.65) 0%, rgba(10,9,8,0.35) 40%, rgba(10,9,8,0.80) 100%)",
          }}
        />

        {/* Subtle gold vignette tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isWild
              ? "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(199,162,98,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse 60% 45% at 50% 30%, rgba(199,162,98,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Corner accent lines */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-gold/30 pointer-events-none z-10" />
        <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-gold/30 pointer-events-none z-10" />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-gold/30 pointer-events-none z-10" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-gold/30 pointer-events-none z-10" />

        {/* Collection number watermark */}
        <div className="absolute top-8 left-8 z-10">
          <span className="font-cormorant text-[80px] font-light leading-none text-ivory/[0.06] select-none pointer-events-none">
            {product.collectionNo}
          </span>
        </div>

        {/* Collection label badge */}
        <div className="absolute top-8 right-8 z-10">
          <span className="font-inter text-[9px] tracking-[0.25em] text-gold/80 uppercase bg-obsidian/50 backdrop-blur-sm px-3 py-1.5 border border-gold/20">
            No. {product.collectionNo}
          </span>
        </div>

        {/* Bottom fade into content */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background: isWild
              ? "linear-gradient(to top, #151412 0%, rgba(21,20,18,0.6) 60%, transparent 100%)"
              : "linear-gradient(to top, #0E0C0A 0%, rgba(10,9,8,0.6) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content Panel ── */}
      <div
        className="relative flex flex-col gap-5 px-8 py-8"
        style={{
          background: isWild
            ? "linear-gradient(180deg, #151412 0%, #181510 100%)"
            : "linear-gradient(180deg, #0E0C0A 0%, #111008 100%)",
        }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-gold/50" />
          <span className="font-inter text-[10px] tracking-[0.3em] text-gold/70 uppercase">
            Collection No. {product.collectionNo}
          </span>
        </div>

        {/* Name + tagline */}
        <div>
          <h3 className="font-cormorant text-3xl font-light text-ivory leading-tight mb-1">
            {product.name}
          </h3>
          <p className="font-cormorant italic text-base text-gold/80">
            {product.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="font-inter text-sm text-ivory/55 leading-relaxed">
          {product.description}
        </p>

        {/* Flavour notes */}
        <div className="flex flex-wrap gap-2">
          {product.flavourNotes.map((note) => (
            <span
              key={note}
              className="inline-flex items-center gap-1.5 px-3 py-1 border border-gold/20 font-inter text-[10px] tracking-[0.15em] text-gold/60 uppercase"
            >
              <Droplets className="w-2.5 h-2.5" />
              {note}
            </span>
          ))}
        </div>

        {/* Origin + size */}
        <div className="flex items-center gap-4 py-3 border-y border-gold/10">
          <div className="flex items-center gap-1.5 text-ivory/40">
            <MapPin className="w-3 h-3" />
            <span className="font-inter text-[10px] tracking-wider">
              {product.origin}
            </span>
          </div>
          <div className="w-px h-3 bg-ivory/15" />
          <span className="font-inter text-[10px] tracking-wider text-ivory/40">
            {product.size}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="font-cormorant text-3xl font-light text-ivory">
            ${product.price}
          </span>
          <span className="font-inter text-[9px] tracking-[0.2em] text-ivory/30 uppercase">
            {product.priceNote}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-1">
          {/* Add to Bag */}
          <button
            onClick={handleAddToBag}
            className={`group flex-1 flex items-center justify-center gap-2 py-3.5 font-inter text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
              justAdded
                ? "bg-gold/20 border border-gold/60 text-gold"
                : "bg-gold text-obsidian hover:bg-gold-light hover:shadow-[0_0_32px_rgba(199,162,98,0.3)]"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Add to Bag
              </>
            )}
          </button>

          {/* Discover */}
          <button
            onClick={() => setDetailsOpen((v) => !v)}
            className="group flex items-center gap-1.5 px-5 py-3.5 border border-gold/25 hover:border-gold/60 font-inter text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-gold transition-all duration-300"
            aria-expanded={detailsOpen}
          >
            Discover
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-400 ${
                detailsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Expandable details panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            detailsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 border-t border-gold/10">
            <p className="font-inter text-[10px] tracking-[0.25em] text-gold/60 uppercase mb-4">
              Craft Details
            </p>
            <ul className="flex flex-col gap-3">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                  <span className="font-inter text-xs text-ivory/55 leading-relaxed">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── SVG jars removed — real photos now used as backgrounds ──
function _WildflowerJar_unused() {
  return (
    <svg
      viewBox="0 0 280 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[200px] h-[260px] sm:w-[230px] sm:h-[296px] drop-shadow-2xl"
      aria-label="Wildflower Honey jar"
    >
      <defs>
        <linearGradient id="wf-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0C842" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#E8BC5A" stopOpacity="0.92" />
          <stop offset="75%" stopColor="#C7922A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#A56A10" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="wf-honey" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FADA6B" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#E09820" stopOpacity="1" />
          <stop offset="100%" stopColor="#B87018" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="wf-lid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3A2F1A" />
          <stop offset="100%" stopColor="#1C1508" />
        </linearGradient>
        <linearGradient id="wf-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A8864A" />
          <stop offset="50%" stopColor="#E0C078" />
          <stop offset="100%" stopColor="#A8864A" />
        </linearGradient>
        <linearGradient id="wf-label" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDF6E8" />
          <stop offset="100%" stopColor="#F1E5CF" />
        </linearGradient>
        <linearGradient id="wf-glass-hi" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="50%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="wf-glow">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="wf-shadow">
          <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#E09820" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="140" cy="348" rx="75" ry="9" fill="#E8BC5A" opacity="0.1" />

      {/* Jar body */}
      <g filter="url(#wf-shadow)">
        <path d="M72 136 Q66 144 64 160 L60 305 Q60 318 72 324 L208 324 Q220 318 220 305 L216 160 Q214 144 208 136 Z" fill="url(#wf-body)" />
        <path d="M76 140 Q70 148 68 163 L65 303 Q65 314 74 320 L206 320 Q215 314 215 303 L212 163 Q210 148 204 140 Z" fill="url(#wf-honey)" opacity="0.8" />
        {/* Glass highlights */}
        <path d="M72 136 Q66 144 64 160 L62 270 Q74 265 80 250 L82 148 Z" fill="url(#wf-glass-hi)" opacity="0.7" />
        {/* Neck */}
        <path d="M90 92 Q80 102 72 122 L72 138 L208 138 L208 122 Q200 102 190 92 Z" fill="url(#wf-body)" />
        <path d="M93 96 Q84 106 76 124 L76 136 L204 136 L204 124 Q196 106 187 96 Z" fill="url(#wf-honey)" opacity="0.7" />
      </g>

      {/* Lid */}
      <rect x="84" y="60" width="112" height="36" rx="4" fill="url(#wf-lid)" />
      <rect x="92" y="52" width="96" height="12" rx="6" fill="url(#wf-lid)" />
      <rect x="82" y="58" width="116" height="5" rx="2" fill="url(#wf-rim)" opacity="0.9" />
      <rect x="82" y="91" width="116" height="4" rx="2" fill="url(#wf-rim)" opacity="0.8" />
      {/* Lid knurling */}
      {[96,108,120,132,146,160,172,184].map((x,i)=>(
        <line key={i} x1={x} y1="61" x2={x} y2="94" stroke="#C7A262" strokeWidth="0.5" opacity="0.18" />
      ))}

      {/* Label - ivory */}
      <rect x="82" y="168" width="116" height="118" rx="2" fill="url(#wf-label)" opacity="0.96" />
      <rect x="85" y="171" width="110" height="112" rx="1" fill="none" stroke="#C7922A" strokeWidth="0.5" opacity="0.5" />
      <rect x="90" y="176" width="100" height="102" rx="1" fill="none" stroke="#C7922A" strokeWidth="0.3" opacity="0.25" />

      {/* Floral ornament top */}
      <circle cx="140" cy="187" r="4" fill="none" stroke="#C7922A" strokeWidth="0.5" opacity="0.5" />
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <line key={i}
          x1={140 + 6*Math.cos(a*Math.PI/180)} y1={187 + 6*Math.sin(a*Math.PI/180)}
          x2={140 + 10*Math.cos(a*Math.PI/180)} y2={187 + 10*Math.sin(a*Math.PI/180)}
          stroke="#C7922A" strokeWidth="0.6" opacity="0.4"
        />
      ))}

      {/* Brand text on label */}
      <text x="140" y="214" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="300" letterSpacing="3" fill="#8B5E14" opacity="0.9">SBH</text>
      <line x1="100" y1="220" x2="180" y2="220" stroke="#C7922A" strokeWidth="0.4" opacity="0.45" />
      <text x="140" y="234" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7" fontStyle="italic" letterSpacing="2" fill="#A56A10" opacity="0.7">Wildflower Honey</text>

      {/* Honeycomb icon */}
      <g transform="translate(128,242)" opacity="0.35">
        <polygon points="12,0 20,4.6 20,13.8 12,18.4 4,13.8 4,4.6" fill="none" stroke="#C7922A" strokeWidth="0.8"/>
        <polygon points="12,5 16,7.3 16,12.7 12,15 8,12.7 8,7.3" fill="none" stroke="#C7922A" strokeWidth="0.4"/>
      </g>

      <text x="140" y="274" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6" letterSpacing="1.5" fill="#A56A10" opacity="0.35">340g / 12oz</text>
      <path d="M100 278 Q140 274 180 278" stroke="#C7922A" strokeWidth="0.35" opacity="0.3" fill="none"/>

      {/* Honey drip */}
      <path d="M174 136 L176 148 Q177 156 174 159 Q171 162 168.5 159 Q166 156 167 148 L169 136 Z" fill="#E8BC5A" opacity="0.85"/>
    </svg>
  );
}

function _HimalayanJar_unused() {
  return (
    <svg
      viewBox="0 0 280 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[200px] h-[260px] sm:w-[230px] sm:h-[296px] drop-shadow-2xl"
      aria-label="Himalayan Reserve Honey jar"
    >
      <defs>
        <linearGradient id="hm-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2218" />
          <stop offset="40%" stopColor="#1E1810" />
          <stop offset="75%" stopColor="#141008" />
          <stop offset="100%" stopColor="#0C0906" />
        </linearGradient>
        <linearGradient id="hm-honey" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C78820" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#A06010" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7A4008" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="hm-lid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2218" />
          <stop offset="100%" stopColor="#0A0806" />
        </linearGradient>
        <linearGradient id="hm-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#786030" />
          <stop offset="30%" stopColor="#C7A262" />
          <stop offset="60%" stopColor="#E0C078" />
          <stop offset="100%" stopColor="#786030" />
        </linearGradient>
        <linearGradient id="hm-label" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A1410" />
          <stop offset="100%" stopColor="#0E0B08" />
        </linearGradient>
        <linearGradient id="hm-glass-hi" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C7A262" stopOpacity="0.12" />
          <stop offset="40%" stopColor="#C7A262" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#C7A262" stopOpacity="0" />
        </linearGradient>
        <filter id="hm-shadow">
          <feDropShadow dx="0" dy="10" stdDeviation="22" floodColor="#C7A262" floodOpacity="0.2" />
        </filter>
        <filter id="hm-glow">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="140" cy="348" rx="75" ry="9" fill="#C7A262" opacity="0.07" />

      {/* Jar body */}
      <g filter="url(#hm-shadow)">
        <path d="M72 136 Q66 144 64 160 L60 305 Q60 318 72 324 L208 324 Q220 318 220 305 L216 160 Q214 144 208 136 Z" fill="url(#hm-body)" />
        {/* Amber honey visible inside */}
        <path d="M78 142 Q73 150 71 164 L68 302 Q68 312 77 317 L203 317 Q212 312 212 302 L209 164 Q207 150 202 142 Z" fill="url(#hm-honey)" />
        {/* Glass edge highlight */}
        <path d="M72 136 Q66 144 64 160 L62 275 Q74 270 80 255 L82 148 Z" fill="url(#hm-glass-hi)" opacity="0.8" />
        {/* Neck */}
        <path d="M90 92 Q80 102 72 122 L72 138 L208 138 L208 122 Q200 102 190 92 Z" fill="url(#hm-body)" />
        <path d="M94 98 Q85 107 77 126 L77 136 L203 136 L203 126 Q195 107 186 98 Z" fill="url(#hm-honey)" opacity="0.5" />
      </g>

      {/* Outer gold band on jar body (luxury detail) */}
      <rect x="60" y="155" width="160" height="3" fill="url(#hm-rim)" opacity="0.4" rx="1"/>
      <rect x="60" y="302" width="160" height="3" fill="url(#hm-rim)" opacity="0.4" rx="1"/>

      {/* Lid */}
      <rect x="84" y="60" width="112" height="36" rx="4" fill="url(#hm-lid)" />
      <rect x="92" y="52" width="96" height="12" rx="6" fill="url(#hm-lid)" />
      <rect x="82" y="58" width="116" height="5" rx="2" fill="url(#hm-rim)" opacity="0.95" />
      <rect x="82" y="91" width="116" height="4" rx="2" fill="url(#hm-rim)" opacity="0.85" />
      {[96,108,120,132,146,160,172,184].map((x,i)=>(
        <line key={i} x1={x} y1="61" x2={x} y2="94" stroke="#C7A262" strokeWidth="0.5" opacity="0.22" />
      ))}

      {/* Label - dark with gold */}
      <rect x="82" y="168" width="116" height="118" rx="2" fill="url(#hm-label)" />
      <rect x="85" y="171" width="110" height="112" rx="1" fill="none" stroke="#C7A262" strokeWidth="0.6" opacity="0.55" />
      <rect x="90" y="176" width="100" height="102" rx="1" fill="none" stroke="#C7A262" strokeWidth="0.3" opacity="0.25" />

      {/* Mountain silhouette on label */}
      <path
        d="M96 265 L108 240 L118 252 L130 222 L145 248 L158 232 L172 258 L184 265 Z"
        fill="#C7A262" opacity="0.12"
      />
      <path
        d="M104 265 L116 243 L126 254 L138 228 L152 252 L165 238 L176 265 Z"
        fill="none" stroke="#C7A262" strokeWidth="0.6" opacity="0.4"
      />

      {/* Brand text on label */}
      <text x="140" y="200" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="300" letterSpacing="3" fill="#C7A262" opacity="0.95">SBH</text>
      <line x1="100" y1="206" x2="180" y2="206" stroke="#C7A262" strokeWidth="0.4" opacity="0.4" />
      <text x="140" y="218" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6.5" fontStyle="italic" letterSpacing="1.5" fill="#D4B87A" opacity="0.6">Himalayan Reserve</text>

      {/* Star ornament */}
      <polygon points="140,225 141.5,229 146,229 142.5,231.5 143.8,236 140,233.5 136.2,236 137.5,231.5 134,229 138.5,229"
        fill="#C7A262" opacity="0.35"/>

      <text x="140" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6" letterSpacing="1.5" fill="#C7A262" opacity="0.3">340g / 12oz</text>

      {/* Gold drip accent */}
      <path d="M110 136 L112 150 Q113 159 110 162 Q107 165 104.5 162 Q102 159 103 150 L105 136 Z" fill="#C7A262" opacity="0.6"/>

      {/* Ambient glow */}
      <ellipse cx="140" cy="230" rx="80" ry="90" fill="#C7A262" opacity="0.02" filter="url(#hm-glow)" />
    </svg>
  );
}
