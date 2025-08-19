// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Navbar } from "./components/layout/Navbar";
// import { CartTitleEffect } from "./components/cart/CartTitleEffect"; // optional

// Pages
import { MenuPage } from "./pages/MenuPages";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useCart } from "./context/CartContext";
import { useEffect, useRef } from "react";
import { CartSummary } from "./components/cart/CartSummary";
import { AnimatePresence, motion } from "framer-motion";
import { CheckoutForm } from "./components/cart/CheckoutForm";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Optional: reflect cart count in the document title */}
      {/* <CartTitleEffect /> */}

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global themed toaster (transparent shell; custom cards render their own theme) */}
      <Toaster
        position="top-right"
        gutter={10}
        containerClassName="pointer-events-none"
        toastOptions={{
          duration: 2200,
          style: { background: "transparent", boxShadow: "none", padding: 0 },
        }}
      />
    </div>
  );
}

/** Right sidebar with sticky Cart + animated Checkout mount and a11y focus */
// function RightSidebar() {
//   const { cart } = useCart();
//   const hasItems = cart.length > 0;

//   // Respect reduced-motion preference
//   const prefersReduced =
//     typeof window !== "undefined" &&
//     window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

//   // Focus the Checkout container when it appears
//   const checkoutRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (hasItems) {
//       checkoutRef.current?.focus();
//     }
//   }, [hasItems]);

//   return (
//     <aside className="lg:col-span-1">
//       <div className="lg:sticky lg:top-24 space-y-6">
//         <CartSummary />

//         <AnimatePresence initial={false} mode="wait">
//           {hasItems ? (
//             <motion.div
//               key="checkout"
//               ref={checkoutRef}
//               tabIndex={-1}
//               role="region"
//               aria-label="Checkout form"
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 16 }}
//               transition={
//                 prefersReduced ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }
//               }
//             >
//               <CheckoutForm />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="hint"
//               className="surface-muted rounded-xl p-4 text-sm shadow-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={prefersReduced ? { duration: 0 } : { duration: 0.15 }}
//             >
//               Add items to your cart to start checkout.
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </aside>
//   );
// }