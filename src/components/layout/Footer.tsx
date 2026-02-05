import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="zeromade-container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <span className="font-display text-lg font-bold text-accent-foreground">
                  Z
                </span>
              </div>
              <span className="font-display text-xl font-bold">Zeromade</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              AI-powered custom clothing designed just for you. Create unique
              fashion that fits your body and style perfectly.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-full bg-primary-foreground/10 p-2 transition-colors hover:bg-primary-foreground/20"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-display font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/products" className="hover:text-primary-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/customize" className="hover:text-primary-foreground">
                  AI Customize
                </Link>
              </li>
              <li>
                <Link
                  to="/category/new"
                  className="hover:text-primary-foreground"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/category/bestsellers"
                  className="hover:text-primary-foreground"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/category/sale"
                  className="hover:text-primary-foreground"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 font-display font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/contact" className="hover:text-primary-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary-foreground">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary-foreground">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="hover:text-primary-foreground"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-display font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                support@zeromade.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                +91 1800-123-4567
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                123 Fashion Street, Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-primary-foreground/60 md:flex-row">
            <p>© 2026 Zeromade. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}