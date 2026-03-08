import { usersApi } from "../../api/usersApi";
import type { LoginResponse } from "../../interfaces/loginResponse.interface";
import type { Credentials } from "../../interfaces/loginUser.interface";

export const loginAction = async ({ username, password }: Credentials): Promise<LoginResponse> => {
    try {
        const { data } = await usersApi.post<LoginResponse>("/login", { username, password });

        console.log(data);
        return data;

    } catch (error: any) {
        console.log(error);
        console.log('Response data:', error.response?.data);
        throw error;
    }
}