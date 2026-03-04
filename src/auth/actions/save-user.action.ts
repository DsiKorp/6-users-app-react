import { usersApi } from "../../api/usersApi";
import type { User } from "../../interfaces/users.interfaces";

export const saveUserAction = async (user: User): Promise<User> => {

    try {
        const { data } = await usersApi.post<User>("/users", user);
        console.log(data);
        return { ...data };
    } catch (error) {
        throw error;
    }

}