
export interface Credentials {
    username: string;
    password: string;
}

export interface AuthState {
    isAuth: boolean;
    user: Credentials | undefined;
}
