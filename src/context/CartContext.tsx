import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { CartItem } from "../types/cart";
import type { MenuItem } from "../types/menu";

type CartAction =
    | { type: "ADD"; item: MenuItem; qty: number }
    | { type: "REMOVE"; id: string; }
    | { type: "SET_QTY"; id: string; qty: number };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case "ADD": {
            const existing = state.find((i) => i.id === action.item.id);
            if (existing) {
                return state.map((i) =>
                    i.id === action.item.id ? {
                        ...i, qty: Math.min(99, i.qty + action.qty)
                    } : i
                );
            }
            return [...state, { ...action.item, qty: action.qty }];
        }
        case "REMOVE":
            return state.filter((i) => i.id !== action.id);
        case "SET_QTY":
            return state.map((i) =>
                i.id === action.id ? { ...i, qty: Math.max(1, Math.min(99, action.qty)) } : i);
        default:
            return state;
    }

}

// Context Setup
const CartContext = createContext<{
    cart: CartItem[];
    dispatch: React.Dispatch<CartAction>;
}>({ cart: [], dispatch: () => { } });

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, []);
    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}