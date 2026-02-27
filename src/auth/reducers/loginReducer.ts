import * as z from 'zod';
import type { AuthState, LoggedUser } from "../../interfaces/loginUser.interface";

export type AuthAction =
    | { type: 'LOGIN'; payload: LoggedUser }
    | { type: 'LOGOUT' };

const LoggedUserSchema = z.object({
    username: z.string(),
});

const AuthStateSchema = z.object({
    isAuth: z.boolean(),
    loggedUser: LoggedUserSchema.nullable(),
});

export const getLoginInitialState = (): AuthState => {
    const loginData = sessionStorage.getItem('loggedUser');

    if (!loginData) {
        return {
            isAuth: false,
            loggedUser: null,
        };
    }

    const validation = AuthStateSchema.safeParse(JSON.parse(loginData));

    if (validation.error) {
        sessionStorage.removeItem('loggedUser');

        return {
            isAuth: false,
            loggedUser: null,
        };
    }

    return validation.data;
}

export const loginReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'LOGIN':
            return {
                isAuth: true,
                loggedUser: action.payload,
            };
        case 'LOGOUT':
            return {
                isAuth: false,
                loggedUser: null,
            };
        default:
            return { ...state };
    }

}