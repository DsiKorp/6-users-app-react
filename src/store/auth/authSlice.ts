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
});

export const getLoginInitialState = (): AuthState => {
    const loginData = sessionStorage.getItem('authState');

    if (!loginData) {
        return {
            isAuth: false,
            isAdmin: false,
            loggedUser: null,
        };
    }

    const validation = AuthStateSchema.safeParse(JSON.parse(loginData));

    if (validation.error) {
        sessionStorage.removeItem('authState');

        return {
            isAuth: false,
            isAdmin: false,
            loggedUser: null,
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
        },
        onLogout: (state) => {
            state.isAuth = false;
            state.loggedUser = null;
            state.isAdmin = false;
        }
    }
});

export const { onLogin, onLogout } = authSlice.actions;