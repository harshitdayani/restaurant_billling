// src/hooks/usePersistentReducer.ts
import { useEffect, useReducer } from "react";

// Local helpers so we don't rely on React's conditional utility types
type ReducerState<R> = R extends React.Reducer<infer S, any> ? S : never;
type ReducerAction<R> = R extends React.Reducer<any, infer A> ? A : never;

type Options<S> = {
    serialize?: (state: S) => string;
    deserialize?: (raw: string) => S;
    syncAcrossTabs?: boolean;
};

export function usePersistentReducer<R extends React.Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    storageKey: string,
    options: Options<ReducerState<R>> = {}
): [ReducerState<R>, React.Dispatch<ReducerAction<R>>] {
    const {
        serialize = JSON.stringify,
        deserialize = JSON.parse,
        syncAcrossTabs = false,
    } = options;

    const [state, dispatch] = useReducer(
        reducer,
        initialState,
        (init) => {
            try {
                const raw = localStorage.getItem(storageKey);
                return raw ? (deserialize(raw) as typeof init) : init;
            } catch {
                return init;
            }
        }
    );

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, serialize(state));
        } catch { }
    }, [state, storageKey, serialize]);

    useEffect(() => {
        if (!syncAcrossTabs) return;
        const onStorage = (e: StorageEvent) => {
            if (e.key === storageKey) {
                // simplest generic sync: reload to rehydrate
                window.location.reload();
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [storageKey, syncAcrossTabs]);

    return [state, dispatch];
}
