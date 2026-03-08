import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserRow } from "./UserRow";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersList = () => {

    const { users } = useContext(UserContext);
    const { login } = useContext(AuthContext);
    console.log('********************************')
    console.log({ users });

    return (
        <>
            <div>Listado de Usuarios</div>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        {
                            login.isAdmin && (
                                <>
                                    <th>Update</th>
                                    <th>Update Page</th>
                                    <th>Remove</th>
                                </>
                            )
                        }

                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>


        </>
    )
}
