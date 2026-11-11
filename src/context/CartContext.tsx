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
  /** All items currently in the bag */
  items: CartItem[];
  /** Total unit count across all items */
  count: number;
  /** ID of the most-recently added product (clears after 2 s) */
  lastAdded: string | null;
  /** Whether the cart drawer is open */
  isOpen: boolean;

  addItem:    (id: string)              => void;
  removeItem: (id: string)              => void;
  /** Set qty to a specific value; removes item when qty ≤ 0 */
  updateQty:  (id: string, qty: number) => void;
  /** Empty the entire bag (called after a successful inquiry submission) */
  clearCart:  ()                        => void;
  setIsOpen:  (open: boolean)           => void;
}

const CartContext = createContext<CartContextType>({
  items:      [],
  count:      0,
  lastAdded:  null,
  isOpen:     false,
  addItem:    () => {},
  removeItem: () => {},
  updateQty:  () => {},
  clearCart:  () => {},
  setIsOpen:  () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items,     setItems]     = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [isOpen,    setIsOpen]    = useState(false);

  const addItem = useCallback((id: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      return existing
        ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id, qty: 1 }];
    });
    setLastAdded(id);
    setTimeout(() => setLastAdded(null), 2000);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = items.reduce((acc, i) => acc + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, lastAdded, isOpen, addItem, removeItem, updateQty, clearCart, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
