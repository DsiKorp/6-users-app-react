import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { Navbar } from "../componentes/layout/Navbar";
import type { AuthState } from "../interfaces/loginUser.interface";

interface Props {
  login: AuthState;
  handlerLogout: () => void;

}

export const UserRoutes = ({ login, handlerLogout }: Props) => {

  return (
    <>
      <Navbar login={login} handlerLogout={handlerLogout} />
      <Routes>
        <Route path="users" element={<UsersPage />} />
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
    </>
  )
}
