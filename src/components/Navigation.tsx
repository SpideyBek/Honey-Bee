"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Home",       href: "/"           },
  { label: "Collection", href: "/#collection" },
  { label: "Our Story",  href: "/about"       },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const { count, isOpen, setIsOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  /** True when this link is the "active" page. */
  const isActive = (href: string) => {
    if (href === "/")        return pathname === "/";
    if (href === "/about")   return pathname === "/about";
    return false; // hash links don't count as active pages
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-obsidian/96 backdrop-blur-lg border-b border-gold/[0.12] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
            aria-label="Stillness Bee Honey — Home"
          >
            <div className="w-7 h-7 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden>
                <ellipse cx="9"  cy="9"  rx="6.5" ry="4" stroke="#C7A262" strokeWidth="0.8" opacity="0.7" transform="rotate(-20 9 9)"  />
                <ellipse cx="19" cy="9"  rx="6.5" ry="4" stroke="#C7A262" strokeWidth="0.8" opacity="0.7" transform="rotate(20 19 9)" />
                <ellipse cx="14" cy="16" rx="4.5" ry="6.5" fill="#C7A262" opacity="0.15" stroke="#C7A262" strokeWidth="0.8" />
                <line x1="9.5"  y1="14.5" x2="18.5" y2="14.5" stroke="#C7A262" strokeWidth="0.7" opacity="0.5" />
                <line x1="9.8"  y1="17"   x2="18.2" y2="17"   stroke="#C7A262" strokeWidth="0.7" opacity="0.5" />
                <line x1="10.5" y1="19.5" x2="17.5" y2="19.5" stroke="#C7A262" strokeWidth="0.7" opacity="0.4" />
                <circle cx="14" cy="10" r="2.5" fill="#C7A262" opacity="0.25" stroke="#C7A262" strokeWidth="0.7" />
                <line x1="12.5" y1="8" x2="10" y2="5.5" stroke="#C7A262" strokeWidth="0.6" opacity="0.55" strokeLinecap="round" />
                <line x1="15.5" y1="8" x2="18" y2="5.5" stroke="#C7A262" strokeWidth="0.6" opacity="0.55" strokeLinecap="round" />
                <circle cx="10" cy="5.5" r="0.8" fill="#C7A262" opacity="0.55" />
                <circle cx="18" cy="5.5" r="0.8" fill="#C7A262" opacity="0.55" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-cormorant font-light text-ivory uppercase" style={{ fontSize: "1.05rem", letterSpacing: "0.22em" }}>
                Stillness
              </span>
              <span className="font-inter font-light text-gold/70 uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.32em" }}>
                Bee Honey
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-inter text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 relative group ${
                  isActive(link.href) ? "text-ivory" : "text-ivory/55 hover:text-ivory"
                }`}
              >
                {link.label}
                {/* Underline — always visible when active, appears on hover otherwise */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold/70 transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);   // close mobile menu if open
                setIsOpen(!isOpen);     // toggle cart drawer
              }}
              className="relative p-2.5 text-ivory/50 hover:text-ivory transition-colors duration-300"
              aria-label={`${isOpen ? "Close" : "Open"} shopping bag${count > 0 ? ` — ${count} item${count !== 1 ? "s" : ""}` : ""}`}
              aria-expanded={isOpen}
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.4]" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-1 flex items-center justify-center bg-gold text-obsidian font-inter text-[8px] font-bold rounded-full leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2.5 text-ivory/50 hover:text-ivory transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X    className="w-[18px] h-[18px] stroke-[1.4]" />
              ) : (
                <Menu className="w-[18px] h-[18px] stroke-[1.4]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-obsidian/98 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="relative flex flex-col items-center justify-center h-full gap-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/35 to-transparent" />

          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`font-cormorant text-[2.6rem] font-light tracking-[0.12em] uppercase transition-all duration-300 hover:tracking-[0.22em] ${
                isActive(link.href) ? "text-gold" : "text-ivory/75 hover:text-gold"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}

          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/35 to-transparent" />
          <p className="font-cormorant italic text-sm text-gold/40">The Art of Golden Living</p>
        </div>
      </div>
    </>
  );
}
