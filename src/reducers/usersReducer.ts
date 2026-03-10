import type { User } from "../interfaces/users.interfaces"

export type UsersAction =
    | { type: 'SET_USERS'; payload: User[] }
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: number }
    | { type: 'UPDATE_USER'; payload: User };

// logic similar to usersSlice
export const usersReducer = (state: User[] = [], action: UsersAction): User[] => {

    switch (action.type) {
        case 'SET_USERS':
            return [...action.payload];
        case 'ADD_USER':
            return [
                ...state,
                {
                    ...action.payload,
                    //id: new Date().getTime()
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
                        action.payload : user
                )];

        default:
            return [
                ...state
            ];
    }
}
