
export interface Credentials {
    username: string;
    password?: string;
}

export interface LoggedUser {
    username: string;
}

export interface AuthState {
    isAuth: boolean;
    loggedUser: LoggedUser | null;
}
