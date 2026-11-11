import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navigation from "@/components/Navigation";
import CartDrawer  from "@/components/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stillness Bee Honey — Premium Bulgarian Honey",
  description:
    "Discover the golden richness of premium honey imported from Bulgaria. Carefully sourced, naturally exquisite, and crafted for those who appreciate the finest gifts of nature.",
  keywords: [
    "Bulgarian honey",
    "premium honey",
    "luxury honey",
    "raw honey",
    "Stillness Bee Honey",
    "imported honey",
  ],
  openGraph: {
    title: "Stillness Bee Honey — Premium Bulgarian Honey",
    description: "Premium honey imported from Bulgaria. Naturally exceptional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-ivory antialiased">
        <CartProvider>
          <Navigation />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
