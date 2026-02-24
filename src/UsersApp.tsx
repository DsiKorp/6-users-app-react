import { useAuth } from "./auth/hooks/useAuth";
import { LoginPage } from "./auth/pages/LoginPage"
import { Navbar } from "./componentes/layout/Navbar";
import { UsersPage } from "./pages/UsersPage"

export const UsersApp = () => {

    const {login, handlerLogin, handlerLogout} = useAuth();

    return (
        <>
         {
                login.isAuth
                    ? (
                        <>
                            <Navbar login={ login } handlerLogout={handlerLogout} />
                            <UsersPage />
                        </>
                    )
                    : <LoginPage handlerLogin={handlerLogin} />
            }
        </>

    )
}
