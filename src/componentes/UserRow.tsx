import { NavLink } from "react-router";
import type { User } from "../interfaces/users.interfaces"
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

interface Props {
    user: User;
}

export const UserRow = ({ user: { id, username, email } }: Props) => {
    //onRemoveUser={} onUpdateUser={}
    const { handleRemoveUser, handlereSelectedUser } = useContext(UserContext);

    // console.log('id: ', id);
    // console.log('username: ', username);
    // console.log('email: ', email);

    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>
                    <button
                        onClick={() => handlereSelectedUser({ id, username, email })}
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
            </tr>
        </>

    )
}
