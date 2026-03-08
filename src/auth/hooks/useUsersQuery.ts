import { useQuery } from "@tanstack/react-query";
import { getAllUsersAction } from "../actions/get-all-users.action";

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsersAction(),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}