export type ProductVariant = "wildflower" | "himalayan";

export interface Product {
  id: string;
  collectionNo: string;
  name: string;
  tagline: string;
  description: string;
  details: string[];
  price: number;
  priceNote: string; // placeholder disclaimer
  size: string;
  origin: string;
  flavourNotes: string[];
  variant: ProductVariant;
  image: string; // path relative to /public
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: "wildflower-honey",
    collectionNo: "01",
    name: "Wildflower Honey",
    tagline: "The Bloom of Bulgaria.",
    description:
      "A luminous, floral honey drawn from Bulgaria's sun-drenched wildflower meadows — vibrant, complex, and beautifully pure.",
    details: [
      "Cold-extracted to preserve living enzymes and full aroma",
      "Harvested from Bulgaria's richly biodiverse wildflower valleys",
      "Raw, unfiltered, and never heat-treated",
      "Traceable single-origin — from hive to jar",
    ],
    price: 22,
    priceNote: "Placeholder price",
    size: "12 oz / 340 g",
    origin: "Bulgarian Rose Valley",
    flavourNotes: ["Wild blossom", "Ripe stone fruit", "Warm honey dew"],
    variant: "wildflower",
    image: "/honey-wildflower.jpeg",
    imageAlt: "Stillness Bee Honey Bulgarian Wildflower Honey jar surrounded by wildflowers and a honey dipper",
  },
  {
    id: "himalayan-reserve",
    collectionNo: "02",
    name: "Balkan Mountain Reserve",
    tagline: "Born of the Balkans.",
    description:
      "An exceptional mountain honey from Bulgaria's ancient Balkan highlands — deep, mineral-rich, and rare in its quiet intensity.",
    details: [
      "Small-batch harvested by Bulgaria's master beekeepers",
      "High-altitude Balkan flora imparts rare mineral complexity",
      "Rich amber tone with a long, layered finish",
      "Limited seasonal release — individually numbered jars",
    ],
    price: 35,
    priceNote: "Placeholder price",
    size: "12 oz / 340 g",
    origin: "Balkan Mountain Highlands, Bulgaria",
    flavourNotes: ["Dark caramel", "Mountain herbs", "Rich amber"],
    variant: "himalayan",
    image: "/honey-himalayan.jpeg",
    imageAlt: "Stillness Bee Honey Balkan Mountain Reserve jar on dark dramatic background",
  },
];
