import { useReducer, useState } from "react";

import { useSwal } from "./useSwal";
import type { User } from "../interfaces/users.interfaces";
import { usersReducer } from "../reducers/usersReducer";
import { useNavigate } from "react-router-dom";
import { initialUsers } from "../mock-data/users.mock";

// TODO initialUsers guardar en localStorage, para persistir los datos aunque se recargue la página


export const useUsers = () => {

    const navigate = useNavigate();
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState<User>({} as User);
    const { fireSwal, fireSwalUserAction } = useSwal();
    const [isVisibleForm, setIsVisibleForm] = useState(false);


    console.log({ users });

    const handleAddUser = (user: User) => {
        const isNewUser = !user.id;
        dispatch({
            type: isNewUser ? 'ADD_USER' : 'UPDATE_USER',
            payload: user
        });

        const action = isNewUser ? 'Creado' : 'Actualizado';
        fireSwal({
            title: `Usuario ${action}`,
            html: `El usuario ha sido <strong>${action.toLowerCase()}</strong> con exito!`,
            footer: 'Operacion completada.',
            icon: 'success'
        });
        handleCloseForm();
        navigate('/users');

    }

    const handleRemoveUser = (id: number) => {

        fireSwalUserAction({
            title: 'Esta seguro que desea eliminar?',
            html: "Cuidado el usuario sera <strong>eliminado</strong>!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch({
                    type: 'REMOVE_USER',
                    payload: id,
                });
                fireSwal({
                    title: 'Usuario Eliminado!',
                    html: 'El usuario ha sido <strong>eliminado</strong> con exito!',
                    footer: 'Operacion completada.',
                    icon: 'success'
                });
            }
        })
    }

    const handlereSelectedUser = (user: User) => {
        console.log({ user });
        setUserSelected({ ...user });
        setIsVisibleForm(true);
    }

    const handleOpenForm = () => {
        setIsVisibleForm(true);
    }

    const handleCloseForm = () => {
        setIsVisibleForm(false);
        setUserSelected({} as User);
    }

    return {
        // Properties
        isVisibleForm,
        users,
        userSelected,
        // Methods
        handleAddUser,
        handleCloseForm,
        handleOpenForm,
        handleRemoveUser,
        handlereSelectedUser,
    }
}
