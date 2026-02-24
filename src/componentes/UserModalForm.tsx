import type { User } from "../interfaces/users.interfaces";
import { UserForm } from "./UserForm";

interface Props {
    userSelected: User;
    handleAddUser: (user: User) => void;
    handleCloseForm: () => void;
}

export const UserModalForm = ({ userSelected, handleAddUser, handleCloseForm }: Props) => {
    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex={-1}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {userSelected.id! > 0 ? 'Editar' : 'Crear'} Modal Usuarios
                            </h5>
                        </div>
                        <div className="modal-body">
                            <UserForm
                                onAddUser={handleAddUser}
                                userSelected={userSelected}
                                handleCloseForm={handleCloseForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}