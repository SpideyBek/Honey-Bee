"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Collection", href: "#collection" },
  { label: "Our Story", href: "#story" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-obsidian/95 backdrop-blur-md border-b border-gold/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="Stillness Bee Honey Home"
          >
            {/* Ornamental mark */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12"
              >
                <polygon
                  points="16,2 20,12 30,12 22,18 25,28 16,22 7,28 10,18 2,12 12,12"
                  fill="none"
                  stroke="#C7A262"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="16" r="3" fill="#C7A262" opacity="0.7" />
              </svg>
            </div>
            <span
              className="font-cormorant text-xl font-light text-ivory uppercase"
              style={{ letterSpacing: "0.18em" }}
            >
              STILLNESS BEE HONEY
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-inter text-xs tracking-[0.2em] uppercase text-ivory/70 hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              className="relative p-2 text-ivory/70 hover:text-gold transition-colors duration-300 group"
              aria-label={`Shopping bag${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {count > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center bg-gold text-obsidian font-inter text-[9px] font-semibold rounded-full leading-none">
                  {count > 99 ? "99+" : count}
                </span>
              ) : (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-ivory/70 hover:text-gold transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-obsidian/98 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative flex flex-col items-center justify-center h-full gap-10">
          {/* Decorative line */}
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-cormorant text-4xl font-light text-ivory/80 hover:text-gold tracking-widest uppercase transition-all duration-300 hover:tracking-[0.4em]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </a>
          ))}

          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

          <p className="font-inter text-xs tracking-[0.3em] text-gold/50 uppercase">
            The Art of Golden Living
          </p>
        </div>
      </div>
    </>
  );
}
