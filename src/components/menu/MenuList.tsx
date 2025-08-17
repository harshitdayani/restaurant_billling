import { useMemo, useState } from "react";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuItem } from "../../types/menu";
import { CategoryFilter } from "../common/CategoryFilter";
import { SearchBox } from "../common/SearchBox";
import { useDebounce } from "../../hooks/useDebounce";
import { useCategories } from "../../hooks/useCategories";

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
    const debounced = useDebounce(search, 250);

    // unique categories derived from items, using cutom hook useCategories
    const categories = useCategories(items);

    // filter by selected category
    const filtered = useMemo(() => {
        const term = debounced.trim().toLowerCase();
        return items.filter((i) => {
            const matchCategory = selected === "All" || i.category === selected;
            const matchSearch = !term ||  i.name.toLowerCase().includes(term);
            return matchCategory && matchSearch;
        });
    }, [items, selected, debounced]);

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