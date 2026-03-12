import { usersApi } from "../../api/usersApi";
import type { PaginatedUsers } from "../../interfaces/PaginatedUsersI";

export const getAllUsersPaginatedAction = async (page = 0): Promise<PaginatedUsers> => {
    try {
        const { data } = await usersApi.get<PaginatedUsers>(`/users/page/${page}`);

        //console.log(data);
        return { ...data };

    } catch (error) {
        throw error;
    }
}