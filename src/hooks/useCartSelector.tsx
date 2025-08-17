import { useMemo } from "react";
import { useCart } from "../context/CartContext";

export function useCartSelector<T>(selector: (state: ReturnType<typeof useCart>["cart"]) => T) {
    const { cart } = useCart();
    return useMemo(() => selector(cart), [cart, selector]);
}