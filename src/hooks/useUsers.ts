import { use, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { useSwal } from "./useSwal";
import type { User } from "../interfaces/users.interfaces";
import { usersReducer } from "../reducers/usersReducer";
import { useNavigate } from "react-router-dom";
//import { initialUsers } from '../mock-data/users.mock';
import { useUsersQuery } from "../auth/hooks/useUsersQuery";
import { saveUserAction } from "../auth/actions/save-user.action";
import { updateUserAction } from "../auth/actions/update-user.action";
import { deleteUserAction } from "../auth/actions/delete-user.action";
import { AuthContext } from "../auth/context/AuthContext";

const initialErrors = {
    username: '',
    email: '',
    password: '',
}

type UserFormErrors = typeof initialErrors;

interface ValidationErrorItem {
    field: string;
    message: string;
}

interface ValidationErrorResponse {
    type: string;
    message: string;
    errors?: ValidationErrorItem[];
}

const getMappedValidationErrors = (validationError?: ValidationErrorResponse): UserFormErrors => {
    const mappedErrors: UserFormErrors = { ...initialErrors };

    if (!validationError) return mappedErrors;

    if (validationError.errors?.length) {
        return validationError.errors.reduce<UserFormErrors>((acc, currentError) => {
            if (currentError.field === 'username' || currentError.field === 'email' || currentError.field === 'password') {
                acc[currentError.field] = currentError.message;
            }

            return acc;
        }, mappedErrors);
    }

    if (validationError.type === 'email-already-exists') {
        mappedErrors.email = validationError.message;
        return mappedErrors;
    }

    if (validationError.type === 'user-already-exists') {
        mappedErrors.username = validationError.message;
        return mappedErrors;
    }

    return mappedErrors;
};

export const useUsers = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { handlerLogout, isTokenAdmin } = use(AuthContext);
    const { data: queriedUsers, isLoading } = useUsersQuery();
    const [users, dispatch] = useReducer(usersReducer, []);
    const [userSelected, setUserSelected] = useState<User>({} as User);
    const { fireSwal, fireSwalUserAction } = useSwal();
    const [isVisibleForm, setIsVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);


    const syncUsersCache = (updater: (currentUsers: User[]) => User[]) => {
        queryClient.setQueryData<User[]>(['users'], (currentUsers = []) => updater(currentUsers));
    };

    useEffect(() => {
        if (!queriedUsers) return;

        dispatch({
            type: 'SET_USERS',
            payload: queriedUsers,
        });
    }, [queriedUsers]);




    const handleAddUser = async (user: User): Promise<boolean> => {
        setErrors(initialErrors);

        try {
            const isNewUser = !user.id;

            if (!isTokenAdmin()) {
                fireSwal({
                    title: 'Acceso Denegado!',
                    html: `No tienes privilegios para <strong> ${isNewUser ? 'crear' : 'actualizar'}</strong> usuarios!`,
                    footer: 'Operacion No completada.',
                    icon: 'error'
                });

                handlerLogout();
                return false;
            }

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

            syncUsersCache((currentUsers) => {
                if (isNewUser) {
                    return [...currentUsers, userDb];
                }

                return currentUsers.map((currentUser) =>
                    currentUser.id === userDb.id ? userDb : currentUser
                );
            });

            void queryClient.invalidateQueries({ queryKey: ['users'] });

            const action = isNewUser ? 'Creado' : 'Actualizado';
            fireSwal({
                title: `Usuario ${action}`,
                html: `El usuario ha sido <strong>${action.toLowerCase()}</strong> con exito!`,
                footer: 'Operacion completada.',
                icon: 'success'
            });
            handleCloseForm();
            navigate('/users');

            return true;
        } catch (error) {
            if (axios.isAxiosError<ValidationErrorResponse>(error)) {
                if (error.response?.status === 401) {
                    handlerLogout();
                    return false;
                }

                const mappedErrors = getMappedValidationErrors(error.response?.data);
                const hasFieldErrors = Object.values(mappedErrors).some(Boolean);

                if (hasFieldErrors) {
                    setErrors(mappedErrors);
                    return false;
                }
            }

            fireSwal({
                title: 'Error',
                text: 'No se pudo guardar el usuario. Intenta nuevamente.',
                icon: 'error'
            });

            return false;
        }

    }

    const handleRemoveUser = (id: number) => {
        if (!isTokenAdmin()) {
            fireSwal({
                title: 'Acceso Denegado!',
                html: 'No tienes privilegios para <strong>eliminar</strong> usuarios!',
                footer: 'Operacion no completada.',
                icon: 'error'
            });
            return;
        }

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

                try {
                    await deleteUserAction(id);

                    dispatch({
                        type: 'REMOVE_USER',
                        payload: id,
                    });

                    syncUsersCache((currentUsers) => currentUsers.filter((user) => user.id !== id));
                    void queryClient.invalidateQueries({ queryKey: ['users'] });

                    fireSwal({
                        title: 'Usuario Eliminado!',
                        html: 'El usuario ha sido <strong>eliminado</strong> con exito!',
                        footer: 'Operacion completada.',
                        icon: 'success'
                    });
                } catch (error) {
                    if (axios.isAxiosError<ValidationErrorResponse>(error)) {
                        if (error.response?.status === 401) {
                            handlerLogout();
                            return false;
                        }

                        const mappedErrors = getMappedValidationErrors(error.response?.data);
                        const hasFieldErrors = Object.values(mappedErrors).some(Boolean);

                        if (hasFieldErrors) {
                            setErrors(mappedErrors);
                            return false;
                        }
                    }

                    fireSwal({
                        title: 'Error',
                        text: 'No se pudo eliminar el usuario. Intenta nuevamente.',
                        icon: 'error'
                    });

                    return false;


                }
            }
        })
    }

    const handlereSelectedUser = (user: User) => {
        console.log({ user });
        setUserSelected({ ...user });
        setIsVisibleForm(true);
    }

    const handleOpenForm = () => {
        setErrors(initialErrors);
        setIsVisibleForm(true);
    }

    const handleCloseForm = () => {
        setErrors(initialErrors);
        setIsVisibleForm(false);
        setUserSelected({} as User);
    }

    return {
        // Properties
        errors,
        isLoading,
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
