import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "quantity">,
    options?: { quantity?: number }
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "zeromade-cart";

function loadInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item?.id === "string") as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item, options) => {
    const quantity = options?.quantity ?? 1;
    setItems((current) => {
      const existingIndex = current.findIndex(
        (existing) =>
          existing.id === item.id &&
          existing.size === item.size &&
          existing.color === item.color
      );

      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [...current, { ...item, quantity }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (id, quantity) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart: CartContextValue["clearCart"] = () => {
    setItems([]);
  };

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

