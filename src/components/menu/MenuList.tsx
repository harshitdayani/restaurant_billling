// components/menu/MenuList.tsx
import { useState } from "react";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuItem } from "../../types/menu";
const initialMenu: MenuItem[] = [
    { id: "1", name: "Margherita Pizza", price: 299, inStock: true },
    { id: "2", name: "Pasta Alfredo", price: 259, inStock: true },
    { id: "3", name: "Tiramisu", price: 199, inStock: false },
];
export function MenuList() {
    const [items] = useState(initialMenu);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((m) => (
                <MenuItemCard key={m.id} item={m} />
            ))}
        </div>
    );
} 