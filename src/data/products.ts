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
    tagline: "Everyday, Extraordinary.",
    description:
      "A delicate floral sweetness crafted for your everyday golden rituals.",
    details: [
      "Cold-extracted to preserve natural enzymes",
      "Sourced from wildflower meadows in bloom",
      "Raw, unfiltered, and never heat-treated",
      "No additives — pure as nature intended",
    ],
    price: 22,
    priceNote: "Placeholder price",
    size: "12 oz / 340 g",
    origin: "Pacific Northwest Meadows",
    flavourNotes: ["Wildflower blossom", "Light citrus", "Warm vanilla"],
    variant: "wildflower",
    image: "/honey-wildflower.jpeg",
    imageAlt: "Stillness Bee Honey Wildflower Honey jar surrounded by wildflowers and a honey dipper",
  },
  {
    id: "himalayan-reserve",
    collectionNo: "02",
    name: "Himalayan Reserve Honey",
    tagline: "Born of the Mountains.",
    description:
      "An exceptional honey inspired by the beauty and richness of the Himalayas.",
    details: [
      "Small-batch harvested by master beekeepers",
      "High-altitude flora imparts rare mineral depth",
      "Rich amber tone with a long, complex finish",
      "Limited seasonal release — numbered jars",
    ],
    price: 35,
    priceNote: "Placeholder price",
    size: "12 oz / 340 g",
    origin: "Himalayan Highland Reserves",
    flavourNotes: ["Dark caramel", "Alpine herbs", "Smoky amber"],
    variant: "himalayan",
    image: "/honey-himalayan.jpeg",
    imageAlt: "Stillness Bee Honey Himalayan Reserve Honey jar on dark dramatic background",
  },
];
