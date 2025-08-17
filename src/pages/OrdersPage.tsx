import { Link } from "react-router-dom";

export function OrdersPage() {
    // Placeholder — later we’ll fetch orders and list them here.
    return (
        <div className="space-y-4">
            <header>
                <h1 className="text-2xl font-bold">Orders</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    View recent orders and their statuses.
                </p>
            </header>

            <div className="card">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    No orders yet. Place an order from the menu.
                </p>
                <div className="mt-3">
                    <Link to="/" className="btn btn-outline">
                        ← Back to Menu
                    </Link>
                </div>
            </div>
        </div>
    );
}
