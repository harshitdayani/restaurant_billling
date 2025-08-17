import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/layout/Navbar";
import { MenuList } from "./components/menu/MenuList";
import { CartSummary } from "./components/cart/CartSummary";

export default function App() {
    return (
        <CartProvider>
            <div className="mx-auto max-w-6xl p-6">
                <Navbar />

                {/* Page layout: Menu (left) + Cart (right) */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <MenuList />
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24">
                            <CartSummary />
                        </div>
                    </aside>
                </div>
            </div>
        </CartProvider>
    );
}