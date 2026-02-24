import type { Credentials } from "../../interfaces/loginUser.interface";

export const loginUser = (userLogin: Credentials) => {
    return (userLogin.username === 'admin' && userLogin.password === '12345');
}