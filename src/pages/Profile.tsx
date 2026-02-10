import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 zeromade-container py-8">
                <h1 className="text-2xl font-bold mb-6 font-display">My Account</h1>
                <div className="bg-card border rounded-lg p-6 max-w-2xl">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium text-lg">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Email Address</p>
                            <p className="font-medium text-lg">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Role</p>
                            <p className="font-medium uppercase text-sm tracking-wide bg-secondary inline-block px-2 py-1 rounded mt-1">
                                {user?.role || "Customer"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
