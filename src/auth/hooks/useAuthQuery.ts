import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginResponse } from "../../interfaces/loginResponse.interface";

export const AUTH_QUERY_KEY = ['auth'] as const;

export const useAuthQuery = () => {
    const queryClient = useQueryClient();

    return useQuery<LoginResponse | null>({
        queryKey: AUTH_QUERY_KEY,
        queryFn: async () => queryClient.getQueryData<LoginResponse>(AUTH_QUERY_KEY) ?? null,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 90, // 90 minutes
    });
};