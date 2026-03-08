import { useQuery } from "@tanstack/react-query";
import { loginAction } from "../actions/login.action";
import type { Credentials } from "../../interfaces/loginUser.interface";

export const useAuthQuery = ({ username, password }: Credentials) => {
    return useQuery({
        queryKey: ['auth'],
        queryFn: () => loginAction({ username, password }),
        retry: false,
        staleTime: 1000 * 60 * 90, // 90 minutes
    });
}