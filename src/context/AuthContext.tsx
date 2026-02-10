import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { toast } from "sonner";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load from local storage on mount
        const storedToken = localStorage.getItem("zeromade_token");
        const storedUser = localStorage.getItem("zeromade_user");

        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data", e);
                localStorage.removeItem("zeromade_token");
                localStorage.removeItem("zeromade_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem("zeromade_token", newToken);
        localStorage.setItem("zeromade_user", JSON.stringify(newUser));
        toast.success("Welcome back!");
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("zeromade_token");
        localStorage.removeItem("zeromade_user");
        toast.info("Logged out successfully");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
