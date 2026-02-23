import { useReducer } from "react";
import Swal from "sweetalert2";

import type { User } from "../interfaces/users.interfaces";
import { usersReducer } from "../reducers/usersReducer";

// TODO guardar en localStorage, para persistir los datos aunque se recargue la página
const initialUsers: User[] = [
    {
        id: 1,
        userName: 'Juan',
        password: '123456',
        email: 'juan@example.com'
    },
    {
        id: 2,
        userName: 'Maria',
        password: '654321',
        email: 'maria@example.com'
    },
    {
        id: 3,
        userName: 'Carlos',
        password: 'password123',
        email: 'carlos@example.com'
    },
    {
        id: 4,
        userName: 'Ana',
        password: 'secure456',
        email: 'ana@example.com'
    },
    {
        id: 5,
        userName: 'Luis',
        password: 'pass789',
        email: 'luis@example.com'
    }
];

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    console.log({ users });

    const handleAddUser = (user: User) => {
        dispatch({
            type: (user.id === 0) ? 'ADD_USER' : 'UPDATE_USER',
            payload: user
        });

        const action = (user.id === 0) ? 'Creado' : 'Actualizado';

        Swal.fire(
            `Usuario ${action}`,
            `El usuario ha sido ${action.toLowerCase()} con exito!`,
            'success'
        );
    }

    const handleRemoveUser = (id: number) => {
        dispatch({
            type: 'REMOVE_USER',
            payload: id
        });
        Swal.fire(
            'Usuario Eliminado!',
            'El usuario ha sido eliminado con exito!',
            'success'
        );
    }

    return {
        users,

        handleAddUser,
        handleRemoveUser,
    }
}
