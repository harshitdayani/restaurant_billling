import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 * Syncs a single piece of state with localStorage.
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    // Save to localStorage whenever value changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore write errors (quota, etc.)
        }
    }, [key, value]);

    return [value, setValue];
}
