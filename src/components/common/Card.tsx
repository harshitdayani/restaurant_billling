import type { PropsWithChildren, ReactNode } from "react";

type CardProps = PropsWithChildren<{ title?: ReactNode; footer?: ReactNode }>;

export function Card({ title, footer, children }: CardProps) {
    return (
        <section className="card">
            {title && <div className="mb-2 font-semibold">{title}</div>}
            {children}
            {footer && <div className="mt-3 border-t pt-3">{footer}</div>}
        </section>
    );
}
