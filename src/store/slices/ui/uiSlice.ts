
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isVisibleForm: false
    },
    reducers: {
        onOpenModal: (state) => {
            state.isVisibleForm = true;
        },
        onCloseModal: (state) => {
            state.isVisibleForm = false;

            // si no se usa toolkit tocaria:
            // return {
            //     ...state,
            //     isVisibleForm: false
            // }
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal } = uiSlice.actions;

// El slice es el reducer para el estado de la ui