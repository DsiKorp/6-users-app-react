import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserForm } from "../componentes/UserForm"
import type { User } from "../interfaces/users.interfaces";

interface Props {
    users?: User[];
    handleAddUser: (user: User) => void;
    //handleCloseForm: () => void;
}

export const RegisterPage = ({ users = [], handleAddUser }: Props) => {

    const [userSelected, setUserSelected] = useState<User>({} as User);
    const { id } = useParams();

    useEffect(() => {
        if (id && users) {
            const userFound = users.find(user => user.id === Number(id));

            if (userFound) {
                setUserSelected(userFound);
                return;
            }

            setUserSelected({} as User);
        }
    }, [id, users]);

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="register-card">
                        <div className="register-header">
                            <div className="icon-circle">
                                <i className={`fa-solid ${id ? 'fa-user-pen' : 'fa-user-plus'}`}></i>
                            </div>
                            <h2>{id ? "Editar" : "Registrar"} Usuario</h2>
                            <p>{id ? "Edita" : "Completa"} los datos del usuario</p>
                        </div>
                        <div className="register-body">
                            <UserForm
                                userSelected={userSelected}
                                onAddUser={handleAddUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
