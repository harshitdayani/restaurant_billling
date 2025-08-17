import { useMemo } from "react";
import { QuantityInput } from "../common/QuantityInput";
import { useCart } from "../../context/CartContext";

export function CartSummary() {
    const { cart, dispatch } = useCart();
    const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

    if (!cart.length) {
        return (
            <div id="cart" className="surface-muted rounded-xl p-4 text-sm shadow-sm">
                Cart is empty.
            </div>
        );
    }

    return (
        <div id="cart" className="card">
            <h3 className="mb-3 font-semibold">Cart</h3>

            <ul className="max-h-[50vh] space-y-2 overflow-auto pr-1">
                {cart.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <div className="truncate">{i.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                ₹{i.price} × {i.qty}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <QuantityInput value={i.qty} onChange={(q) => dispatch({ type: "SET_QTY", id: i.id, qty: q })} />
                            <button
                                onClick={() => dispatch({ type: "REMOVE", id: i.id })}
                                className="btn btn-outline text-xs px-2 py-1"
                                aria-label={`Remove ${i.name}`}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t pt-3 border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total</span>
                <span className="text-base font-semibold">₹{total}</span>
            </div>
        </div>
    );
}
