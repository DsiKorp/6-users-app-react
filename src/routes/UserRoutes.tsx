import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { Navbar } from "../componentes/layout/Navbar";
import type { AuthState } from "../interfaces/loginUser.interface";
import { RegisterPage } from "../pages/RegisterPage";
import { useUsers } from "../hooks/useUsers";

interface Props {
  login: AuthState;
  handlerLogout: () => void;

}

export const UserRoutes = ({ login, handlerLogout }: Props) => {

  const {
    users,
    userSelected,
    handleAddUser,
    handleRemoveUser,
    handlereSelectedUser,
    isVisibleForm,
    handleCloseForm,
    handleOpenForm
  } = useUsers();

  return (
    <>
      <Navbar login={login} handlerLogout={handlerLogout} />
      <Routes>
        <Route path="users" element={
          <UsersPage
            users={users}
            userSelected={userSelected}
            handleAddUser={handleAddUser}
            handleRemoveUser={handleRemoveUser}
            handlereSelectedUser={handlereSelectedUser}
            isVisibleForm={isVisibleForm}
            handleCloseForm={handleCloseForm}
            handleOpenForm={handleOpenForm}
          />}
        />
        <Route path="users/register" element={
          <RegisterPage
            handleAddUser={handleAddUser}
          />}
        />
        <Route path="users/edit/:id" element={
          <RegisterPage
            users={users}
            handleAddUser={handleAddUser}
          />}
        />
        <Route path="/" element={<Navigate to="/users" />} />
      </Routes>
    </>
  )
}
