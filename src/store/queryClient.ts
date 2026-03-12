import {
    dehydrate,
    hydrate,
    QueryClient,
    type DehydratedState,
} from "@tanstack/react-query";

const QUERY_CACHE_STORAGE_KEY = "react-query-cache";
const QUERY_CACHE_MAX_AGE_MS = 1000 * 60 * 30; // 30 minutes

interface PersistedQueryCache {
    timestamp: number;
    state: DehydratedState;
}

const canUseSessionStorage = () => {
    return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

const restoreQueryCache = () => {
    if (!canUseSessionStorage()) return;

    const persistedQueryCache = sessionStorage.getItem(QUERY_CACHE_STORAGE_KEY);
    if (!persistedQueryCache) return;

    try {
        const parsedCache = JSON.parse(persistedQueryCache) as PersistedQueryCache;
        const isExpired = Date.now() - parsedCache.timestamp > QUERY_CACHE_MAX_AGE_MS;

        if (isExpired) {
            sessionStorage.removeItem(QUERY_CACHE_STORAGE_KEY);
            return;
        }

        hydrate(queryClient, parsedCache.state);
    } catch {
        sessionStorage.removeItem(QUERY_CACHE_STORAGE_KEY);
    }
};

const persistQueryCache = () => {
    if (!canUseSessionStorage()) return;

    try {
        const dehydratedState = dehydrate(queryClient);

        const payload: PersistedQueryCache = {
            timestamp: Date.now(),
            state: dehydratedState,
        };

        sessionStorage.setItem(QUERY_CACHE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
        // Ignore persistence errors to avoid breaking app execution.
    }
};

restoreQueryCache();
queryClient.getQueryCache().subscribe(persistQueryCache);
