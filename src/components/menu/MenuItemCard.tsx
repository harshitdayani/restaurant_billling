import { useState } from "react";
import type { MenuItem } from "../../types/menu";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { CategoryBadge } from "../common/CategoryBadge";
import { QuantityInput } from "../common/QuantityInput";
import { useCart } from "../../context/CartContext";

export function MenuItemCard({ item }: { item: MenuItem }) {
    const { dispatch } = useCart();
    const [qty, setQty] = useState(1);

    return (
        <Card
            title={
                <span className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <CategoryBadge category={item.category} />
                    </span>
                    {!item.inStock && (
                        <span className="text-[11px] rounded bg-red-50 px-2 py-1 text-red-600 ring-1 ring-red-100 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/20">
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
                        onClick={() => {
                            if (!item.inStock) return;
                            dispatch({ type: "ADD", item, qty });
                            setQty(1);
                        }}
                        variant="outline"
                    >
                        Add to cart
                    </Button>
                </div>
            }
        >
            <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price}</p>
        </Card>
    );
}
