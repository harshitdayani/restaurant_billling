import type { MenuItem } from "./menu";

export type CartItem = MenuItem & { qty: number };

export type CartState = {
    items: CartItem[];
};