import { useState } from "react";
import Swal from "sweetalert2";
import type { Credentials } from "../../interfaces/loginUser.interface";

interface Props {
    handlerLogin: (credentials: Credentials) => void;
}

const initialLoginForm = {
    username: '',
    password: '',
}
export const LoginPage = () => {

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
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }

        // aca implementamos el login
        //handlerLogin({ username, password });

        setLoginForm(initialLoginForm);
    }
    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-0 pb-0">
                            <div>
                                <h5 className="modal-title mb-1">Login Page</h5>
                                <p className="text-muted mb-0">Accede con tus credenciales</p>
                            </div>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="modal-body pt-3">
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        className="form-control"
                                        placeholder="Tu usuario"
                                        name="username"
                                        value={username}
                                        onChange={onInputChange}
                                        autoComplete="username"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
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
                            <div className="modal-footer border-0 pt-0">
                                <div className="d-grid w-100">
                                    <button className="btn btn-primary" type="submit">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );

}