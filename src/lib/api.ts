const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? "" : "http://localhost:4000");

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorBody.error || "Login failed");
  }

  return res.json();
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorBody.error || "Registration failed");
  }

  return res.json();
}


export async function fetchProducts() {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  return (await res.json()) as unknown[];
  return (await res.json()) as unknown[];
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/api/categories`);
  if (!res.ok) {
    throw new Error("Failed to load categories");
  }
  return (await res.json()) as string[];
}

// Product Management Types & API
export interface ProductInput {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  slug: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
}

export interface ReviewInput {
  rating: number;
  comment: string;
}

export async function addProduct(product: ProductInput, token: string) {
  const res = await fetch(`${API_BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorBody.error || "Failed to add product");
  }

  return res.json();
}

export async function deleteProduct(id: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
}

export async function addReview(productId: string, review: ReviewInput, token: string) {
  const res = await fetch(`${API_BASE_URL}/api/products/${productId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });

  if (!res.ok) {
    throw new Error("Failed to submit review");
  }

  return res.json();
}

export interface OrderPayload {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
  payment?: {
    method?: string;
    status?: string;
  } | null;
}

export async function createOrder(payload: OrderPayload) {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorBody.error || "Failed to place order");
  }

  return res.json();
}

export async function fetchOrders(email: string) {
  const res = await fetch(`${API_BASE_URL}/api/orders?email=${encodeURIComponent(email)}`);
  if (!res.ok) {
    throw new Error("Failed to load orders");
  }
  return res.json();
}
