
import { useState } from "react";
import { UserForm } from "./componentes/UserForm"
import { UsersList } from "./componentes/UsersList"
import { useUsers } from './hooks/useUsers';
import type { User } from "./interfaces/users.interfaces";

export const UsersApp = () => {

    const { users, handleAddUser, handleRemoveUser } = useUsers();
    const [userSelected, setUserSelected] = useState<User>({} as User);



    const handlereSelectedUser = (user: User) => {
        console.log({ user });
        setUserSelected({ ...user });
    }

    return (
        <>
            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        <UserForm onAddUser={handleAddUser} userSelected={userSelected} />
                    </div>
                    <div className="col">
                        <UsersList users={users} onRemoveUser={handleRemoveUser} onUpdateUser={handlereSelectedUser} />
                    </div>
                </div>

            </div>
        </>

    )
}
