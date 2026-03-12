import { createSlice } from "@reduxjs/toolkit";
import * as z from 'zod';
import type { AuthState } from "../../interfaces/loginUser.interface";

const LoggedUserSchema = z.object({
    username: z.string(),
});

const AuthStateSchema = z.object({
    isAuth: z.boolean(),
    isAdmin: z.boolean().optional(),
    loggedUser: LoggedUserSchema.nullable(),
    isLoginLoading: z.boolean(),
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

    return validation.data;
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