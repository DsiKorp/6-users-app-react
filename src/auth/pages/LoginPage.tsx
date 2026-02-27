import { useState } from "react";
import type { Credentials } from "../../interfaces/loginUser.interface";
import { useSwal } from "../../hooks/useSwal";

interface Props {
    handlerLogin: (credentials: Credentials) => void;
}

const initialLoginForm = {
    username: '',
    password: '',
}
export const LoginPage = ({ handlerLogin }: Props) => {

    const { fireSwal } = useSwal();
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [name]: value,
        })
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username || !password) {
            fireSwal({
                title: 'Campos Obligatorios',
                html: 'Username y password <strong>son requeridos</strong>',
                icon: 'info'
            });
            return;
        }

        // aca implementamos el login
        handlerLogin({ username, password });


        setLoginForm(initialLoginForm);
    }
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="icon-circle">
                        <i className="fa-solid fa-user-lock"></i>
                    </div>
                    <h2>Bienvenido</h2>
                    <p>Accede con tus credenciales</p>
                </div>
                <div className="login-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-user"></i>
                                <input
                                    className="form-control"
                                    placeholder="Tu usuario"
                                    name="username"
                                    value={username}
                                    onChange={onInputChange}
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    className="form-control"
                                    placeholder="Tu password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onInputChange}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button className="btn-login" type="submit">
                            <i className="fa-solid fa-right-to-bracket me-2"></i>
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}