import { usersApi } from "../../api/usersApi";

export const deleteUserAction = async (id: number): Promise<void> => {

    try {
        await usersApi.delete(`/users/${id}`);
    } catch (error) {
        throw error;
    }
}