import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import GoldenRitual from "@/components/GoldenRitual";

export default function Home() {
  return (
    <main className="relative bg-obsidian">
      <Hero />
      <Collection />
      <GoldenRitual />
    </main>
  );
}
