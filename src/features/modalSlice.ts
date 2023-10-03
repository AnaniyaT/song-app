import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import emptyComponent from '../components/emptyComponent';
import { ReactNode } from 'react';

interface ModalState {
    component: React.ReactNode
    isVisible: boolean
}

const initialState : ModalState = {
    component: emptyComponent(),
    isVisible: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ReactNode>) => {
            state.component = action.payload;
            state.isVisible = true;
        },

        closeModal: (state) => {
            state.isVisible = false;
        }
    }
});

export const {  openModal, closeModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal.component;