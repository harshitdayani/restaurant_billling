type Props = {
    value: number;
    min?: number;
    max?: number;
    onChange: (next: number) => void;
};

export function QuantityInput({ value, min = 1, max = 99, onChange }: Props) {
    const dec = () => onChange(Math.max(min, value - 1));
    const inc = () => onChange(Math.min(max, value + 1));

    return (
        <div className="inline-flex items-center gap-2">
            <button
                type="button"
                onClick={dec}
                aria-label="Decrease quantity"
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm hover:bg-gray-50"
            >
                −
            </button>
            <span className="min-w-8 text-center text-sm">{value}</span>
            <button
                type="button"
                onClick={inc}
                aria-label="Increase quantity"
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm hover:bg-gray-50"
            >
                +
            </button>
        </div>
    );
}
