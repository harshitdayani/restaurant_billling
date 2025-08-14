import { Navbar } from "./components/layout/Navbar";
import { MenuList } from "./components/menu/MenuList";
export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-5xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Restaurant Billing</h1>
                <MenuList />
            </main>
        </div>
    );
}