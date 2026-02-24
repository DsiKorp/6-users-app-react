import type { AuthState } from "../../interfaces/loginUser.interface";

export const loginReducer = (state: AuthState = {} as AuthState, action: any) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                isAuth: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                isAuth: false,
                user: undefined,
            };
        default:
            return {...state};
    }

}