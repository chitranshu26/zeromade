import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="zeromade-container relative z-10">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl animate-fade-in-up">
            Zeromade –{" "}
            <span className="zeromade-text-gradient">Apna Time, Apna Design</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-primary-foreground/80 sm:text-xl animate-fade-in-up animation-delay-200">
            Custom and pre-designed clothing made just for you. Premium streetwear,
            hoodies, T-shirts and more with an Indian street culture soul.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
            <Link to="/products">
              <Button size="lg" className="btn-hero">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/customize">
              <Button size="lg" className="btn-hero-outline">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Designing
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8 animate-fade-in-up animation-delay-600">
            <div>
              <p className="font-display text-3xl font-bold text-primary-foreground">
                50K+
              </p>
              <p className="text-sm text-primary-foreground/60">
                Happy Customers
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary-foreground">
                100+
              </p>
              <p className="text-sm text-primary-foreground/60">
                Unique Designs
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-primary-foreground">
                4.9★
              </p>
              <p className="text-sm text-primary-foreground/60">
                Customer Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute right-10 top-1/4 hidden h-64 w-64 rounded-full bg-accent/20 blur-3xl lg:block animate-float" />
      <div className="absolute right-1/4 bottom-1/4 hidden h-48 w-48 rounded-full bg-accent/10 blur-2xl lg:block animate-float animation-delay-200" />
    </section>
  );
}