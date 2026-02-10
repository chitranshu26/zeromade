import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { createZeromadeRouter } from "./zeromade-router.js";

import rateLimit from "express-rate-limit";
import hpp from "hpp";
import xss from "xss-clean";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT) || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Security Middleware
// Rate limiting to prevent DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use("/api", limiter);

// Prevent Parameter Pollution
app.use(hpp());

// Data Sanitization against XSS
app.use(xss());

app.use(
  cors({
    origin: NODE_ENV === "development" ? "http://localhost:5173" : undefined,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "10kb" })); // Body limit
app.use(morgan("dev"));

// API routes
app.use("/api", createZeromadeRouter());

// Serve static frontend in production
if (NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Zeromade API server listening on port ${PORT}`);
});

