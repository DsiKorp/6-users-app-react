import { useContext, useEffect, useState } from "react";
import type { User } from "../interfaces/users.interfaces";
import { UserContext } from "../context/UserContext";

interface Props {
    userSelected?: User;
    //onAddUser: (user: User) => void;
    handleCloseForm?: () => void;
}

export const UserForm = ({ userSelected, handleCloseForm }: Props) => {

    const { handleAddUser, errors } = useContext(UserContext);

    const [userForm, setUserForm] = useState(userSelected || {} as User);
    const { id, username, email, password } = userForm;

    const isAddingMode: boolean = (id === 0 || !id);

    // console.log({ id })

    useEffect(() => {
        if (userSelected?.id) {
            setUserForm({
                ...userSelected,
            });
        } else {
            setUserForm({} as User);
        }
    }, [userSelected]);

    const onInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({
            ...userForm,
            [name]: value
        });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // if (!username || !email || (isAddingMode && !password)) {
        //     fireSwal({
        //         title: 'Error',
        //         html: 'Todos los campos <strong>son obligatorios</strong>',
        //         icon: 'error'
        //     });
        //     return;
        // }

        // ya se valida en el input type email, 
        // pero por las dudas validamos que incluya un @   
        // if (!email.includes('@')) {
        //     fireSwal({
        //         title: 'Error de validacion email',
        //         html: 'El email debe ser valido, incluir un @!',
        //         icon: 'error'
        //     });
        //     return;
        // }

        await handleAddUser({ ...userForm });
    }

    const onCloseForm = () => {
        setUserForm({} as User);
        handleCloseForm?.();
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label className="form-label">Usuario</label>
                <div className="input-icon">
                    <i className="fa-solid fa-user"></i>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Nombre de usuario"
                        onChange={onInputChange}
                        value={username || ''}
                    />
                    <p className="text-danger">{errors?.username}</p>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-icon">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="correo@ejemplo.com"
                        onChange={onInputChange}
                        value={email || ''}
                    />
                    <p className="text-danger">{errors?.email}</p>
                </div>
            </div>

            {
                isAddingMode && (
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-icon">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Contraseña segura"
                                onChange={onInputChange}
                                value={password || ''}
                            />
                            <p className="text-danger">{errors?.password}</p>
                        </div>
                    </div>
                )
            }

            <input
                type="hidden"
                name="id"
                value={id ?? ''}
            />

            <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn-login flex-grow-1">
                    <i className={`fa-solid ${isAddingMode ? 'fa-plus' : 'fa-save'} me-2`}></i>
                    {isAddingMode ? "Crear Usuario" : "Actualizar Usuario"}
                </button>

                {
                    handleCloseForm && (
                        <button type="button" className="btn-secondary-modern" onClick={onCloseForm}>
                            <i className="fa-solid fa-xmark me-1"></i>
                            Cerrar
                        </button>
                    )
                }
            </div>
        </form>
    )
}
