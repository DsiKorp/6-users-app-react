export interface ErrorsWS {
    type: string;
    message: string;
    errors: Error[];
}

export interface Error {
    field: string;
    message: string;
}
