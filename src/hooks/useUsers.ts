import { useEffect, useReducer, useState } from "react";

import { useSwal } from "./useSwal";
import type { User } from "../interfaces/users.interfaces";
import { usersReducer } from "../reducers/usersReducer";
import { useNavigate } from "react-router-dom";
//import { initialUsers } from '../mock-data/users.mock';
import { useQueryUsers } from "../auth/hooks/useQueryUsers";
import { saveUserAction } from "../auth/actions/save-user.action";
import { updateUserAction } from "../auth/actions/update-user.action";
import { deleteUserAction } from "../auth/actions/delete-user.action";

export const useUsers = () => {

    const navigate = useNavigate();
    const { data: queriedUsers } = useQueryUsers();
    const [users, dispatch] = useReducer(usersReducer, []);
    const [userSelected, setUserSelected] = useState<User>({} as User);
    const { fireSwal, fireSwalUserAction } = useSwal();
    const [isVisibleForm, setIsVisibleForm] = useState(false);

    useEffect(() => {
        if (!queriedUsers) return;

        dispatch({
            type: 'SET_USERS',
            payload: queriedUsers,
        });
    }, [queriedUsers]);

    const handleAddUser = async (user: User) => {
        const isNewUser = !user.id;
        let userDb: User;

        if (isNewUser) {
            userDb = await saveUserAction(user);
        } else {
            const currentUser = users.find((stateUser) => stateUser.id === user.id);
            const userToUpdate = {
                ...user,
                password: user.password || currentUser?.password,
            };
            userDb = await updateUserAction(userToUpdate);
        }

        dispatch({
            type: isNewUser ? 'ADD_USER' : 'UPDATE_USER',
            payload: userDb
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
        }).then(async (result) => {
            if (result.isConfirmed) {

                await deleteUserAction(id);

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
