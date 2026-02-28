import { createContext, type PropsWithChildren } from "react";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../interfaces/users.interfaces";

// PropsWithChildren es un tipo genérico que incluye children y remplaza esta interfaz
// interface UserContextProps {
//     children: React.ReactNode;
// }

interface UserContextProps {
    // state
    users: User[];
    userSelected: User | null;
    isVisibleForm: boolean;

    // Methods
    handleAddUser: (user: User) => void;
    handleRemoveUser: (id: number) => void;
    handlereSelectedUser: (user: User) => void;
    handleOpenForm: () => void;
    handleCloseForm: () => void;

    // children
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {

    const {
        users,
        userSelected,
        handleAddUser,
        handleRemoveUser,
        handlereSelectedUser,
        isVisibleForm,
        handleCloseForm,
        handleOpenForm
    } = useUsers();

    return (
        <UserContext value={{
            users,
            userSelected,
            handleAddUser,
            handleRemoveUser,
            handlereSelectedUser,
            isVisibleForm,
            handleCloseForm,
            handleOpenForm
        }}>
            {children}
        </UserContext>
    )
}