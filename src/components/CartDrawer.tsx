"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem, updateQty, count } = useCart();

  /* ── Lock body scroll while drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Close on Escape ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  /* ── Enrich cart items with product data ── */
  const cartItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as Array<{ id: string; qty: number; product: (typeof products)[0] }>;

  const subtotal = cartItems.reduce(
    (acc, { product, qty }) => acc + product.price * qty,
    0
  );

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-400 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(21,20,18,0.70)",
          backdropFilter: "blur(5px)",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden
      />

      {/* ── Drawer panel ── */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[61] flex flex-col w-full max-w-[460px] transition-transform duration-500 ease-out`}
        style={{
          background: "linear-gradient(180deg, #1A1714 0%, #131210 100%)",
          borderLeft: "1px solid rgba(199,162,98,0.10)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          willChange: "transform",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        {/* ════════ HEADER ════════ */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gold/[0.09]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-gold/55 stroke-[1.4]" />
            <span className="font-inter text-[10px] tracking-[0.28em] text-ivory/55 uppercase">
              Your Bag
            </span>
            {count > 0 && (
              <span
                className="font-inter text-[8px] text-gold/70 px-2 py-0.5 rounded-full border border-gold/22"
                style={{ background: "rgba(199,162,98,0.07)" }}
              >
                {count}&nbsp;{count === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-ivory/35 hover:text-ivory transition-colors duration-200 rounded"
            aria-label="Close bag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ════════ BODY ════════ */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center h-full px-10 text-center gap-6 py-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ border: "1px solid rgba(199,162,98,0.14)" }}
              >
                <ShoppingBag className="w-6 h-6 text-gold/28 stroke-[1.2]" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-cormorant font-light text-[1.6rem] text-ivory/45">
                  Your bag is empty
                </p>
                <p className="font-inter text-xs text-ivory/26 leading-relaxed max-w-[220px] mx-auto">
                  Explore our collection and discover the natural elegance of
                  Stillness Bee Honey.
                </p>
              </div>
              <Link
                href="/#collection"
                onClick={() => setIsOpen(false)}
                className="group inline-flex items-center gap-2 font-inter text-[9px] tracking-[0.26em] uppercase text-gold/55 hover:text-gold transition-colors duration-200"
              >
                Explore Collection
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ) : (
            /* ── Item list ── */
            <ul className="divide-y divide-gold/[0.07]">
              {cartItems.map(({ id, qty, product }) => (
                <li key={id} className="flex gap-4 px-7 py-6">

                  {/* Product thumbnail */}
                  <div className="relative w-[76px] h-[90px] flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="76px"
                      className="object-cover"
                      style={{
                        objectPosition:
                          product.variant === "wildflower"
                            ? "center 38%"
                            : "center 42%",
                      }}
                    />
                    {/* Subtle overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "rgba(21,20,18,0.12)" }}
                    />
                    {/* Collection badge */}
                    <div className="absolute top-1.5 left-1.5">
                      <span
                        className="font-inter text-[7px] tracking-widest text-gold/70"
                        style={{
                          background: "rgba(21,20,18,0.72)",
                          padding: "1px 4px",
                        }}
                      >
                        {product.collectionNo}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-2.5 min-w-0">

                    {/* Name + remove */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-cormorant font-light text-[1.1rem] text-ivory leading-tight truncate">
                          {product.name}
                        </p>
                        <p className="font-cormorant italic text-[0.78rem] text-gold/60 leading-tight">
                          {product.tagline}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(id)}
                        className="flex-shrink-0 p-1 mt-0.5 text-ivory/22 hover:text-ivory/60 transition-colors duration-200"
                        aria-label={`Remove ${product.name} from bag`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Qty controls + line price */}
                    <div className="flex items-center justify-between">

                      {/* +/− pill */}
                      <div
                        className="flex items-center"
                        style={{ border: "1px solid rgba(199,162,98,0.18)" }}
                      >
                        <button
                          onClick={() =>
                            qty > 1 ? updateQty(id, qty - 1) : removeItem(id)
                          }
                          className="w-8 h-8 flex items-center justify-center text-ivory/40 hover:text-ivory transition-colors duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span
                          className="w-8 h-8 flex items-center justify-center font-inter text-[11px] text-ivory/65"
                          style={{ borderLeft: "1px solid rgba(199,162,98,0.18)", borderRight: "1px solid rgba(199,162,98,0.18)" }}
                        >
                          {qty}
                        </span>

                        <button
                          onClick={() => updateQty(id, qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-ivory/40 hover:text-ivory transition-colors duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="font-cormorant text-[1.3rem] font-light text-ivory">
                        ${product.price * qty}
                      </span>
                    </div>

                    {/* Size + origin */}
                    <p className="font-inter text-[8.5px] tracking-wider text-ivory/22">
                      {product.size} · {product.origin}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ════════ FOOTER — subtotal + CTA ════════ */}
        {cartItems.length > 0 && (
          <div className="border-t border-gold/[0.09] px-7 pt-5 pb-7 flex flex-col gap-5">

            {/* Subtotal */}
            <div className="flex items-end justify-between">
              <div>
                <span className="font-inter text-[9.5px] tracking-[0.2em] text-ivory/38 uppercase">
                  Estimated Total
                </span>
                <p className="font-inter text-[8px] text-ivory/20 mt-1 leading-relaxed">
                  Prices are placeholders — confirmed at order.
                </p>
              </div>
              <div className="text-right">
                <span className="font-cormorant text-[1.8rem] font-light text-ivory leading-none">
                  ${subtotal}
                </span>
              </div>
            </div>

            {/* Primary CTA — Continue to Inquiry */}
            <Link
              href="/inquiry"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-2.5 py-[14px] font-inter text-[10px] tracking-[0.22em] uppercase text-obsidian font-medium transition-all duration-300 hover:shadow-[0_8px_36px_rgba(199,162,98,0.30)]"
              style={{ background: "linear-gradient(135deg, #C7A262, #D4B87A)" }}
            >
              Continue to Inquiry
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary — continue browsing */}
            <button
              onClick={() => setIsOpen(false)}
              className="font-inter text-[9px] tracking-[0.2em] text-ivory/30 hover:text-ivory/55 uppercase text-center transition-colors duration-200 py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
