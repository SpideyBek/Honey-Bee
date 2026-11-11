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
  /** When true, image is on the right and text on the left */
  reverse?: boolean;
}

export default function ProductCard({
  product,
  isVisible,
  delay = 0,
  reverse = false,
}: ProductCardProps) {
  const { addItem, lastAdded } = useCart();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const isWild = product.variant === "wildflower";
  const justAdded = lastAdded === product.id;

  const textBg = isWild
    ? "linear-gradient(160deg, #151412 0%, #181510 100%)"
    : "linear-gradient(160deg, #0F0D0B 0%, #131008 100%)";

  const blendColor = isWild ? "#151412" : "#0F0D0B";

  return (
    <article
      className={`relative flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ minHeight: "640px", transitionDelay: `${delay}ms` }}
    >
      {/* ════════════════════════
          IMAGE PANEL
      ════════════════════════ */}
      <div
        className="group relative overflow-hidden flex-shrink-0"
        style={{ flex: "0 0 55%", minHeight: "480px" }}
      >
        {/* Photography — subtle zoom on hover */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ willChange: "transform" }}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
            style={{
              objectPosition: isWild ? "center 38%" : "center 42%",
            }}
          />
        </div>

        {/* Cinematic overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background: isWild
              ? "linear-gradient(160deg, rgba(21,20,18,0.35) 0%, rgba(21,20,18,0.06) 45%, rgba(21,20,18,0.62) 100%)"
              : "linear-gradient(160deg, rgba(10,9,8,0.5) 0%, rgba(10,9,8,0.12) 42%, rgba(10,9,8,0.74) 100%)",
          }}
        />

        {/* Gold bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isWild
              ? "radial-gradient(ellipse 65% 50% at 50% 35%, rgba(199,162,98,0.1) 0%, transparent 68%)"
              : "radial-gradient(ellipse 58% 45% at 50% 30%, rgba(199,162,98,0.07) 0%, transparent 68%)",
          }}
        />

        {/* Edge blend into text panel */}
        <div
          aria-hidden
          className="absolute inset-y-0 z-10 pointer-events-none"
          style={{
            [reverse ? "left" : "right"]: 0,
            width: "110px",
            background: `linear-gradient(to ${reverse ? "left" : "right"}, transparent, ${blendColor})`,
          }}
        />

        {/* Large watermark number */}
        <div
          className="absolute bottom-7 z-10 select-none pointer-events-none"
          style={{ [reverse ? "right" : "left"]: "36px" }}
        >
          <span className="font-cormorant text-[120px] font-light leading-none text-ivory/[0.05]">
            {product.collectionNo}
          </span>
        </div>

        {/* Collection badge */}
        <div className="absolute top-8 left-8 z-10">
          <span className="font-inter text-[8px] tracking-[0.3em] text-gold/70 uppercase bg-obsidian/55 backdrop-blur-sm px-3 py-1.5 border border-gold/18">
            No.&nbsp;{product.collectionNo}
          </span>
        </div>
      </div>

      {/* ════════════════════════
          TEXT PANEL
      ════════════════════════ */}
      <div
        className="relative flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-14 lg:py-20"
        style={{ flex: "1 1 45%", background: textBg }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-gold/45" />
          <span className="font-inter text-[9px] tracking-[0.32em] text-gold/60 uppercase">
            Collection No.&nbsp;{product.collectionNo}
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-cormorant font-light text-[clamp(2.2rem,3.2vw,3.4rem)] text-ivory leading-[1.0] mb-3">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="font-cormorant italic text-lg text-gold/72 mb-6">
          {product.tagline}
        </p>

        {/* Gold rule */}
        <div
          className="w-10 h-px mb-7"
          style={{
            background: isWild
              ? "linear-gradient(to right, #C7A262, #E8BC5A)"
              : "linear-gradient(to right, #A8864A, #C7A262)",
          }}
        />

        {/* Description */}
        <p className="font-inter text-sm text-ivory/48 leading-relaxed mb-7 max-w-xs">
          {product.description}
        </p>

        {/* Flavour notes */}
        <div className="flex flex-wrap gap-2 mb-7">
          {product.flavourNotes.map((note) => (
            <span
              key={note}
              className="inline-flex items-center gap-1.5 px-3 py-1 border border-gold/20 font-inter text-[9px] tracking-[0.15em] text-gold/55 uppercase"
            >
              <Droplets className="w-2.5 h-2.5" />
              {note}
            </span>
          ))}
        </div>

        {/* Origin & size */}
        <div className="flex items-center gap-4 py-4 border-y border-gold/[0.09] mb-7">
          <div className="flex items-center gap-1.5 text-ivory/36">
            <MapPin className="w-3 h-3" />
            <span className="font-inter text-[9px] tracking-wider">
              {product.origin}
            </span>
          </div>
          <div className="w-px h-3 bg-ivory/14" />
          <span className="font-inter text-[9px] tracking-wider text-ivory/36">
            {product.size}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-7">
          <span className="font-cormorant text-[2.3rem] font-light text-ivory">
            ${product.price}
          </span>
          <span className="font-inter text-[8.5px] tracking-[0.2em] text-ivory/26 uppercase">
            {product.priceNote}
          </span>
        </div>

        {/* CTA row */}
        <div className="flex gap-3">
          {/* Add to Bag */}
          <button
            onClick={() => addItem(product.id)}
            className={`group flex-1 flex items-center justify-center gap-2 py-3.5 font-inter text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
              justAdded
                ? "bg-gold/18 border border-gold/55 text-gold"
                : "bg-gold text-obsidian hover:bg-gold-light hover:shadow-[0_0_32px_rgba(199,162,98,0.26)]"
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

          {/* Expand details */}
          <button
            onClick={() => setDetailsOpen((v) => !v)}
            className="group flex items-center gap-1.5 px-5 py-3.5 border border-gold/22 hover:border-gold/52 font-inter text-[10px] tracking-[0.2em] uppercase text-ivory/52 hover:text-gold transition-all duration-300"
            aria-expanded={detailsOpen}
          >
            Details
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                detailsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Expandable craft details */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            detailsOpen ? "max-h-72 opacity-100 mt-5" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-5 border-t border-gold/[0.09]">
            <p className="font-inter text-[9px] tracking-[0.28em] text-gold/52 uppercase mb-4">
              Craft Details
            </p>
            <ul className="flex flex-col gap-3">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gold/55 flex-shrink-0" />
                  <span className="font-inter text-xs text-ivory/48 leading-relaxed">
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
