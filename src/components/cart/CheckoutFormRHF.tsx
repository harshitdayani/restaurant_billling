import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifyError, notifySuccess } from "../../utils/toast";
import { mapCartToOrderItems, computeTotals } from "../../utils/pricing";
import type { CartItem } from "../../types/cart";
import type { OrderPayload, OrderType } from "../../types/order";

// ---- Schema with conditional rules
const checkoutSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits").optional().or(z.literal("")),
        orderKind: z.enum(["DINE_IN", "TAKEAWAY", "ONLINE"], { error: "Select an order type" }),
        table: z.string().optional(),                 // required for DINE_IN
        platform: z.enum(["Zomato", "Swiggy"]).optional(), // required for ONLINE
        notes: z.string().max(300, "Max 300 characters").optional().or(z.literal("")),
    })
    .superRefine((val, ctx) => {
        if (val.orderKind === "DINE_IN" && (!val.table || val.table.trim() === "")) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["table"], message: "Table number is required" });
        }
        if (val.orderKind === "ONLINE" && !val.platform) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["platform"], message: "Select a delivery platform" });
        }
    });

type CheckoutFormData = z.infer<typeof checkoutSchema>;

/** A11y: focus the first invalid input when errors change */
function useFocusFirstError(errors: Record<string, unknown>) {
    const triedRef = useRef(false);
    useEffect(() => {
        const keys = Object.keys(errors);
        if (!keys.length) return;
        // prevent refocusing repeatedly if user fixes errors field-by-field
        if (triedRef.current) return;
        triedRef.current = true;

        const first = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            `[name="${keys[0]}"]`
        );
        first?.focus();

        const id = window.setTimeout(() => (triedRef.current = false), 600);
        return () => clearTimeout(id);
    }, [errors]);
}

export function CheckoutFormRHF({ cart, onSubmitted }: { cart: CartItem[]; onSubmitted?: () => void }) {
    const hasItems = cart.length > 0;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            name: "",
            phone: "",
            orderKind: "DINE_IN",
            table: "",
            platform: undefined,
            notes: "",
        },
        mode: "onBlur",
    });

    useFocusFirstError(errors as Record<string, unknown>);
    const orderKind = watch("orderKind");

    const onSubmit = async (data: CheckoutFormData) => {
        if (!hasItems) {
            notifyError("Cannot place order", "Cart is empty");
            return;
        }

        const items = mapCartToOrderItems(cart);
        const totals = computeTotals(items);

        const orderType: OrderType =
            data.orderKind === "ONLINE" ? { kind: "ONLINE", platform: data.platform! } : { kind: data.orderKind };

        const payload: OrderPayload = {
            customer: {
                name: data.name.trim(),
                table: data.orderKind === "DINE_IN" ? data.table?.trim() : undefined,
                notes: data.notes?.trim() || undefined,
                phone: data.phone?.trim() || undefined,
            },
            items,
            totals,
            currency: "INR",
            createdAt: new Date().toISOString(),
            orderType,
        };

        // API call (later). For now:
        console.log("Order payload:", payload);
        notifySuccess("Order ready to submit", "Payload built successfully");
        reset();
        onSubmitted?.();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4" noValidate>
            <h3 className="text-lg font-semibold">Customer details</h3>

            {/* Name */}
            <label className="block space-y-1">
                <span className="text-sm font-medium">Customer Name</span>
                <input {...register("name")} className="input" placeholder="Enter name" autoComplete="name" />
                {errors.name && <span className="text-sm text-red-600">{(errors.name as any).message}</span>}
            </label>

            {/* Phone (optional) */}
            <label className="block space-y-1">
                <span className="text-sm font-medium">Phone (optional)</span>
                <input {...register("phone")} className="input" placeholder="10-digit number" inputMode="numeric" />
                {errors.phone && <span className="text-sm text-red-600">{(errors.phone as any).message}</span>}
            </label>

            {/* Order type */}
            <div>
                <label className="block text-sm font-medium">Order Type</label>
                <select {...register("orderKind")} className="input mt-1">
                    <option value="DINE_IN">Dine-in</option>
                    <option value="TAKEAWAY">Takeaway</option>
                    <option value="ONLINE">Online</option>
                </select>
                {errors.orderKind && <span className="text-sm text-red-600">{(errors.orderKind as any).message}</span>}
            </div>

            {/* Table only for DINE_IN */}
            {orderKind === "DINE_IN" && (
                <label className="block space-y-1">
                    <span className="text-sm font-medium">Table Number</span>
                    <input {...register("table")} className="input" placeholder="e.g. 5" inputMode="numeric" />
                    {errors.table && <span className="text-sm text-red-600">{(errors.table as any).message}</span>}
                </label>
            )}

            {/* Platform only for ONLINE */}
            {orderKind === "ONLINE" && (
                <div>
                    <label className="block text-sm font-medium">Platform</label>
                    <select {...register("platform")} className="input mt-1">
                        <option value="">Select…</option>
                        <option value="Zomato">Zomato</option>
                        <option value="Swiggy">Swiggy</option>
                    </select>
                    {errors.platform && <span className="text-sm text-red-600">{(errors.platform as any).message}</span>}
                </div>
            )}

            {/* Notes */}
            <label className="block space-y-1">
                <span className="text-sm font-medium">Special Instructions</span>
                <textarea {...register("notes")} className="input min-h-[80px]" placeholder="Any notes for the kitchen?" />
                {errors.notes && <span className="text-sm text-red-600">{(errors.notes as any).message}</span>}
            </label>

            <button type="submit" className="btn btn-solid w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Submit Order"}
            </button>
        </form>
    );
}
