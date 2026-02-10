import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.resolve(__dirname, "zeromade-data.json");

const seedProducts = [
  {
    id: "1",
    name: "Premium Black Hoodie",
    category: "Hoodies",
    price: 2499,
    originalPrice: 3499,
    image: "/assets/products/hoodie-black.jpg",
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    slug: "premium-black-hoodie",
    colors: ["Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Essential White Tee",
    category: "T-Shirts",
    price: 999,
    originalPrice: null,
    image: "/assets/products/tshirt-white.jpg",
    rating: 4.9,
    reviews: 256,
    badge: null,
    slug: "essential-white-tee",
    colors: ["White", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Navy Comfort Joggers",
    category: "Pants",
    price: 1899,
    originalPrice: 2499,
    image: "/assets/products/joggers-navy.jpg",
    rating: 4.7,
    reviews: 89,
    badge: "20% Off",
    slug: "navy-comfort-joggers",
    colors: ["Navy", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "4",
    name: "Urban Gray Bomber",
    category: "Jackets",
    price: 3999,
    originalPrice: null,
    image: "/assets/products/jacket-gray.jpg",
    rating: 4.9,
    reviews: 67,
    badge: "New",
    slug: "urban-gray-bomber",
    colors: ["Gray", "Black", "Olive"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5",
    name: "Burgundy Crewneck",
    category: "Sweaters",
    price: 1799,
    originalPrice: 2299,
    image: "/assets/products/sweater-burgundy.jpg",
    rating: 4.6,
    reviews: 45,
    badge: null,
    slug: "burgundy-crewneck",
    colors: ["Burgundy", "Navy", "Green"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "6",
    name: "Olive Cargo Pants",
    category: "Pants",
    price: 2199,
    originalPrice: null,
    image: "/assets/products/cargo-olive.jpg",
    rating: 4.8,
    reviews: 112,
    badge: "Trending",
    slug: "olive-cargo-pants",
    colors: ["Olive", "Black", "Khaki"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "7",
    name: "Classic Black Polo",
    category: "T-Shirts",
    price: 1299,
    originalPrice: 1699,
    image: "/assets/products/polo-black.jpg",
    rating: 4.7,
    reviews: 78,
    badge: null,
    slug: "classic-black-polo",
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "8",
    name: "Beige Denim Jacket",
    category: "Jackets",
    price: 3499,
    originalPrice: 4499,
    image: "/assets/products/denim-beige.jpg",
    rating: 4.9,
    reviews: 34,
    badge: "Limited",
    slug: "beige-denim-jacket",
    colors: ["Beige", "Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
  },
];

export function ensureSeedData() {
  if (!fs.existsSync(DATA_PATH)) {
    const initial = {
      products: seedProducts,
      users: [],
      orders: [],
    };
    fs.writeFileSync(DATA_PATH, JSON.stringify(initial, null, 2), "utf8");
  }
}

export function readData() {
  ensureSeedData();
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

export function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

