import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Filter,
  ChevronDown,
  Grid3X3,
  LayoutGrid,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import { fetchProducts, fetchCategories } from "@/lib/api";

// Import product images
import hoodieBlack from "@/assets/products/hoodie-black.jpg";
import tshirtWhite from "@/assets/products/tshirt-white.jpg";
import joggersNavy from "@/assets/products/joggers-navy.jpg";
import jacketGray from "@/assets/products/jacket-gray.jpg";
import sweaterBurgundy from "@/assets/products/sweater-burgundy.jpg";
import cargoOlive from "@/assets/products/cargo-olive.jpg";
import poloBlack from "@/assets/products/polo-black.jpg";
import denimBeige from "@/assets/products/denim-beige.jpg";

const products = [
  {
    id: "1",
    name: "Premium Black Hoodie",
    category: "Hoodies",
    price: 2499,
    originalPrice: 3499,
    image: hoodieBlack,
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
    image: tshirtWhite,
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
    image: joggersNavy,
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
    image: jacketGray,
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
    image: sweaterBurgundy,
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
    image: cargoOlive,
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
    image: poloBlack,
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
    image: denimBeige,
    rating: 4.9,
    reviews: 34,
    badge: "Limited",
    slug: "beige-denim-jacket",
    colors: ["Beige", "Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
  },
];

const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹3,000", min: 2000, max: 3000 },
  { label: "Above ₹3,000", min: 3000, max: 10000 },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: string[];
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-display font-semibold">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedCategory === cat
                ? "bg-accent text-accent-foreground"
                : "hover:bg-secondary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-display font-semibold">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="mb-3 font-display font-semibold">Size</h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              className="rounded-lg border px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: categories = ["All"] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const cats = await fetchCategories();
      return ["All", ...cats];
    }
  });

  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const { addItem } = useCart();

  useEffect(() => {
    if (category) {
      const found = categories.find(
        (c) =>
          c.toLowerCase().replace(/[^a-z]/g, "") ===
          category.toLowerCase().replace(/[^a-z]/g, "")
      );
      if (found) setSelectedCategory(found);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  const { data: remoteProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: 1,
  });

  const productList =
    (remoteProducts as typeof products | undefined) ?? products;

  const filteredProducts =
    selectedCategory === "All"
      ? productList
      : productList.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="zeromade-container py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Products</span>
        </nav>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold lg:text-3xl">
                  {selectedCategory === "All" ? "All Products" : selectedCategory}
                </h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                {/* Grid Toggle */}
                <div className="hidden items-center gap-1 rounded-lg border p-1 lg:flex">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`rounded p-1.5 ${gridCols === 3 ? "bg-secondary" : ""
                      }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`rounded p-1.5 ${gridCols === 4 ? "bg-secondary" : ""
                      }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 sm:grid-cols-2 ${gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                }`}
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card group">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 rounded-full shadow-lg"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 rounded-full shadow-lg"
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            size: product.sizes?.[0],
                            color: product.colors?.[0],
                          })
                        }
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.category}
                    </p>
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-medium hover:text-accent transition-colors"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-display text-lg font-bold">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}