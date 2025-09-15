import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { CartDTO } from "@shared/api";

interface CartCtx {
  cart: CartDTO | null;
  count: number;
  totalCents: number;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartDTO | null>(null);

  const refresh = async () => {
    const res = await fetch("/api/cart", { credentials: "include" });
    const data: CartDTO = await res.json();
    setCart(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const addItem = async (productId: string, quantity: number = 1) => {
    await fetch("/api/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });
    await refresh();
  };

  const updateItem = async (id: string, quantity: number) => {
    await fetch(`/api/cart/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ quantity }),
    });
    await refresh();
  };

  const removeItem = async (id: string) => {
    await fetch(`/api/cart/items/${id}`, { method: "DELETE", credentials: "include" });
    await refresh();
  };

  const clear = async () => {
    await fetch("/api/cart/clear", { method: "POST", credentials: "include" });
    await refresh();
  };

  const count = useMemo(() => cart?.items?.reduce((s, it) => s + it.quantity, 0) ?? 0, [cart]);
  const totalCents = useMemo(
    () => cart?.items?.reduce((sum, it) => sum + (it.product?.priceCents ?? 0) * it.quantity, 0) ?? 0,
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, count, totalCents, addItem, updateItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
