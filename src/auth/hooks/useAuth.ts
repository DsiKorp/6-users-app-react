import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { useSwal } from "../../hooks/useSwal";
import { loginUser } from "../services/authService";
import type { Credentials, LoggedUser } from "../../interfaces/loginUser.interface";
import { loginReducer, getLoginInitialState } from "../reducers/loginReducer";


export const useAuth = () => {
    const navigate = useNavigate();
    const { fireSwal } = useSwal();

    const [login, dispatch] = useReducer(loginReducer, getLoginInitialState());

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
            navigate('/users');
        } else {
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
        navigate('/login');
    }

    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}