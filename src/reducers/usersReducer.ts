import type { User } from "../interfaces/users.interfaces"

export type UsersAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: number }
    | { type: 'UPDATE_USER'; payload: User };


export const usersReducer = (state: User[] = [], action: UsersAction): User[] => {

    switch (action.type) {
        case 'ADD_USER':
            return [
                ...state,
                {
                    ...action.payload,
                    id: new Date().getTime()
                }
            ];
        case 'REMOVE_USER':
            return [
                ...state.filter(user => user.id !== action.payload)
            ];
        case 'UPDATE_USER':
            return [
                ...state.map(user =>
                    user.id === action.payload.id ?
                        { ...action.payload, password: user.password } : user
                )];

        default:
            return [
                ...state
            ];
    }
}
