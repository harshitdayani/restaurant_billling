import type { CartItem } from "../types/cart";
import type { OrderItemPayload, OrderTotals } from "../types/order";

// Simple tax/discount example; adjust to your business rules
const TAX_RATE = 0.05;        // 5%
const DISCOUNT_RATE = 0.0;    // apply when needed

export function mapCartToOrderItems(cart: CartItem[]): OrderItemPayload[] {
  return cart.map((i) => ({
    id: i.id,
    name: i.name,
    unitPrice: i.price,
    qty: i.qty,
    lineTotal: i.price * i.qty,
  }));
}

export function computeTotals(items: OrderItemPayload[]): OrderTotals {
  const subTotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const tax = Math.round(subTotal * TAX_RATE);
  const discount = Math.round(subTotal * DISCOUNT_RATE);
  const grandTotal = subTotal + tax - discount;
  return { subTotal, tax, discount, grandTotal };
}