import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { fetchOrders } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchOrders(user.email)
                .then(setOrders)
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 zeromade-container py-8">
                <h1 className="text-2xl font-bold mb-6 font-display">My Orders</h1>

                {loading ? (
                    <div className="text-center py-12">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-6">
                            You haven't placed any orders yet. Start shopping!
                        </p>
                        <Button asChild>
                            <Link to="/products">Browse Products</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="border rounded-lg bg-card overflow-hidden">
                                <div className="bg-secondary/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order ID</p>
                                        <p className="font-medium font-mono text-sm">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-medium">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total</p>
                                        <p className="font-medium">₹{order.total}</p>
                                    </div>
                                    <div>
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize bg-primary text-primary-foreground">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-16 w-16 bg-secondary rounded overflow-hidden">
                                                        {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Qty: {item.quantity} {item.size && `• Size: ${item.size}`} {item.color && `• ${item.color}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="font-medium">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
