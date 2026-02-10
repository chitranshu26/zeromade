import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, addReview, ReviewInput } from "@/lib/api"; // We'll assume fetchProducts can filter or we fetch all and find one, or update api to fetch one
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Helper to fetch single product - we can reuse fetchProducts and find, or add a specific function
// For now, let's just fetch all and find on client side to keep it simple, 
// OR better, let's update api.ts to have fetchProductBySlug. 
// Actually, let's just use fetchProducts and find it here for simplicity unless it's too heavy.
// But wait, we added router.get("/products/:id") which accepts slug.
// Let's allow fetching by URL.

async function fetchProductBySlug(slug: string) {
    // We can use the existing /api/products/:id endpoint
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "" : "http://localhost:4000");
    const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
    if (!res.ok) {
        throw new Error("Product not found");
    }
    return res.json();
}

export default function ProductDetails() {
    const { slug } = useParams();
    const { user } = useAuth();
    const { addItem } = useCart();
    const queryClient = useQueryClient();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => fetchProductBySlug(slug!),
        enabled: !!slug,
    });

    const reviewMutation = useMutation({
        mutationFn: (review: ReviewInput) => addReview(product.id, review, localStorage.getItem("token") || ""),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product", slug] });
            toast.success("Review submitted!");
            setComment("");
            setRating(5);
        },
        onError: (err) => {
            toast.error("Failed to submit review");
        },
    });

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to review");
            return;
        }
        reviewMutation.mutate({ rating, comment });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">Loading...</div>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <p>Product not found</p>
                    <Button asChild><Link to="/products">Back to Products</Link></Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 zeromade-container py-8">
                <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </Link>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <div className="aspect-square bg-secondary rounded-xl overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        {product.badge && (
                            <Badge className="absolute top-4 left-4 text-base px-3 py-1">
                                {product.badge}
                            </Badge>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="text-4xl font-display font-bold mb-2">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating || 0) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                                ))}
                            </div>
                            <span className="text-muted-foreground">({product.reviews || 0} reviews)</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                            )}
                        </div>

                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            {product.description || "No description available for this product."}
                        </p>

                        <div className="space-y-6 mb-8">
                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">Colors</h3>
                                    <div className="flex gap-2">
                                        {product.colors.map((color: string) => (
                                            <Button key={color} variant="outline" className="h-10 px-4 min-w-[80px] hover:border-primary hover:text-primary transition-colors">
                                                {color}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">Sizes</h3>
                                    <div className="flex gap-2">
                                        {product.sizes.map((size: string) => (
                                            <Button key={size} variant="outline" className="h-10 w-10 p-0 hover:border-primary hover:text-primary transition-colors">
                                                {size}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button size="lg" className="w-full md:w-auto min-w-[200px]" onClick={() => addItem(product)}>
                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                        </Button>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-display font-bold mb-8">Customer Reviews</h2>

                    {/* Add Review Form */}
                    <div className="bg-card border rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                        {user ? (
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Rating</label>
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setRating(i + 1)}
                                                className={`focus:outline-none transition-colors ${i < rating ? "text-primary" : "text-muted-foreground"}`}
                                            >
                                                <Star className={`h-6 w-6 ${i < rating ? "fill-current" : ""}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Comment</label>
                                    <Textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Share your thoughts about this product..."
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={reviewMutation.isPending}>
                                    {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center py-6 bg-secondary/30 rounded">
                                <p className="text-muted-foreground mb-4">Please log in to write a review.</p>
                                <Button asChild variant="outline"><Link to="/login">Login</Link></Button>
                            </div>
                        )}
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {product.reviewsList && product.reviewsList.length > 0 ? (
                            product.reviewsList.slice().reverse().map((review: any) => (
                                <div key={review.id} className="border-b pb-6 last:border-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{review.userName || "Anonymous"}</span>
                                            <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
