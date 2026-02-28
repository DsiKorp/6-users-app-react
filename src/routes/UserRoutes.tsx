import { use } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { Navbar } from "../componentes/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { UserContextProvider } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export const UserRoutes = () => {

  const { authStatus } = use(AuthContext);

  if (authStatus === 'checking') return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary">
      <div className="card shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: 420, width: '100%' }}>
        <div className="card-body">
          <div className="spinner-border text-primary mb-3" role="status" aria-hidden="true"></div>
          <h5 className="fw-bold mb-2">Verificando sesión</h5>
          <p className="text-secondary mb-0">Checking authentication...</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/register" element={<RegisterPage />} />
          <Route path="users/edit/:id" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
      </UserContextProvider>
    </>
  )
}
