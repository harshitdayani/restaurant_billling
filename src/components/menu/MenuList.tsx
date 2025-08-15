// import { useMemo, useState } from "react";
// import { MenuItemCard } from "./MenuItemCard";
// import type { MenuItem } from "../../types/menu";
// import { CategoryFilter } from "../common/CategoryFilter";
// import { SearchBox } from "../common/SearchBox";

// const initialMenu: MenuItem[] = [
//     { id: "1", name: "Margherita Pizza", price: 299, inStock: true, category: "Pizza" },
//     { id: "2", name: "Pasta Alfredo", price: 259, inStock: true, category: "Pasta" },
//     { id: "3", name: "Tiramisu", price: 199, inStock: false, category: "Dessert" },
//     { id: "4", name: "Pepperoni Pizza", price: 349, inStock: true, category: "Pizza" },
// ];

// export function MenuList() {
//     const [items] = useState(initialMenu);
//     const [selected, setSelected] = useState<string>("All");

//     // derive unique categories once from items
//     const categories = useMemo(
//         () => Array.from(new Set(items.map(i => i.category))).sort(),
//         [items]
//     );

//     // filter items based on selection
//     const [q, setQ] = useState(""); // search query for item names
//     const filtered = useMemo(() => {
//         const base = selected === "All" ? items : items.filter(i => i.category === selected);
//         const text = q.trim().toLowerCase();
//         return text ? base.filter(i => i.name.toLowerCase().includes(text)) : base;
//     }, [items, selected, q]);

//     return (
//         <div>
//             <SearchBox value={q} onChange={setQ} />

//             <CategoryFilter
//                 categories={categories}
//                 value={selected}
//                 onChange={setSelected}
//             />

//             {filtered.length === 0 ? (
//                 <p className="text-sm text-gray-500">No items found in “{selected}”.</p>
//             ) : (
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                     {filtered.map((m) => (
//                         <MenuItemCard key={m.id} item={m} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }



import { useMemo, useState } from "react";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuItem } from "../../types/menu";
import type { CartItem } from "../../types/cart";
import { CategoryFilter } from "../common/CategoryFilter";
import { QuantityInput } from "../common/QuantityInput";
import { SearchBox } from "../common/SearchBox";

const initialMenu: MenuItem[] = [
    { id: "1", name: "Margherita Pizza", price: 299, inStock: true, category: "Pizza" },
    { id: "2", name: "Pasta Alfredo", price: 259, inStock: true, category: "Pasta" },
    { id: "3", name: "Tiramisu", price: 199, inStock: false, category: "Dessert" },
    { id: "4", name: "Pepperoni Pizza", price: 349, inStock: true, category: "Pizza" },
];

// pure helpers: avoid duplicating state
function addToCart(items: CartItem[], item: MenuItem, qty: number): CartItem[] {
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
        return items.map((i) => (i.id === item.id ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
    }
    return [...items, { ...item, qty }];
}

function removeFromCart(items: CartItem[], id: string): CartItem[] {
    return items.filter((i) => i.id !== id);
}

function setQty(items: CartItem[], id: string, qty: number): CartItem[] {
    return items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i));
}

function total(items: CartItem[]) {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function MenuList() {
    const [items] = useState(initialMenu);
    const [selected, setSelected] = useState<string>("All");
    const [cart, setCart] = useState<CartItem[]>([]);

    const categories = useMemo(
        () => Array.from(new Set(items.map((i) => i.category))).sort(),
        [items]
    );

    const [q, setQ] = useState(""); // search query for item names

    const filtered = useMemo(() => {
        const base = selected === "All" ? items : items.filter(i => i.category === selected);
        const text = q.trim().toLowerCase();
        return text ? base.filter(i => i.name.toLowerCase().includes(text)) : base;
    }, [items, selected, q]);

    const grandTotal = useMemo(() => total(cart), [cart]);

    return (
        <div>
            <SearchBox value={q} onChange={setQ} />
            <CategoryFilter categories={categories} value={selected} onChange={setSelected} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filtered.map((m) => (
                    <MenuItemCard
                        key={m.id}
                        item={m}
                        onAdd={(item, qty) => setCart((prev) => addToCart(prev, item, qty))}
                    />
                ))}
            </div>

            <CartSummary
                items={cart}
                onRemove={(id) => setCart((prev) => removeFromCart(prev, id))}
                onSetQty={(id, qty) => setCart((prev) => setQty(prev, id, qty))}
                total={grandTotal}
            />
        </div>
    );
}

function CartSummary({
    items,
    onRemove,
    onSetQty,
    total,
}: {
    items: CartItem[];
    onRemove: (id: string) => void;
    onSetQty: (id: string, qty: number) => void;
    total: number;
}) {
    if (!items.length) return (
        <div className="mt-8 text-sm text-gray-500">Cart is empty.</div>
    );

    return (
        <div className="mt-8 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <h3 className="mb-3 font-semibold">Cart</h3>
            <ul className="space-y-2">
                {items.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <div className="truncate">{i.name}</div>
                            <div className="text-xs text-gray-500">₹{i.price} × {i.qty}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <QuantityInput value={i.qty} onChange={(q) => onSetQty(i.id, q)} />
                            <button
                                onClick={() => onRemove(i.id)}
                                className="rounded-lg border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
                                aria-label={`Remove ${i.name}`}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-base font-semibold">₹{total}</span>
            </div>
        </div>
    );
}
