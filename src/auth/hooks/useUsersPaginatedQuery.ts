import { useQuery } from "@tanstack/react-query";
import { getAllUsersPaginatedAction } from "../actions/get-all-usersPaginated.action";
import type { PaginatedUsers } from "../../interfaces/PaginatedUsersI";

export const USERS_PAGINATED_QUERY_KEY = 'users-paginated';

export const useUsersPaginatedQuery = (page = 0) => {
    return useQuery<PaginatedUsers>({
        queryKey: [USERS_PAGINATED_QUERY_KEY, page],
        queryFn: () => getAllUsersPaginatedAction(page),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}