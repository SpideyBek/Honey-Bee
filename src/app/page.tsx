import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import GoldenRitual from "@/components/GoldenRitual";
import { CartProvider } from "@/context/CartContext";

export default function Home() {
  return (
    <CartProvider>
      <main className="relative bg-obsidian">
        <Navigation />
        <Hero />
        <Collection />
        <GoldenRitual />
      </main>
    </CartProvider>
  );
}
