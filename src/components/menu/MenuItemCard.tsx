import { useState } from "react";
import type { MenuItem } from "../../types/menu";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { CategoryBadge } from "../common/CategoryBadge";
import { QuantityInput } from "../common/QuantityInput";

type Props = {
    item: MenuItem;
    onAdd: (item: MenuItem, qty: number) => void;
};

export function MenuItemCard({ item, onAdd }: Props) {
    const [qty, setQty] = useState(1);

    return (
        <Card
            title={
                <span className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <CategoryBadge category={item.category} />
                    </span>
                    {!item.inStock && (
                        <span className="text-[11px] px-2 py-1 rounded bg-red-50 text-red-600 ring-1 ring-red-100">
                            Out of stock
                        </span>
                    )}
                </span>
            }
            footer={
                <div className="flex items-center gap-3">
                    <QuantityInput value={qty} onChange={setQty} />
                    <Button
                        disabled={!item.inStock}
                        className="grow"
                        onClick={() => onAdd(item, qty)}
                    >
                        Add to cart
                    </Button>
                </div>
            }
        >
            <p className="text-sm text-gray-500">₹{item.price}</p>
        </Card>
    );
}
