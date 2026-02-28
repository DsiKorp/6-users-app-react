import { useContext } from "react";
import { UserModalForm } from "../componentes/UserModalForm";
import { UsersList } from "../componentes/UsersList";
import { UserContext } from "../context/UserContext";


export const UsersPage = () => {

    const { users, isVisibleForm, handleOpenForm } = useContext(UserContext);

    return (
        <>
            {
                isVisibleForm && (
                    <UserModalForm />
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
                                : <UsersList />
                        }
                    </div>
                </div>

            </div>
        </>

    )
}
