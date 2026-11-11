import type { Metadata } from "next";
import AboutHero           from "@/components/about/AboutHero";
import OurStory            from "@/components/about/OurStory";
import BulgarianOrigin     from "@/components/about/BulgarianOrigin";
import Philosophy          from "@/components/about/Philosophy";
import CollectionPreview   from "@/components/about/CollectionPreview";
import StillnessExperience from "@/components/about/StillnessExperience";
import AboutCTA            from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "Our Story — Stillness Bee Honey",
  description:
    "Discover the story behind Stillness Bee Honey — premium honey inspired by the natural beauty of Bulgaria, crafted for those who appreciate the finest gifts of nature.",
  openGraph: {
    title: "Our Story — Stillness Bee Honey",
    description:
      "Rooted in nature. Crafted for stillness. Discover our world of premium Bulgarian honey.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="relative bg-obsidian">
      {/* 1. Cinematic hero */}
      <AboutHero />

      {/* 2. Our Story */}
      <OurStory />

      {/* 3. Bulgarian Origin */}
      <BulgarianOrigin />

      {/* 4. Philosophy */}
      <Philosophy />

      {/* 5. Collection preview */}
      <CollectionPreview />

      {/* 6. The Stillness Experience */}
      <StillnessExperience />

      {/* 7. Final CTA */}
      <AboutCTA />
    </main>
  );
}
