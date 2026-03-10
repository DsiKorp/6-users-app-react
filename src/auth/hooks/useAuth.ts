import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { useSwal } from "../../hooks/useSwal";
import type { AuthState, Credentials, LoggedUser } from "../../interfaces/loginUser.interface";
//import { loginReducer, getLoginInitialState } from "../reducers/loginReducer";
import { loginAction } from "../actions/login.action";
import { AUTH_QUERY_KEY } from "./useAuthQuery";
import { onLogin, onLogout } from "../../store/auth/authSlice";


export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    //const [login, dispatch] = useReducer(loginReducer, getLoginInitialState());
    const { loggedUser, isAdmin, isAuth } = useSelector((state: { auth: AuthState }) => state.auth);
    const [authStatus, setAuthStatus] = useState<AuthStatus>(getInitialAuthStatus(isAuth));

    const handlerLogin = async (userCredentials: Credentials) => {
        //const isLogin = loginUser(userCredentials);

        try {
            const loginResponse = await executeLogin(userCredentials);
            //console.log({ loginResponse });

            const token = loginResponse.token;
            const claims = token.split('.')[1];
            const decodedClaims = JSON.parse(atob(claims));
            //console.log('-------------------------------------------------------');
            //console.log({ decodedClaims });

            const loggedUser: LoggedUser = { username: decodedClaims.username };

            dispatch(onLogin({
                loggedUser,
                isAdmin: decodedClaims.isAdmin,
                //isAuth: true,
            }));

            // dispatch({
            //     type: 'LOGIN',
            //     payload: {
            //         loggedUser,
            //         isAdmin: decodedClaims.isAdmin,
            //         isAuth: true,
            //     },
            // });

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
        dispatch(onLogout());

        // dispatch({
        //     type: 'LOGOUT',
        // });

        // Clean users cache on logout to avoid stale or unauthorized data.
        queryClient.removeQueries({ queryKey: ['users'] });
        queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });

        sessionStorage.removeItem('authState');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        setAuthStatus('not-authenticated');
        navigate('/login');
    };

    const isTokenAdmin = (): boolean => {
        const token = sessionStorage.getItem('token');
        if (!token) return false;

        try {
            const claims = token.split('.');
            if (claims.length !== 3) return false;

            const decoded = JSON.parse(atob(claims[1]));
            return decoded.isAdmin === true;
        } catch {
            return false;
        }
    };

    return {
        //login,

        login: {
            loggedUser,
            isAdmin,
            isAuth
        },
        authStatus,
        handlerLogin,
        handlerLogout,
        isTokenAdmin,
    };
};