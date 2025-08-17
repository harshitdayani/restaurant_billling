import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Active link styling helper
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
    ].join(" ");

  return (
    <header className="bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm dark:bg-gray-900/80 dark:border-gray-800">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          🍽️ RestoBill
        </Link>

        {/* Nav links + actions */}
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Menu
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            Orders
          </NavLink>

          <NavLink to="/checkout" className={linkClass}>
            <span className="mr-2">Checkout</span>
            <span
              className="inline-flex min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-[11px] font-medium leading-5 text-white dark:bg-gray-100 dark:text-gray-900"
              aria-label={`Items in cart: ${itemCount}`}
            >
              {itemCount}
            </span>
          </NavLink>

          <span className="hidden sm:inline rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">
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
