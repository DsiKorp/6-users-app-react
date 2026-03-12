import * as z from 'zod';
import type { AuthState } from "../../interfaces/loginUser.interface";

export type AuthAction =
    | { type: 'LOGIN'; payload: AuthState }
    | { type: 'LOGOUT' };

const LoggedUserSchema = z.object({
    username: z.string(),
});

const AuthStateSchema = z.object({
    isAuth: z.boolean(),
    isAdmin: z.boolean().optional(),
    loggedUser: LoggedUserSchema.nullable(),
    isLoginLoading: z.boolean().optional(),
});

export const getLoginInitialState = (): AuthState => {
    const loginData = sessionStorage.getItem('authState');

    if (!loginData) {
        return {
            isAuth: false,
            isAdmin: false,
            loggedUser: null,
            isLoginLoading: false,
        };
    }

    const validation = AuthStateSchema.safeParse(JSON.parse(loginData));

    if (validation.error) {
        sessionStorage.removeItem('authState');

        return {
            isAuth: false,
            isAdmin: false,
            loggedUser: null,
            isLoginLoading: false,
        };
    }

    return {
        ...validation.data,
        isLoginLoading: validation.data.isLoginLoading ?? false,
    };
}

export const loginReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'LOGIN':
            return {
                isAuth: true,
                loggedUser: action.payload.loggedUser,
                isAdmin: action.payload.isAdmin,
                isLoginLoading: false,
            };
        case 'LOGOUT':
            return {
                isAuth: false,
                loggedUser: null,
                isAdmin: false,
                isLoginLoading: false,
            };
        default:
            return { ...state };
    }

}