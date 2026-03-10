import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { uiSlice } from "./slices/ui/uiSlice";
import { authSlice } from "./auth/authSlice";


export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        ui: uiSlice.reducer,
        auth: authSlice.reducer
    },

})

export type RootState = ReturnType<typeof store.getState>;