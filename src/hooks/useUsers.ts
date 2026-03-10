import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { useSwal } from "./useSwal";
import type { User } from "../interfaces/users.interfaces";
//import { usersReducer } from "../reducers/usersReducer";
import {
    getMappedValidationErrors,
    onSetUsers,
    onAddUser,
    onRemoveUser,
    onUpdateUser,
    onUserSelectedForm,
    onSetUserErrors,
    onClearUserErrors,
    type UsersState,
    type ValidationErrorResponse,
} from "../store/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";
//import { initialUsers } from '../mock-data/users.mock';
import { useUsersQuery } from "../auth/hooks/useUsersQuery";
import { saveUserAction } from "../auth/actions/save-user.action";
import { updateUserAction } from "../auth/actions/update-user.action";
import { deleteUserAction } from "../auth/actions/delete-user.action";
//import { AuthContext } from "../auth/context/AuthContext";
import { onCloseModal, onOpenModal } from "../store/slices/ui/uiSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {

    const navigate = useNavigate();
    //const [users, dispatch] = useReducer(usersReducer, []);
    // REDUX
    const { users, userSelected, errors } = useSelector((state: { users: UsersState }) => state.users);
    const { isVisibleForm } = useSelector((state: { ui: { isVisibleForm: boolean } }) => state.ui);
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    //const { handlerLogout, isTokenAdmin } = use(AuthContext);
    const { handlerLogout, isTokenAdmin } = useAuth();
    const { data: usersDb, isLoading } = useUsersQuery();

    //const [userSelected, setUserSelected] = useState<User>({} as User);
    const { fireSwal, fireSwalUserAction } = useSwal();
    //const [isVisibleForm, setIsVisibleForm] = useState(false);


    const syncUsersCache = (updater: (currentUsers: User[]) => User[]) => {
        queryClient.setQueryData<User[]>(['users'], (currentUsers = []) => updater(currentUsers));
    };

    useEffect(() => {
        if (!usersDb) return;
        dispatch(onSetUsers([...usersDb]));

        // dispatch({
        //     type: 'SET_USERS',
        //     payload: usersDb,
        // });
    }, [dispatch, usersDb]);




    const handleAddUser = async (user: User): Promise<boolean> => {
        dispatch(onClearUserErrors());

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
                dispatch(onAddUser({ ...userDb }));
            } else {
                const currentUser = users.find((stateUser) => stateUser.id === user.id);
                const userToUpdate = {
                    ...user,
                    password: user.password || currentUser?.password,
                };
                userDb = await updateUserAction(userToUpdate);
                dispatch(onUpdateUser({ ...userDb }));
            }

            // dispatch({
            //     type: isNewUser ? 'ADD_USER' : 'UPDATE_USER',
            //     payload: userDb
            // });

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
                    dispatch(onSetUserErrors(mappedErrors));
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
                    dispatch(onRemoveUser(id));
                    // dispatch({
                    //     type: 'REMOVE_USER',
                    //     payload: id,
                    // });

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
                            dispatch(onSetUserErrors(mappedErrors));
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
        //setUserSelected({ ...user });
        dispatch(onUserSelectedForm({ ...user }));
        //setIsVisibleForm(true);
        dispatch(onOpenModal());
    }

    const handleOpenForm = () => {
        dispatch(onClearUserErrors());
        //setIsVisibleForm(true);
        dispatch(onOpenModal());
    }

    const handleCloseForm = () => {
        dispatch(onClearUserErrors());
        //setIsVisibleForm(false);
        dispatch(onCloseModal());
        //setUserSelected({} as User);        
        dispatch(onUserSelectedForm({} as User));
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
