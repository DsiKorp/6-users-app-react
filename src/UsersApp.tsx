
import { UserForm } from "./componentes/UserForm"
import { UsersList } from "./componentes/UsersList"
import { useUsers } from './hooks/useUsers';

export const UsersApp = () => {

    const { users, userSelected, handleAddUser, handleRemoveUser, handlereSelectedUser } = useUsers();

    return (
        <>
            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        <UserForm
                            onAddUser={handleAddUser}
                            userSelected={userSelected}
                        />
                    </div>
                    <div className="col">
                        <UsersList
                            users={users}
                            onRemoveUser={handleRemoveUser}
                            onUpdateUser={handlereSelectedUser}
                        />
                    </div>
                </div>

            </div>
        </>

    )
}
