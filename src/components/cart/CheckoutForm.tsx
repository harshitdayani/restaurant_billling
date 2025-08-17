import { useState } from "react";
import { TextField } from "../common/form/TextField";
import { Button } from "../common/Button";
import { useCart } from "../../context/CartContext";
import { mapCartToOrderItems, computeTotals } from "../../utils/Pricing";
import type { OrderPayload, OrderType } from "../../types/order";

export function CheckoutForm() {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [notes, setNotes] = useState("");

  const [orderKind, setOrderKind] = useState<"DINE_IN" | "TAKEAWAY" | "ONLINE">("DINE_IN");
  const [platform, setPlatform] = useState<"Zomato" | "Swiggy">("Zomato");

  const [submitting, setSubmitting] = useState(false);
  const cartEmpty = cart.length === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cartEmpty) return;

    const items = mapCartToOrderItems(cart);
    const totals = computeTotals(items);

    let orderType: OrderType;
    if (orderKind === "ONLINE") {
      orderType = { kind: "ONLINE", platform };
    } else {
      orderType = { kind: orderKind };
    }

    const payload: OrderPayload = {
      customer: {
        name,
        table: orderKind === "DINE_IN" ? table : undefined, // ✅ Only include if dine-in
        notes: notes || undefined,
      },
      items,
      totals,
      currency: "INR",
      createdAt: new Date().toISOString(),
      orderType,
    };

    console.log("Order payload:", payload);
    // Later: send payload to API
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="text-lg font-semibold">Checkout</h3>

      {/* Customer Name */}
      <TextField label="Customer Name" value={name} onChange={setName} placeholder="Enter name" />

      {/* Order type selector */}
      <div>
        <label className="block text-sm font-medium">Order Type</label>
        <select
          value={orderKind}
          onChange={(e) => setOrderKind(e.target.value as any)}
          className="input mt-1"
        >
          <option value="DINE_IN">Dine-In</option>
          <option value="TAKEAWAY">Takeaway</option>
          <option value="ONLINE">Online</option>
        </select>
      </div>

      {/* Show Table Number only if Dine-In */}
      {orderKind === "DINE_IN" && (
        <TextField
          label="Table Number"
          value={table}
          onChange={setTable}
          placeholder="e.g. 5"
          type="number"
        />
      )}

      {/* Show Platform if Online */}
      {orderKind === "ONLINE" && (
        <div>
          <label className="block text-sm font-medium">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="input mt-1"
          >
            <option value="Zomato">Zomato</option>
            <option value="Swiggy">Swiggy</option>
          </select>
        </div>
      )}

      {/* Notes */}
      <label className="block space-y-1">
        <span className="text-sm font-medium">Special Instructions</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes for the kitchen?"
          className="input min-h-[80px]"
        />
      </label>

      <Button
        variant="solid"
        type="submit"
        className="w-full"
        disabled={cartEmpty || submitting || !name || (orderKind === "DINE_IN" && !table)}
      >
        {submitting ? "Submitting..." : cartEmpty ? "Cart is empty" : "Submit Order"}
      </Button>
    </form>
  );
}
