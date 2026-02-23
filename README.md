
# Users App (React + TypeScript)

Small users CRUD demo built with Vite + React + TypeScript. The UI lets you create, update, and remove users in memory.

## Features

- Add users with name, email, and password
- Update users (name and email). Password is kept from the existing user
- Remove users
- Basic required-field validation in the form
- Success alerts with SweetAlert2

## How it works

- State is managed with a reducer in `useUsers`
- Initial users are hardcoded in the hook
- The form switches between create and update mode based on the selected user

## Project structure

- `src/UsersApp.tsx`: main layout and wiring
- `src/componentes/UserForm.tsx`: user form (create/update)
- `src/componentes/UsersList.tsx`: table list
- `src/componentes/UserRow.tsx`: row actions
- `src/hooks/useUsers.ts`: reducer + actions + alerts
- `src/reducers/usersReducer.ts`: add/update/remove reducer
- `src/interfaces/users.interfaces.ts`: `User` type

## Scripts

- `npm run dev`: start dev server
- `npm run build`: typecheck and build
- `npm run lint`: run eslint
- `npm run preview`: preview production build

## Notes

- Data is in memory only. There is a TODO in `useUsers` to persist in localStorage.

