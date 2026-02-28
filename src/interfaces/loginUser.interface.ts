
export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedUser {
    username: string;
}

export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export interface AuthState {
    //authStatus: AuthStatus;
    isAuth: boolean;
    loggedUser: LoggedUser | null;
}
