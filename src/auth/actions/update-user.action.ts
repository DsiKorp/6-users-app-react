import { usersApi } from "../../api/usersApi";
import type { User } from "../../interfaces/users.interfaces";

export const updateUserAction = async (user: User): Promise<User> => {

    try {
        const { data } = await usersApi.put<User>(`/users/${user.id}`, user);
        console.log(data);
        return { ...data };
    } catch (error) {
        throw error;
    }
}