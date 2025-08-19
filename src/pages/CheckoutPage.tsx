import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartSummary } from "../components/cart/CartSummary";
import { CheckoutFormRHF } from "../components/cart/CheckoutFormRHF";
import { notifyInfo } from "../utils/toast";

export function CheckoutPage() {
  const { cart } = useCart();
  const hasItems = cart.length > 0;

  // one-time toast when navigating here with empty cart
  const notifiedRef = useRef(false);
  useEffect(() => {
    if (!hasItems && !notifiedRef.current) {
      notifyInfo("Your cart is empty", "Add items to proceed to checkout", { id: "empty-cart", once: true });
      notifiedRef.current = true;
    }
  }, [hasItems]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Review your cart and complete the order.</p>
        </header>

        {!hasItems ? (
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your cart is empty. Head back to the menu to add items.
            </p>
            <div className="mt-3">
              <Link to="/" className="btn btn-outline">← Back to Menu</Link>
            </div>
          </div>
        ) : (
          <>
            <CartSummary />
            <CheckoutFormRHF cart={cart} />
          </>
        )}
      </div>

      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-24 surface rounded-xl p-4">
          <h3 className="mb-2 font-semibold">Need help?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Verify quantities and special instructions before placing the order.
          </p>
          <div className="mt-3">
            <Link to="/" className="btn btn-outline w-full text-center">← Continue shopping</Link>
          </div>
        </div>
      </aside>
    </div>
  );
}