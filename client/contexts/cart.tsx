import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from "react";
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

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", { credentials: "include" });
      if (res.ok) {
        const data: CartDTO = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      await refresh();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }, [refresh]);

  const updateItem = useCallback(async (id: string, quantity: number) => {
    try {
      await fetch(`/api/cart/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });
      await refresh();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  }, [refresh]);

  const removeItem = useCallback(async (id: string) => {
    try {
      await fetch(`/api/cart/items/${id}`, { method: "DELETE", credentials: "include" });
      await refresh();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  }, [refresh]);

  const clear = useCallback(async () => {
    try {
      await fetch("/api/cart/clear", { method: "POST", credentials: "include" });
      await refresh();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }, [refresh]);

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
