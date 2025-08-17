import { createContext, useContext, useRef } from "react";
import type { MenuItem } from "../types/menu";
import type { CartItem } from "../types/cart";
import { usePersistentReducer } from "../hooks/usePersistentReducer";
import { notifyError, notifyInfo, notifySuccess } from "../utils/toast";

/** Actions */
export type CartAction =
  | { type: "ADD"; item: MenuItem; qty: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number };

/** Pure reducer */
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id
            ? { ...i, qty: Math.min(99, i.qty + action.qty) }
            : i
        );
      }
      return [...state, { ...action.item, qty: action.qty }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "SET_QTY":
      return state.map((i) =>
        i.id === action.id
          ? { ...i, qty: Math.max(1, Math.min(99, action.qty)) }
          : i
      );
    default:
      return state;
  }
}

/** Context */
const CartContext = createContext<{
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}>({
  cart: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, rawDispatch] = usePersistentReducer(cartReducer, [], "rbilling:cart");

  // Debounce for SET_QTY (per item)
  const debounceMs = 350;
  const qtyTimersRef = useRef<Record<string, number>>({});
  const qtyPendingRef = useRef<Record<string, { name: string; nextQty: number; prevQty: number }>>({});

  const dispatch: React.Dispatch<CartAction> = (action) => {
    if (action.type === "ADD") {
      const existing = cart.find((i) => i.id === action.item.id);
      if (existing) {
        const nextQty = Math.min(99, existing.qty + action.qty);
        notifySuccess("Quantity updated", `${action.item.name} → ${nextQty}`);
      } else {
        notifySuccess("Added to cart", `${action.item.name} × ${action.qty}`);
      }
    } else if (action.type === "REMOVE") {
      const removed = cart.find((i) => i.id === action.id);
      notifyError(removed ? "Removed from cart" : "Item removed", removed?.name);
    } else if (action.type === "SET_QTY") {
      const item = cart.find((i) => i.id === action.id);
      if (item) {
        // Save latest desired qty for this item
        qtyPendingRef.current[action.id] = {
          name: item.name,
          nextQty: action.qty,
          prevQty: item.qty,
        };

        // Reset timer
        const existingTimer = qtyTimersRef.current[action.id];
        if (existingTimer) clearTimeout(existingTimer);

        qtyTimersRef.current[action.id] = window.setTimeout(() => {
          const pending = qtyPendingRef.current[action.id];
          if (pending) {
            const { name, nextQty, prevQty } = pending;
            if (nextQty > prevQty) {
              notifySuccess("Quantity increased", `${name} → ${nextQty}`);
            } else if (nextQty < prevQty) {
              notifyInfo("Quantity decreased", `${name} → ${nextQty}`);
            } else {
              notifyInfo("Quantity unchanged", name);
            }
            delete qtyPendingRef.current[action.id];
            delete qtyTimersRef.current[action.id];
          }
        }, debounceMs);
      }
    }

    rawDispatch(action);
  };

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
