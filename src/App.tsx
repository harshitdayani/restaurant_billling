import { CartProvider, useCart } from "./context/CartContext";
import { Navbar } from "./components/layout/Navbar";
import { MenuList } from "./components/menu/MenuList";
import { CartSummary } from "./components/cart/CartSummary";
import { CheckoutForm } from "./components/cart/CheckoutForm";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function App() {
    return (
        <CartProvider>
            <div className="mx-auto max-w-6xl p-6">
                <Navbar />

                {/* Page layout: Menu (left) + Cart + Checkout (right) */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <MenuList />
                    </div>
                    <RightSidebar />
                </div>
            </div>
        </CartProvider>
    );
}

/** Right sidebar with sticky Cart + animated Checkout mount */
function RightSidebar() {
  const { cart } = useCart();
  const hasItems = cart.length > 0;

  // 👇 Add this near the top
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const checkoutRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hasItems) {
      checkoutRef.current?.focus();
    }
  }, [hasItems]);

  return (
    <aside className="lg:col-span-1">
      <div className="lg:sticky lg:top-24 space-y-6">
        <CartSummary />

        <AnimatePresence initial={false} mode="wait">
          {hasItems ? (
            <motion.div
              key="checkout"
              ref={checkoutRef}
              tabIndex={-1}
              role="region"
              aria-label="Checkout form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.2, ease: "easeOut" }
              }
            >
              <CheckoutForm />
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              className="surface-muted rounded-xl p-4 text-sm shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.15 }}
            >
              Add items to your cart to start checkout.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}