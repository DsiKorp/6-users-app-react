import type { User } from "../interfaces/users.interfaces"

export const usersReducer = (state: User[] = [], action: any): User[] => {

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
