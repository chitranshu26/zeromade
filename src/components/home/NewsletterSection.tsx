import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thanks for subscribing! Check your email for 15% off.");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="border-y bg-secondary/30 py-16 lg:py-20">
      <div className="zeromade-container">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <Sparkles className="h-7 w-7 text-accent" />
          </div>

          {/* Content */}
          <h2 className="mb-3 font-display text-2xl font-bold lg:text-3xl">
            Get 15% Off Your First Order
          </h2>
          <p className="mb-8 text-muted-foreground">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            style tips.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex gap-3 sm:mx-auto sm:max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? (
                <span className="animate-spin">○</span>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}