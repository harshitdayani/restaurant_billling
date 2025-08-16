import { useMemo } from "react";
import { QuantityInput } from "../common/QuantityInput";
import { useCart } from "../../context/CartContext";

export function CartSummary() {
    const { cart, dispatch } = useCart();

    const total = useMemo(
        () => cart.reduce((sum, i) => sum + i.price * i.qty, 0),
        [cart]
    );

    if (!cart.length) {
        return (
            <div id="cart" className="mt-2 rounded-xl bg-white p-4 text-sm text-gray-500 shadow-sm ring-1 ring-gray-100">
                Cart is empty.
            </div>
        );
    }

    return (
        <div id="cart" className="mt-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <h3 className="mb-3 font-semibold">Cart</h3>

            <ul className="max-h-[50vh] space-y-2 overflow-auto pr-1">
                {cart.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <div className="truncate">{i.name}</div>
                            <div className="text-xs text-gray-500">
                                ₹{i.price} × {i.qty}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <QuantityInput
                                value={i.qty}
                                onChange={(q) =>
                                    dispatch({ type: "SET_QTY", id: i.id, qty: q })
                                }
                            />
                            <button
                                onClick={() => dispatch({ type: "REMOVE", id: i.id })}
                                className="rounded-lg border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
                                aria-label={`Remove ${i.name}`}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-base font-semibold">₹{total}</span>
            </div>
        </div>
    );
}
