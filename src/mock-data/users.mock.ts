import type { User } from "../interfaces/users.interfaces";

export const initialUsers: User[] = [
    {
        id: 1,
        username: 'Juan',
        password: '123456',
        email: 'juan@example.com',
        admin: false
    },
    {
        id: 2,
        username: 'Maria',
        password: '654321',
        email: 'maria@example.com',
        admin: false
    },
    {
        id: 3,
        username: 'Carlos',
        password: 'password123',
        email: 'carlos@example.com',
        admin: false
    },
    {
        id: 4,
        username: 'Ana',
        password: 'secure456',
        email: 'ana@example.com',
        admin: false
    },
    {
        id: 5,
        username: 'Luis',
        password: 'pass789',
        email: 'luis@example.com',
        admin: false
    }
];