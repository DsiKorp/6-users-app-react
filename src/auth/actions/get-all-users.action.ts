import { usersApi } from "../../api/usersApi";
import type { User } from "../../interfaces/users.interfaces";

export const getAllUsersAction = async () => {
    const { data } = await usersApi.get<User[]>("/users");

    console.log(data);
    return [...data];

}