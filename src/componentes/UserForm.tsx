import { useEffect, useState } from "react";
import type { User } from "../interfaces/users.interfaces";

interface Props {
    userSelected?: User;
    onAddUser: (user: User) => void;
}

const initialUserForm = {
    id: 0,
    userName: "",
    email: "",
    password: ""
}

export const UserForm = ({ userSelected, onAddUser }: Props) => {

    const [userForm, setUserForm] = useState(userSelected || initialUserForm);
    const { id, userName, email, password } = userForm;

    const isAddingMode: boolean = (id === 0 || id === undefined);

    console.log({ id })

    useEffect(() => {
        if (userSelected) {
            setUserForm({
                ...userSelected,
                // password: ""
            });
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
            alert("Todos los campos son obligatorios");
            return;
        }

        onAddUser({ ...userForm });
        setUserForm(initialUserForm);
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
            </form>
        </>
    )
}
