import { UserModalForm } from "../componentes/UserModalForm";
import { UsersList } from "../componentes/UsersList";
import { useUsers } from "../hooks/useUsers";


export const UsersPage = () => {

    const { users, userSelected, handleAddUser, handleRemoveUser,
        handlereSelectedUser, isVisibleForm, handleCloseForm, handleOpenForm } = useUsers();

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
