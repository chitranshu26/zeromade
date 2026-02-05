import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "T-Shirts", href: "/category/tshirts" },
  { name: "Hoodies", href: "/category/hoodies" },
  { name: "Jackets", href: "/category/jackets" },
  { name: "Pants", href: "/category/pants" },
  { name: "Sweaters", href: "/category/sweaters" },
  { name: "Accessories", href: "/category/accessories" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-primary">
        <div className="zeromade-container">
          <p className="py-2 text-center text-sm font-medium text-primary-foreground">
            Free shipping on orders over ₹999 ✨ Use code ZEROMADE20 for 20% off
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="zeromade-container">
        <div className="flex h-16 items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-display text-lg font-bold text-primary-foreground">
                Z
              </span>
            </div>
            <span className="hidden font-display text-xl font-bold sm:block">
              Zeromade
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 max-w-xl lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-11"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link to={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/customize">
              <Button variant="ghost" className="gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                AI Customize
              </Button>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
            </Link>

            <Link to="/orders">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Package className="h-5 w-5" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register">Sign Up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">My Orders</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t py-4 lg:hidden animate-fade-in">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input pl-11"
                />
              </div>
            </div>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/customize"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-accent hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="h-4 w-4" />
                AI Customize
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}