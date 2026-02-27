import { UserModalForm } from "../componentes/UserModalForm";
import { UsersList } from "../componentes/UsersList";
import type { User } from '../interfaces/users.interfaces';


interface Props {
    users: User[];
    userSelected: User;
    isVisibleForm: boolean;
    handleAddUser: (user: User) => void;
    handleRemoveUser: (id: number) => void;
    handlereSelectedUser: (user: User) => void;
    handleCloseForm: () => void;
    handleOpenForm: () => void;
}

export const UsersPage = ({
    users,
    userSelected,
    handleAddUser,
    handleRemoveUser,
    handlereSelectedUser,
    isVisibleForm,
    handleCloseForm,
    handleOpenForm
}: Props) => {

    return (
        <>
            {
                isVisibleForm && (
                    <UserModalForm
                        userSelected={userSelected}
                        handleAddUser={handleAddUser}
                        handleCloseForm={handleCloseForm}
                    />
                )
            }

            <div className="container my-4">
                <h2>Administración de Usuarios App</h2>
                <div className="row">
                    <div className="col">
                        <button
                            className="btn btn-secondary mb-3"
                            onClick={handleOpenForm}
                            disabled={isVisibleForm}
                        >
                            Nuevo Usuario
                        </button>

                        {
                            users.length === 0
                                ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                                : <UsersList
                                    users={users}
                                    onRemoveUser={handleRemoveUser}
                                    onUpdateUser={handlereSelectedUser}
                                />
                        }
                    </div>
                </div>

            </div>
        </>

    )
}
