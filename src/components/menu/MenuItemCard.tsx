// components/menu/MenuItemCard.tsx
import type { MenuItem } from "../../types/menu";
export function MenuItemCard({ item }: { item: MenuItem }) {
    return (
        <div className="rounded-xl bg-white p-4 shadow">
            <div className="flex items-center justify-between">
                <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">₹{item.price}</div>
                </div>
                {!item.inStock && (
                    <span className="text-xs px-2 py-1 rounded bg-red-100 text-
red-700">Out of stock</span>
                )}
            </div>
            <button className="mt-3 w-full rounded-lg border p-2
disabled:opacity-50" disabled={!item.inStock}>
                Add to cart
            </button>
        </div>
    );
} 