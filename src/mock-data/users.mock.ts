import type { User } from "../interfaces/users.interfaces";

export const initialUsers: User[] = [
    {
        id: 1,
        userName: 'Juan',
        password: '123456',
        email: 'juan@example.com'
    },
    {
        id: 2,
        userName: 'Maria',
        password: '654321',
        email: 'maria@example.com'
    },
    {
        id: 3,
        userName: 'Carlos',
        password: 'password123',
        email: 'carlos@example.com'
    },
    {
        id: 4,
        userName: 'Ana',
        password: 'secure456',
        email: 'ana@example.com'
    },
    {
        id: 5,
        userName: 'Luis',
        password: 'pass789',
        email: 'luis@example.com'
    }
];