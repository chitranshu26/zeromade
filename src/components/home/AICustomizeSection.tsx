import { Link } from "react-router-dom";
import {
  Sparkles,
  Ruler,
  Palette,
  Shirt,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Ruler,
    title: "Perfect Measurements",
    description: "Input your body measurements for a tailored fit",
  },
  {
    icon: Palette,
    title: "Custom Colors",
    description: "Choose from thousands of color combinations",
  },
  {
    icon: Shirt,
    title: "Unique Designs",
    description: "Upload your own designs or let AI create for you",
  },
  {
    icon: Wand2,
    title: "AI Avatar Preview",
    description: "See how clothes look on your virtual avatar",
  },
];

export function AICustomizeSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 zeromade-hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(187,100%,42%,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsla(187,100%,42%,0.1),transparent_50%)]" />

      <div className="zeromade-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              AI Design Studio
            </div>
            <h2 className="mb-6 font-display text-3xl font-bold text-primary-foreground lg:text-4xl">
              Create Your Perfect Outfit with{" "}
              <span className="zeromade-text-gradient">AI Technology</span>
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/70">
              Our revolutionary AI customization engine lets you design unique
              clothing that fits your body perfectly. No more sizing issues, no
              more compromises.
            </p>

            <div className="mb-8 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                    <feature.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-primary-foreground/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/customize">
              <Button size="lg" className="btn-hero">
                Start Customizing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl border border-accent/20 bg-gradient-to-br from-primary-foreground/5 to-transparent p-8 backdrop-blur-sm">
              {/* Mock AI Interface */}
              <div className="h-full rounded-2xl bg-primary-foreground/5 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <div className="h-3 w-3 rounded-full bg-warning" />
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-primary-foreground/10" />
                  <div className="h-4 w-1/2 rounded bg-primary-foreground/10" />
                  <div className="mt-8 flex gap-4">
                    <div className="h-24 w-24 rounded-xl bg-primary-foreground/10 animate-pulse" />
                    <div className="h-24 w-24 rounded-xl bg-primary-foreground/10 animate-pulse animation-delay-200" />
                    <div className="h-24 w-24 rounded-xl bg-accent/30 animate-pulse animation-delay-400" />
                  </div>
                  <div className="mt-4 h-32 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 animate-pulse" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-8 w-20 rounded-full bg-accent/30" />
                    <div className="h-8 w-20 rounded-full bg-primary-foreground/10" />
                    <div className="h-8 w-20 rounded-full bg-primary-foreground/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}