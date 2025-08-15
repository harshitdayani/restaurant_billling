import type { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
    return <main className="mx-auto max-w-5xl p-4">{children}</main>;
}
