import type { User } from "../interfaces/users.interfaces";
import { UserRow } from "./UserRow";

interface Props {
    users: User[];
    onRemoveUser: (id: number) => void;
    onUpdateUser: (user: User) => void;
}

export const UsersList = ({ users, onRemoveUser, onUpdateUser }: Props) => {
    return (
        <>
            <div>Listado de Usuarios</div>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Update</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserRow key={user.id} user={user} onRemoveUser={onRemoveUser} onUpdateUser={onUpdateUser} />
                    ))}
                </tbody>
            </table>


        </>
    )
}
