import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSwal } from "../../hooks/useSwal";
import { loginUser } from "../services/authService";
import type { Credentials, LoggedUser } from "../../interfaces/loginUser.interface";
import { loginReducer, getLoginInitialState } from "../reducers/loginReducer";


export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export const useAuth = () => {
    const navigate = useNavigate();
    const { fireSwal } = useSwal();

    const getInitialAuthStatus = (isAuth: boolean): AuthStatus => {
        if (isAuth) {
            return 'authenticated';
        } else {
            return 'checking';
        }
    };

    const [login, dispatch] = useReducer(loginReducer, getLoginInitialState());
    const [authStatus, setAuthStatus] = useState<AuthStatus>(getInitialAuthStatus(login.isAuth));

    const handlerLogin = (userCredentials: Credentials) => {
        const isLogin = loginUser(userCredentials);

        if (isLogin) {
            const loggedUser: LoggedUser = { username: userCredentials.username };
            dispatch({
                type: 'LOGIN',
                payload: loggedUser,
            });
            sessionStorage.setItem('loggedUser', JSON.stringify({
                isAuth: true,
                loggedUser,
            }));
            setAuthStatus('authenticated');
            navigate('/users');
        } else {
            setAuthStatus('not-authenticated');
            fireSwal({
                title: 'Error Login',
                html: 'Username o password  <strong>invalidos</strong>',
                icon: 'error'
            });
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        sessionStorage.removeItem('loggedUser');
        setAuthStatus('not-authenticated');
        navigate('/login');
    }

    return {
        login,
        authStatus,
        handlerLogin,
        handlerLogout,
    }
}