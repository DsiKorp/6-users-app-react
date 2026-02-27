import { NavLink } from "react-router";
import type { User } from "../interfaces/users.interfaces"

interface Props {
    user: User;
    onRemoveUser: (id: number) => void;
    onUpdateUser: (user: User) => void;
}

export const UserRow = ({ user: { id, userName, email }, onRemoveUser, onUpdateUser }: Props) => {

    return (
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{userName}</td>
                <td>{email}</td>
                <td>
                    <button
                        onClick={() => onUpdateUser({ id, userName, email })}
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
                    <button onClick={() => onRemoveUser(id!)} type="button" className="btn btn-outline-danger btn-sm">
                        Remove
                    </button>
                </td>
            </tr>
        </>

    )
}
