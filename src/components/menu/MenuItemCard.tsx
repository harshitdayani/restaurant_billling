import { useState } from "react";
import type { MenuItem } from "../../types/menu";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { CategoryBadge } from "../common/CategoryBadge";
import { QuantityInput } from "../common/QuantityInput";
import { useCart } from "../../context/CartContext";

type Props = { item: MenuItem };

export function MenuItemCard({ item }: Props) {
    const { dispatch } = useCart();
    const [qty, setQty] = useState(1);

    const handleAdd = () => {
        if (!item.inStock) return;
        dispatch({ type: "ADD", item, qty });
        setQty(1); // reset after adding
    };

    return (
        <Card
            title={
                <span className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <CategoryBadge category={item.category} />
                    </span>
                    {!item.inStock && (
                        <span className="text-[11px] rounded bg-red-50 px-2 py-1 text-red-600 ring-1 ring-red-100">
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
                        onClick={handleAdd}
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
