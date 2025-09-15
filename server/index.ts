import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { handleDemo } from "./routes/demo";
import { listProducts, getProduct } from "./routes/products";
import { getCart, upsertItem, patchItem, deleteItem, clearCart } from "./routes/cart";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      name: "session",
      secret: process.env.SESSION_SECRET || "dev-secret",
      sameSite: "lax",
      httpOnly: true,
    })
  );
  app.use((req, _res, next) => {
    if (!req.session) return next();
    if (!req.session.id) req.session.id = crypto.randomUUID();
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Products
  app.get("/api/products", listProducts);
  app.get("/api/products/:slug", getProduct);

  // Cart
  app.get("/api/cart", getCart);
  app.post("/api/cart/items", upsertItem);
  app.patch("/api/cart/items/:id", patchItem);
  app.delete("/api/cart/items/:id", deleteItem);
  app.post("/api/cart/clear", clearCart);

  return app;
}
