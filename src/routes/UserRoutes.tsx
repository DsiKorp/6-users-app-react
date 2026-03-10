//import { use } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { Navbar } from "../componentes/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
// import { UserContextProvider } from "../context/UserContext";
//import { AuthContext } from "../auth/context/AuthContext";
import { useAuth } from "../auth/hooks/useAuth";
import { LoaderPage } from "../componentes/LoaderPage";

export const UserRoutes = () => {

  //const { authStatus, isTokenAdmin } = use(AuthContext);
  const { authStatus, isTokenAdmin } = useAuth();

  if (authStatus === 'checking') return (
    <LoaderPage title="Verificando sesión" message="Checking authentication..." />
  );

  return (
    <>
      {/* <UserContextProvider> */}
      <Navbar />
      <Routes>
        <Route path="users" element={<UsersPage />} />
        <Route
          path="users/register"
          element={isTokenAdmin() ? <RegisterPage /> : <Navigate to="/users" replace />}
        />
        <Route
          path="users/edit/:id"
          element={isTokenAdmin() ? <RegisterPage /> : <Navigate to="/users" replace />}
        />
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
      {/* </UserContextProvider> */}
    </>
  )
}
