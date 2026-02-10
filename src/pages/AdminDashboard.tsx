import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, addProduct, deleteProduct, ProductInput } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export default function AdminDashboard() {
    const { token } = useAuth();
    const queryClient = useQueryClient();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<ProductInput>({
        name: "",
        category: "",
        price: 0,
        image: "/placeholder.svg",
        slug: "",
        description: "",
    });

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    const addMutation = useMutation({
        mutationFn: (product: ProductInput) => addProduct(product, token || ""),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setIsAddOpen(false);
            toast.success("Product added successfully");
            setNewProduct({
                name: "",
                category: "",
                price: 0,
                image: "/placeholder.svg",
                slug: "",
                description: "",
            });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to add product");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteProduct(id, token || ""),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted");
        },
        onError: () => {
            toast.error("Failed to delete product");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.slug) {
            newProduct.slug = newProduct.name.toLowerCase().replace(/ /g, "-");
        }
        addMutation.mutate(newProduct);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 zeromade-container py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={newProduct.name}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={newProduct.category}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, category: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (₹)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                price: Number(e.target.value),
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={newProduct.image}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, image: e.target.value })
                                        }
                                        placeholder="/assets/products/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={newProduct.description || ""}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, description: e.target.value })
                                        }
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={addMutation.isPending}>
                                    {addMutation.isPending ? "Adding..." : "Add Product"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="border rounded-lg bg-card overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        Loading products...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                (products as any[])?.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-10 w-10 rounded object-cover"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>₹{product.price}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to delete this product?")) {
                                                        deleteMutation.mutate(product.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Footer />
        </div>
    );
}
