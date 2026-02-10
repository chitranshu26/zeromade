import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { readData, writeData, ensureSeedData } from "./zeromade-store.js";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-in-production";
const JWT_EXPIRES_IN = "7d";

// Zod Schemas
const ProductSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().min(0),
  image: z.string().url(),
  slug: z.string().min(1),
  description: z.string().optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
});

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function createZeromadeRouter() {
  const router = express.Router();

  // Ensure we have initial data
  ensureSeedData();

  // Middleware
  const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

  const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admin access required" });
    }
    next();
  };

  router.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "zeromade-api" });
  });

  // Products
  router.get("/products", (_req, res) => {
    const data = readData();
    res.json(data.products);
  });

  router.get("/products/:id", (req, res) => {
    const data = readData();
    const product = data.products.find(
      (p) => p.id === req.params.id || p.slug === req.params.id
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  });

  router.get("/categories", (_req, res) => {
    const data = readData();
    const categories = [...new Set(data.products.map((p) => p.category))];
    res.json(categories);
  });

  // Admin: Add Product
  router.post("/products", authenticate, isAdmin, (req, res) => {
    const validation = ProductSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const data = readData();
    const newProduct = {
      id: `prod_${Date.now()}`,
      ...validation.data,
      rating: 0,
      reviews: 0,
      reviewsList: [],
    };

    data.products.push(newProduct);
    writeData(data);
    res.status(201).json(newProduct);
  });

  // Admin: Delete Product
  router.delete("/products/:id", authenticate, isAdmin, (req, res) => {
    const data = readData();
    const index = data.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    data.products.splice(index, 1);
    writeData(data);
    res.status(200).json({ message: "Product deleted" });
  });

  // User: Add Review
  router.post("/products/:id/reviews", authenticate, (req, res) => {
    const validation = ReviewSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const data = readData();
    const product = data.products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const review = {
      id: `rev_${Date.now()}`,
      userId: req.user.sub,
      userName: req.user.email, // Or fetch name
      ...validation.data,
      date: new Date().toISOString(),
    };

    if (!product.reviewsList) product.reviewsList = [];
    product.reviewsList.push(review);

    // Recalculate rating
    const totalRating = product.reviewsList.reduce((sum, r) => sum + r.rating, 0);
    product.reviews = product.reviewsList.length;
    product.rating = Number((totalRating / product.reviews).toFixed(1));

    writeData(data);
    res.status(201).json(review);
  });

  // Auth
  router.post("/auth/register", (req, res) => {
    const validation = RegisterSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }
    const { name, email, password } = validation.data;

    const data = readData();
    const existing = data.users.find(
      (user) => user.email.toLowerCase() === String(email).toLowerCase()
    );
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const id = `user_${Date.now()}`;
    const passwordHash = bcrypt.hashSync(String(password), 10);

    // First user is admin automatically for demo purposes, or check a secret
    const isFirstUser = data.users.length === 0;
    const role = isFirstUser || email.includes("admin") ? "admin" : "customer";

    const user = {
      id,
      name: name || "Zeromade Customer",
      email,
      passwordHash,
      role, // Assign role
      createdAt: new Date().toISOString(),
    };

    data.users.push(user);
    writeData(data);

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  });

  router.post("/auth/login", (req, res) => {
    const validation = LoginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const { email, password } = validation.data;

    const data = readData();
    const user = data.users.find(
      (u) => u.email.toLowerCase() === String(email).toLowerCase()
    );
    if (!user || !bcrypt.compareSync(String(password), user.passwordHash)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken(user);
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  });

  // Orders
  router.post("/orders", (req, res) => {
    const { items, customer, payment } = req.body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item" });
    }

    const data = readData();
    const id = `order_${Date.now()}`;
    const subtotal = items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    const order = {
      id,
      items,
      customer: customer || null,
      payment: payment || { status: "pending" },
      subtotal,
      shipping,
      total,
      status: "created",
      createdAt: new Date().toISOString(),
    };

    data.orders.push(order);
    writeData(data);

    return res.status(201).json(order);
  });

  router.get("/orders", (req, res) => {
    const { email } = req.query;
    const data = readData();
    if (email) {
      const userOrders = data.orders.filter(
        (o) => o.customer?.email === String(email)
      );
      return res.json(userOrders);
    }
    res.json(data.orders);
  });

  router.get("/orders/:id", (req, res) => {
    const data = readData();
    const order = data.orders.find((o) => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json(order);
  });

  return router;
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role, // Ensure role is in token
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

