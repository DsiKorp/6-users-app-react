import { NavLink } from "react-router-dom";
import type { AuthState } from "../../interfaces/loginUser.interface";

interface Props {
    login: AuthState;
    handlerLogout: () => void;
}

export const Navbar = ({ login, handlerLogout }: Props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-modern">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/users">
                    <i className="fa-solid fa-users me-2"></i>
                    UsersApp
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-3">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link-modern ${isActive ? 'active' : ''}`}
                                to="/users"
                                end
                            >
                                <i className="fa-solid fa-list me-1"></i>
                                Usuarios
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link-modern ${isActive ? 'active' : ''}`}
                                to="/users/register"
                            >
                                <i className="fa-solid fa-user-plus me-1"></i>
                                Registrar
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    <span className="username-badge">
                        <i className="fa-solid fa-user me-1"></i>
                        {login.loggedUser?.username}
                    </span>
                    <button
                        onClick={handlerLogout}
                        className="btn btn-logout">
                        <i className="fa-solid fa-right-from-bracket me-1"></i>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}