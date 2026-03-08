import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSwal } from "../../hooks/useSwal";
import type { Credentials, LoggedUser } from "../../interfaces/loginUser.interface";
import { loginReducer, getLoginInitialState } from "../reducers/loginReducer";
import { loginAction } from "../actions/login.action";
import { AUTH_QUERY_KEY } from "./useAuthQuery";


export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { fireSwal } = useSwal();

    const { mutateAsync: executeLogin } = useMutation({
        mutationFn: loginAction,
        onSuccess: (response) => {
            queryClient.setQueryData(AUTH_QUERY_KEY, response);
        },
    });

    const getInitialAuthStatus = (isAuth: boolean): AuthStatus => {
        if (isAuth) {
            return 'authenticated';
        } else {
            return 'checking';
        }
    };

    const [login, dispatch] = useReducer(loginReducer, getLoginInitialState());
    const [authStatus, setAuthStatus] = useState<AuthStatus>(getInitialAuthStatus(login.isAuth));

    const handlerLogin = async (userCredentials: Credentials) => {
        //const isLogin = loginUser(userCredentials);

        try {
            const loginResponse = await executeLogin(userCredentials);
            console.log({ loginResponse });

            const token = loginResponse.token;
            const claims = token.split('.')[1];
            const decodedClaims = JSON.parse(atob(claims));
            console.log('-------------------------------------------------------');
            console.log({ decodedClaims });

            const loggedUser: LoggedUser = { username: decodedClaims.username };

            dispatch({
                type: 'LOGIN',
                payload: {
                    loggedUser,
                    isAdmin: decodedClaims.isAdmin,
                    isAuth: true,
                },
            });

            sessionStorage.setItem('authState', JSON.stringify({
                isAuth: true,
                isAdmin: decodedClaims.isAdmin,
                loggedUser,
            }));

            sessionStorage.setItem('token', token);

            setAuthStatus('authenticated');
            navigate('/users');
        } catch (error) {
            setAuthStatus('not-authenticated');

            if (error instanceof Error && 'response' in error && (error as any).response?.status === 401) {
                fireSwal({
                    title: 'Error Login',
                    html: 'Username o password  <strong>invalidos</strong>',
                    icon: 'error'
                });
            } else if (error instanceof Error && 'response' in error && (error as any).response?.status === 403) {
                fireSwal({
                    title: 'Error Login',
                    html: 'No tienes acceso al <strong>recurso o permisos</strong>',
                    icon: 'error'
                });
            } else {
                throw error;
            }
        }
    };

    const handlerLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });

        // Clean users cache on logout to avoid stale or unauthorized data.
        queryClient.removeQueries({ queryKey: ['users'] });
        queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });

        sessionStorage.removeItem('authState');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        setAuthStatus('not-authenticated');
        navigate('/login');
    };

    return {
        login,
        authStatus,
        handlerLogin,
        handlerLogout,
    };
};