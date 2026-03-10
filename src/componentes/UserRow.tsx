import { NavLink } from "react-router";
//import { use } from "react";

import type { User } from "../interfaces/users.interfaces"
//import { UserContext } from "../context/UserContext";
//import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

interface Props {
    user: User;
}

export const UserRow = ({ user: { id, username, email, admin } }: Props) => {
    //onRemoveUser={} onUpdateUser={}
    //const { handleRemoveUser, handlereSelectedUser } = useContext(UserContext);
    const { handleRemoveUser, handlereSelectedUser } = useUsers();
    // const { isTokenAdmin } = use(AuthContext);
    const { isTokenAdmin } = useAuth();

    // console.log('id: ', id);
    // console.log('username: ', username);
    // console.log('email: ', email);

    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                {
                    isTokenAdmin() && (
                        <>
                            <td>
                                <button
                                    onClick={() => handlereSelectedUser({ id, username, email, admin })}
                                    type="button"
                                    className="btn btn-outline-primary btn-sm">
                                    Update
                                </button>
                            </td>
                            <td>
                                <NavLink
                                    to={`/users/edit/${id}`}
                                    className="btn btn-outline-secondary btn-sm"
                                >
                                    Update Page
                                </NavLink>
                            </td>
                            <td>
                                <button onClick={() => handleRemoveUser(id!)} type="button" className="btn btn-outline-danger btn-sm">
                                    Remove
                                </button>
                            </td>
                        </>
                    )
                }
            </tr>
        </>

    )
}
