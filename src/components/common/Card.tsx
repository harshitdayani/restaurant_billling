import type { PropsWithChildren, ReactNode } from "react";

type CardProps = PropsWithChildren<{ title?: ReactNode; footer?: ReactNode }>;

export function Card({ title, footer, children }: CardProps) {
    return (
        <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            {title && <div className="mb-2 font-semibold">{title}</div>}
            {children}
            {footer && <div className="mt-3 pt-3 border-t">{footer}</div>}
        </section>
    );
}
