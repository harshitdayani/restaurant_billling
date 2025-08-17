import { useMemo } from "react";

type ItemWithCategory = { category: string };

export function useCategories<T extends ItemWithCategory>(items: T[]) {
    return useMemo(
        () => Array.from(new Set(items.map((i) => i.category))).sort(), [items]
    );
}