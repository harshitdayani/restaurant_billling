import { useMemo, useState } from "react";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuItem } from "../../types/menu";
import { CategoryFilter } from "../common/CategoryFilter";
import { SearchBox } from "../common/SearchBox";

/** ---- Sample data (replace with API later) ---- */
const initialMenu: MenuItem[] = [
    { id: "1", name: "Margherita Pizza", price: 299, inStock: true, category: "Pizza" },
    { id: "2", name: "Pasta Alfredo", price: 259, inStock: true, category: "Pasta" },
    { id: "3", name: "Tiramisu", price: 199, inStock: false, category: "Dessert" },
    { id: "4", name: "Pepperoni Pizza", price: 349, inStock: true, category: "Pizza" },
];

export function MenuList() {
    const [items] = useState(initialMenu);
    const [selected, setSelected] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    // unique categories derived from items
    const categories = useMemo(
        () => Array.from(new Set(items.map((i) => i.category))).sort(),
        [items]
    );

    // filter by selected category
    const filtered = useMemo(() => {
        let result = selected === "All" ? items : items.filter((i) => i.category === selected);
        if (search.trim()) {
            result = result.filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        return result;
    }, [items, selected, search]);

    return (
        <div>

            <SearchBox value={search} onChange={setSearch} />
            <CategoryFilter
                categories={categories}
                value={selected}
                onChange={setSelected}
            />

            {filtered.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No items found in “{selected}”.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filtered.map((m) => (
                        <MenuItemCard key={m.id} item={m} />
                    ))}
                </div>
            )}
        </div>
    );
}