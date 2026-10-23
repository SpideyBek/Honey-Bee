"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface CartItem {
  id: string;
  qty: number;
}

interface CartContextType {
  count: number;
  items: CartItem[];
  addItem: (id: string) => void;
  lastAdded: string | null;
}

const CartContext = createContext<CartContextType>({
  count: 0,
  items: [],
  addItem: () => {},
  lastAdded: null,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const addItem = useCallback((id: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id, qty: 1 }];
    });
    setLastAdded(id);
    // Clear lastAdded flash after 2 s
    setTimeout(() => setLastAdded(null), 2000);
  }, []);

  const count = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <CartContext.Provider value={{ count, items, addItem, lastAdded }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
