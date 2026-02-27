import { useState } from "react";
import { UserForm } from "../componentes/UserForm"
import type { User } from "../interfaces/users.interfaces";

interface Props {
    //userSelected: User;
    handleAddUser: (user: User) => void;
    handleCloseForm: () => void;
}

export const RegisterPage = ({ handleAddUser, handleCloseForm }: Props) => {

    const [userSelected, setUserSelected] = useState<User>({} as User);

    return (
        <div className="container my-4">
            <h4>Registro de Usuarios</h4>
            <div className="row">
                <div className="col">
                    <UserForm
                        onAddUser={handleAddUser}
                        userSelected={userSelected}
                        handleCloseForm={handleCloseForm}
                    />
                </div>
            </div>
        </div>
    )
}
