
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
    isAdmin?: boolean | false;
    loggedUser: LoggedUser | null;
    //isTokenAdmin: boolean | false;
}
