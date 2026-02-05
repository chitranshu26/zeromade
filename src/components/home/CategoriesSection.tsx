import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "T-Shirts",
    description: "Premium cotton essentials",
    href: "/category/tshirts",
    color: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "Hoodies",
    description: "Cozy & stylish comfort",
    href: "/category/hoodies",
    color: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
  },
  {
    name: "Jackets",
    description: "Statement outerwear",
    href: "/category/jackets",
    color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
  },
  {
    name: "Pants",
    description: "Perfect fit every time",
    href: "/category/pants",
    color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
  },
  {
    name: "Sweaters",
    description: "Warm & fashionable",
    href: "/category/sweaters",
    color: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
  },
  {
    name: "Custom",
    description: "Design your own",
    href: "/customize",
    color: "zeromade-accent-gradient",
    isSpecial: true,
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="zeromade-container">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Find your perfect style
            </p>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                category.isSpecial
                  ? "bg-primary text-primary-foreground"
                  : category.color
              }`}
            >
              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold">
                  {category.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    category.isSpecial
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {category.description}
                </p>
                <div
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${
                    category.isSpecial ? "text-accent" : ""
                  }`}
                >
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              {category.isSpecial && (
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}