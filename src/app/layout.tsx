import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Stillness Bee Honey — The Art of Golden Living",
  description:
    "Extraordinary honey for everyday rituals. Nature's gold, refined.",
  keywords: ["luxury honey", "premium honey", "artisan honey", "Stillness Bee Honey"],
  openGraph: {
    title: "Stillness Bee Honey — The Art of Golden Living",
    description: "Extraordinary honey for everyday rituals.",
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
      <body className="bg-obsidian text-ivory antialiased">{children}</body>
    </html>
  );
}
