import { createContext, type PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthState } from "../../interfaces/loginUser.interface";


// PropsWithChildren es un tipo genérico que incluye children y remplaza esta interfaz
// interface UserContextProps {
//     children: React.ReactNode;
// }

interface AuthContextProps {
    login: AuthState;
    handlerLogin: (credentials: { username: string; password: string }) => void;
    handlerLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {

    const { login, handlerLogin, handlerLogout } = useAuth();


    return (
        <AuthContext value={{
            login,
            handlerLogin,
            handlerLogout
        }}>
            {children}
        </AuthContext>
    )
}