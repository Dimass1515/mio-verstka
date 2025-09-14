import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = { id: string; qty: number };

interface CartCtx {
  count: number;
  addItem: (id: string, qty?: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (id: string, qty: number = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found)
        return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { id, qty }];
    });
  };
  const clear = () => setItems([]);
  const count = items.reduce((sum, it) => sum + it.qty, 0);
  return (
    <CartContext.Provider value={{ count, addItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
