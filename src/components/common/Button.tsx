import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline";
};

export function Button({ variant = "outline", className = "", ...rest }: Props) {
    const base = "btn";
    const kind = variant === "solid" ? "btn-solid" : "btn-outline";
    return <button className={`${base} ${kind} ${className}`} {...rest} />;
}