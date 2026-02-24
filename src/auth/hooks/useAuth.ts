import { useReducer } from "react";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import type { AuthState, Credentials } from "../../interfaces/loginUser.interface";
import { loginReducer } from "../reducers/loginReducer";


const initialLogin: AuthState = JSON.parse(sessionStorage.getItem('login') || JSON.stringify({
    isAuth: false,
    user: undefined,
}));

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);

    const handlerLogin = ({ username, password }: Credentials) => {
        const isLogin = loginUser({ username, password });

        if (isLogin) {
            const user = { username: 'admin' }
            dispatch({
                type: 'LOGIN',
                payload: user,
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user,
            }));

        } else {
            Swal.fire('Error Login', 'Username o password invalidos', 'error');
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        sessionStorage.removeItem('login');
    }
    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}