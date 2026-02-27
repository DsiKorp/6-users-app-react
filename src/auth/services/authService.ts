import type { Credentials } from "../../interfaces/loginUser.interface";

// userLogin
export const loginUser = ({ username, password }: Credentials) => {
    return (username === 'admin' && password === 'Abc123');
}