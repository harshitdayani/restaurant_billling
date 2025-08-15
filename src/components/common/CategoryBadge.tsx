export function CategoryBadge({ category }: { category: string }) {
    return (
        <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            {category}
        </span>
    );
}