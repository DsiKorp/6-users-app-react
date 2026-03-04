import { useQuery } from "@tanstack/react-query";
import { getGreetingAction } from "../actions/get-initial-greeting.action";

export const useQueryInitialGreeting = () => {
    return useQuery({
        queryKey: ['initial-greeting'],
        queryFn: () => getGreetingAction(),
        retry: false,
        staleTime: 1000 * 60 * 1, // 1 minute
    });
}