//import { use } from "react";
//import { UserContext } from "../context/UserContext";
import { UserRow } from "./UserRow";
//import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {

    //const { users } = useContext(UserContext);
    const { users } = useUsers();
    //const { isTokenAdmin } = use(AuthContext);
    const { isTokenAdmin } = useAuth();

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
                            isTokenAdmin() && (
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
