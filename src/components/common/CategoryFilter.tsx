type Props = {
    categories: string[];           // e.g., ["Pizza","Pasta","Dessert"]
    value: string;                  // currently selected, e.g., "All"
    onChange: (cat: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: Props) {
    const all = ["All", ...categories];

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {all.map((cat) => {
                const active = value === cat;
                return (
                    <button
                        key={cat}
                        onClick={() => onChange(cat)}
                        className={[
                            "text-sm rounded-full px-3 py-1 border",
                            active
                                ? "bg-gray-900 text-white border-gray-900"
                                : "border-gray-200 hover:bg-gray-50"
                        ].join(" ")}
                        aria-pressed={active}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}
