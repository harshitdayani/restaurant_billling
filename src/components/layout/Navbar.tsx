import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((n, i) => n + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Persisted theme
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("rbilling:darkMode", false);

  // Apply/remove the 'dark' class on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="bg-white/70 backdrop-blur shadow-sm dark:bg-gray-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="text-lg font-semibold dark:text-gray-100">RBilling</a>

        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200">Home</a>
          <a href="/menu" className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200">Menu</a>

          <a href="#cart" className="relative rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200">
            <span className="mr-2">Cart</span>
            <span
              className="inline-flex min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-[11px] font-medium leading-5 text-white dark:bg-gray-100 dark:text-gray-900"
              aria-label={`Items in cart: ${itemCount}`}
            >
              {itemCount}
            </span>
          </a>

          <span className="hidden rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200 sm:inline">
            ₹{total}
          </span>

          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode((v) => !v)}
            className="ml-2 rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-pressed={darkMode}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>
      </div>
    </header>
  );
}
