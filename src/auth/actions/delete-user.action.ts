import { usersApi } from "../../api/usersApi";

export const deleteUserAction = async (id: number): Promise<void> => {

    await usersApi.delete(`/users/${id}`);
}