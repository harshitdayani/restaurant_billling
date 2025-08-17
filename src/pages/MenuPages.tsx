import { Link } from "react-router-dom";
import { MenuList } from "../components/menu/MenuList";
import { CartSummary } from "../components/cart/CartSummary";

export function MenuPage() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <header className="mb-4">
                    <h1 className="text-2xl font-bold">Restaurant Billing</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Browse the menu and add items to your cart.
                    </p>
                </header>

                <MenuList />
            </div>

            <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-4">
                    <CartSummary />
                    <Link to="/checkout" className="btn btn-solid w-full text-center">
                        Go to Checkout →
                    </Link>
                </div>
            </aside>
        </div>
    );
}
