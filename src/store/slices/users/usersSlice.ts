import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../../interfaces/users.interfaces';

export interface UserFormErrors {
    username: string;
    email: string;
    password: string;
}

interface ValidationErrorItem {
    field: string;
    message: string;
}

export interface ValidationErrorResponse {
    type: string;
    message: string;
    errors?: ValidationErrorItem[];
}

export const initialUserFormErrors: UserFormErrors = {
    username: '',
    email: '',
    password: '',
};

const isUserFormErrorField = (field: string): field is keyof UserFormErrors => {
    return field === 'username' || field === 'email' || field === 'password';
};

export const getMappedValidationErrors = (validationError?: ValidationErrorResponse): UserFormErrors => {
    const mappedErrors: UserFormErrors = { ...initialUserFormErrors };

    if (!validationError) return mappedErrors;

    if (validationError.errors?.length) {
        return validationError.errors.reduce<UserFormErrors>((acc, currentError) => {
            if (isUserFormErrorField(currentError.field)) {
                acc[currentError.field] = currentError.message;
            }

            return acc;
        }, mappedErrors);
    }

    if (validationError.type === 'email-already-exists') {
        mappedErrors.email = validationError.message;
        return mappedErrors;
    }

    if (validationError.type === 'user-already-exists') {
        mappedErrors.username = validationError.message;
        return mappedErrors;
    }

    return mappedErrors;
};

export interface UsersState {
    users: User[];
    userSelected: User;
    errors: UserFormErrors;
}

const initialState: UsersState = {
    users: [],
    userSelected: {} as User,
    errors: { ...initialUserFormErrors },
};

// logic similar to usersReducer
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        onSetUsers: (state, { payload }: PayloadAction<User[]>) => {
            state.users = [...payload];
        },
        onAddUser: (state, { payload }: PayloadAction<User>) => {
            state.users = [
                ...state.users,
                {
                    ...payload,
                }
            ];

            state.userSelected = {} as User;
        },
        onRemoveUser: (state, { payload }: PayloadAction<number>) => {
            state.users = [
                ...state.users.filter(user => user.id !== payload)
            ];
        },
        onUpdateUser: (state, { payload }: PayloadAction<User>) => {
            state.users = [
                ...state.users.map(user =>
                    user.id === payload.id ?
                        payload : user
                )];

            state.userSelected = {} as User;
        },
        onUserSelectedForm: (state, { payload }: PayloadAction<User>) => {
            state.userSelected = { ...payload };
        },
        onSetUserErrors: (state, { payload }: PayloadAction<UserFormErrors>) => {
            state.errors = { ...payload };
        },
        onSetValidationErrors: (state, { payload }: PayloadAction<ValidationErrorResponse | undefined>) => {
            state.errors = getMappedValidationErrors(payload);
        },
        onClearUserErrors: (state) => {
            state.errors = { ...initialUserFormErrors };
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onAddUser,
    onRemoveUser,
    onSetUsers,
    onUpdateUser,
    onUserSelectedForm,
    onSetUserErrors,
    onSetValidationErrors,
    onClearUserErrors,
} = usersSlice.actions;
