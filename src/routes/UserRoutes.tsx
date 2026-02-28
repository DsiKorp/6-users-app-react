import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { Navbar } from "../componentes/layout/Navbar";
import type { AuthState } from "../interfaces/loginUser.interface";
import { RegisterPage } from "../pages/RegisterPage";
import { UserContextProvider } from "../context/UserContext";

interface Props {
  login: AuthState;
  handlerLogout: () => void;

}

export const UserRoutes = ({ login, handlerLogout }: Props) => {



  return (
    <>
      <UserContextProvider>
        <Navbar login={login} handlerLogout={handlerLogout} />
        <Routes>
          <Route path="users" element={
            <UsersPage />}
          />
          <Route path="users/register" element={
            <RegisterPage />}
          />
          <Route path="users/edit/:id" element={
            <RegisterPage />}
          />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </UserContextProvider>
    </>
  )
}
