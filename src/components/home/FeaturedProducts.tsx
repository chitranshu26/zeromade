import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import { fetchProducts } from "@/lib/api";

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
    price: 2499,
    originalPrice: 3499,
    image: hoodieBlack,
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    slug: "premium-black-hoodie",
  },
  {
    id: "2",
    name: "Essential White Tee",
    price: 999,
    originalPrice: null,
    image: tshirtWhite,
    rating: 4.9,
    reviews: 256,
    badge: null,
    slug: "essential-white-tee",
  },
  {
    id: "3",
    name: "Navy Comfort Joggers",
    price: 1899,
    originalPrice: 2499,
    image: joggersNavy,
    rating: 4.7,
    reviews: 89,
    badge: "20% Off",
    slug: "navy-comfort-joggers",
  },
  {
    id: "4",
    name: "Urban Gray Bomber",
    price: 3999,
    originalPrice: null,
    image: jacketGray,
    rating: 4.9,
    reviews: 67,
    badge: "New",
    slug: "urban-gray-bomber",
  },
  {
    id: "5",
    name: "Burgundy Crewneck",
    price: 1799,
    originalPrice: 2299,
    image: sweaterBurgundy,
    rating: 4.6,
    reviews: 45,
    badge: null,
    slug: "burgundy-crewneck",
  },
  {
    id: "6",
    name: "Olive Cargo Pants",
    price: 2199,
    originalPrice: null,
    image: cargoOlive,
    rating: 4.8,
    reviews: 112,
    badge: "Trending",
    slug: "olive-cargo-pants",
  },
  {
    id: "7",
    name: "Classic Black Polo",
    price: 1299,
    originalPrice: 1699,
    image: poloBlack,
    rating: 4.7,
    reviews: 78,
    badge: null,
    slug: "classic-black-polo",
  },
  {
    id: "8",
    name: "Beige Denim Jacket",
    price: 3499,
    originalPrice: 4499,
    image: denimBeige,
    rating: 4.9,
    reviews: 34,
    badge: "Limited",
    slug: "beige-denim-jacket",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function FeaturedProducts() {
  const { addItem } = useCart();
  const { data: remoteProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: 1,
  });

  const productList =
    (remoteProducts as typeof products | undefined) ?? products;

  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="zeromade-container">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover our most popular styles
            </p>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productList.map((product) => (
            <div
              key={product.id}
              className="product-card group"
            >
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
                      })
                    }
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <Link
                  to={`/product/${product.slug}`}
                  className="font-medium hover:text-accent transition-colors"
                >
                  {product.name}
                </Link>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  <span className="text-sm font-medium">{product.rating}</span>
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

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/products">
            <Button variant="outline" className="w-full">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}