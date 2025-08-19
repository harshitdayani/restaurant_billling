// import type { CartItem } from "./cart";

export type CustomerInfo = {
  name: string;
  table: string | undefined;        // keep as string for easy input; cast to number server-side if needed
  notes?: string;
  phone?: string;
};

export type OrderItemPayload = {
  id: string;           // menu item id
  name: string;
  unitPrice: number;    // ₹ in minor units or integer rupees (see note below)
  qty: number;
  lineTotal: number;    // unitPrice * qty
};

export type OrderTotals = {
  subTotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
};

export type OrderType = 
  | { kind: "DINE_IN" }
  | { kind: "TAKEAWAY" }
  | { kind: "ONLINE"; platform: "Zomato" | "Swiggy" };

export type OrderPayload = {
  customer: CustomerInfo;
  items: OrderItemPayload[];
  totals: OrderTotals;
  currency: "INR";
  createdAt: string;    // ISO timestamp
  orderType: OrderType
};