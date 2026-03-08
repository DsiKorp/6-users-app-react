
export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedUser {
    username: string;
    //isAdmin?: boolean;
}

export interface AuthState {
    isAuth: boolean;
    isAdmin?: boolean;
    loggedUser: LoggedUser | null;
}
