type Props = {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
};

export function SearchBox({ value, onChange, placeholder = "Search..." }: Props) {
    return (
        <input
            className="mb-4 w-full max-w-sm rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-200"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="Search menu items"
        />
    );
}
