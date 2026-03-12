import { createSlice } from "@reduxjs/toolkit";
import * as z from 'zod';
import type { AuthState } from "../../interfaces/loginUser.interface";

const defaultAuthState: AuthState = {
    isAuth: false,
    isAdmin: false,
    loggedUser: null,
    isLoginLoading: false,
};

const LoggedUserSchema = z.object({
    username: z.string(),
});

const AuthStateSchema = z.object({
    isAuth: z.boolean(),
    isAdmin: z.boolean().optional(),
    loggedUser: LoggedUserSchema.nullable(),
    // Backward compatible with previously persisted authState payloads.
    isLoginLoading: z.boolean().optional(),
});

export const getLoginInitialState = (): AuthState => {
    const loginData = sessionStorage.getItem('authState');

    if (!loginData) {
        return defaultAuthState;
    }

    let parsedAuthState: unknown;

    try {
        parsedAuthState = JSON.parse(loginData);
    } catch {
        sessionStorage.removeItem('authState');
        return defaultAuthState;
    }

    const validation = AuthStateSchema.safeParse(parsedAuthState);

    if (validation.error) {
        sessionStorage.removeItem('authState');
        return defaultAuthState;
    }

    return {
        ...validation.data,
        isAdmin: validation.data.isAdmin ?? false,
        isLoginLoading: false,
    };
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: getLoginInitialState(),
    reducers: {
        onLogin: (state, { payload }) => {
            state.isAuth = true;
            state.loggedUser = payload.loggedUser;
            state.isAdmin = payload.isAdmin;
            state.isLoginLoading = false;
        },
        onLogout: (state) => {
            state.isAuth = false;
            state.loggedUser = null;
            state.isAdmin = false;
            state.isLoginLoading = false;
        },
        onInitLogin: (state) => {
            state.isLoginLoading = true;
        }
    }
});

export const { onLogin, onLogout, onInitLogin } = authSlice.actions;