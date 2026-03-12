import { Navigate, Route, Routes } from "react-router-dom"
//import { useContext } from "react";
import { useSelector } from "react-redux";

import { LoginPage } from "../auth/pages/LoginPage"
import { UserRoutes } from "./UserRoutes";
import { LoaderPage } from "../componentes/LoaderPage";
//import { AuthContext } from "../auth/context/AuthContext";
//import { useAuth } from "../auth/hooks/useAuth";

export const AppRoutes = () => {
    //const { login } = useContext(AuthContext);
    //const { login } = useAuth();
    const { isAuth, isLoginLoading } = useSelector((state: any) => state.auth);

    if (isLoginLoading) {
        return (
            <LoaderPage title="Verificando sesión" message="Checking authentication..." />
        );
    }

    return (
        <Routes>
            {
                //login.isAuth
                isAuth
                    ? (
                        <Route
                            path="/*" element={<UserRoutes />}
                        />
                    ) :
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </>
            }
        </Routes>

    )
}
