//import { useContext } from "react";

import { UserModalForm } from "../componentes/UserModalForm";
import { UsersList } from "../componentes/UsersList";
//import { UserContext } from "../context/UserContext";
//import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { LoaderPage } from "../componentes/LoaderPage";
import { Paginator } from "../componentes/Paginator";

export const UsersPage = () => {

    //const {page} = useParams();
    //const { users, isVisibleForm, handleOpenForm } = useContext(UserContext);
    const { users, isVisibleForm, handleOpenForm, isLoading, paginator } = useUsers();
    //const { isTokenAdmin } = useContext(AuthContext)
    const { isTokenAdmin } = useAuth();

    const hasUsers = (users?.length ?? 0) > 0;

    if (isLoading) {
        return (
            <LoaderPage title="Cargando usuarios..." message="Por favor espere" />
        );
    }

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
                        {
                            isTokenAdmin() && (
                                <button
                                    className="btn btn-secondary mb-3"
                                    onClick={handleOpenForm}
                                    disabled={isVisibleForm}
                                >
                                    Nuevo Usuario
                                </button>
                            )
                        }

                        {!hasUsers
                            ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                            : <>
                                <UsersList />
                                {paginator && <Paginator url="/users/page" paginator={paginator} />}
                            </>
                        }
                    </div>
                </div>

            </div>
        </>

    )
}
