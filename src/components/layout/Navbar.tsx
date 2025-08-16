import { useCart } from "../../context/CartContext";

export function Navbar() {
  const { cart } = useCart();

  // total items in cart (sum of qty)
  const itemCount = cart.reduce((n, i) => n + i.qty, 0);
  // (optional) quick total amount
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <header className="bg-white/70 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="text-lg font-semibold">RBilling</a>

        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="rounded px-3 py-2 hover:bg-gray-100">Home</a>
          <a href="/menu" className="rounded px-3 py-2 hover:bg-gray-100">Menu</a>

          {/* Scroll to the cart sidebar on the page */}
          <a href="#cart" className="relative rounded px-3 py-2 hover:bg-gray-100">
            <span className="mr-2">Cart</span>
            <span
              className="inline-flex min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-[11px] font-medium leading-5 text-white"
              aria-label={`Items in cart: ${itemCount}`}
            >
              {itemCount}
            </span>
          </a>

          {/* Optional: show quick total on larger screens */}
          <span className="hidden rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 sm:inline">
            ₹{total}
          </span>
        </nav>
      </div>
    </header>
  );
}
