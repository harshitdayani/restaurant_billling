import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/layout/Navbar";
import { MenuList } from "./components/menu/MenuList";
import { CartSummary } from "./components/cart/CartSummary";

function App() {
    return (
        <CartProvider>
            <div className="max-w-6xl mx-auto p-6">
                <Navbar />
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <MenuList />
                    </div>
                    <CartSummary />
                </div>
            </div>
        </CartProvider>
    );
}

export default App;
