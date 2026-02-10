import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Cart() {
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    subtotal,
    clearCart,
  } = useCart();
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
  });
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!cartItems.length || createOrderMutation.isPending) return;

    try {
      const order = await createOrderMutation.mutateAsync({
        items: cartItems,
        customer: null,
        payment: { method: "cod", status: "pending" },
      });
      toast.success("Order placed successfully", {
        description: `Your Zeromade order ID is ${order.id}`,
      });
      clearCart();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to place order";
      toast.error(message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="zeromade-container py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-2 font-display text-2xl font-bold">
              Your cart is empty
            </h1>
            <p className="mb-6 text-muted-foreground">
              Looks like you haven't added any items yet.
            </p>
            <Link to="/products">
              <Button className="btn-hero">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
          <span className="text-foreground">Cart</span>
        </nav>

        <h1 className="mb-8 font-display text-2xl font-bold lg:text-3xl">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border bg-card p-4 sm:p-6"
              >
                {/* Image */}
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-32 sm:w-32">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} • Color: {item.color}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:bg-secondary"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:bg-secondary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right">
                      <p className="font-display text-lg font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-1 text-sm text-destructive hover:underline"
                      >
                        <Trash2 className="inline h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="mb-4 font-display text-lg font-semibold">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-success">
                    ✓ You qualify for free shipping!
                  </p>
                )}
                <div className="flex justify-between border-t pt-3 text-base">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-xl font-bold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors focus:border-accent focus:outline-none"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Button
                className="mt-6 w-full btn-hero"
                onClick={handleCheckout}
                disabled={!cartItems.length || createOrderMutation.isPending}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link
                to="/products"
                className="mt-4 block text-center text-sm text-muted-foreground hover:text-foreground"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}