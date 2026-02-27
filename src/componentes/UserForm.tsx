import { useEffect, useState } from "react";
import type { User } from "../interfaces/users.interfaces";
import { useSwal } from "../hooks/useSwal";

interface Props {
    userSelected?: User;
    onAddUser: (user: User) => void;
    handleCloseForm: () => void;
}

// const initialUserForm = {
//     id: 0,
//     userName: "",
//     email: "",
//     password: ""
// }

export const UserForm = ({ userSelected, onAddUser, handleCloseForm }: Props) => {

    const [userForm, setUserForm] = useState(userSelected || {} as User);
    const { id, userName, email, password } = userForm;
    const { fireSwal } = useSwal();

    const isAddingMode: boolean = (id === 0 || id === undefined);

    // console.log({ id })

    useEffect(() => {
        if (userSelected?.id) {
            setUserForm({
                ...userSelected,
                password: ""
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

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userName || !email || (isAddingMode && !password)) {
            fireSwal({
                title: 'Error',
                html: 'Todos los campos <strong>son obligatorios</strong>',
                icon: 'error'
            });
            return;
        }

        onAddUser({ ...userForm });
        setUserForm({} as User);
    }

    const onCloseForm = () => {
        setUserForm({} as User);
        handleCloseForm();
    }


    return (
        <>
            <div>Formulario de Usuario</div>
            <form onSubmit={onSubmit}>
                <input type="text"
                    name="userName"
                    className="form-control my-3 w-75"
                    placeholder="Usuario"
                    onChange={onInputChange}
                    value={userName}
                />
                <input type="email"
                    name="email"
                    className="form-control my-3 w-75"
                    placeholder="Email"
                    onChange={onInputChange}
                    value={email}
                />
                {
                    isAddingMode && (
                        <input type="password"
                            name="password"
                            className="form-control my-3 w-75"
                            placeholder="Password"
                            onChange={onInputChange}
                            value={password}
                        />
                    )

                }

                <input
                    type="hidden"
                    name="id"
                    value={id}
                />
                <button type="submit" className="btn btn-primary">
                    {isAddingMode ? "Crear Usuario" : "Actualizar Usuario"}
                </button>
                <button type="button" className="btn btn-secondary mx-3" onClick={onCloseForm}>
                    Cerrar
                </button>
            </form>
        </>
    )
}
