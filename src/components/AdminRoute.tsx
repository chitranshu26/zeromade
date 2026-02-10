import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function AdminRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
