import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline";
};

export function Button({ variant = "outline", className = "", ...rest }: Props) {
    const base = "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm disabled:opacity-50";
    const styles =
        variant === "solid"
            ? "bg-gray-900 text-white hover:bg-black"
            : "border border-gray-200 hover:bg-gray-50";
    return <button className={`${base} ${styles} ${className}`} {...rest} />;
}
