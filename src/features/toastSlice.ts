import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { delay } from 'redux-saga/effects';

interface ToastState {
    text: string
    isVisible: boolean
}

const initialState : ToastState = {
    text: '',
    isVisible: false
}

export const ToastSlice = createSlice({
    name: 'Toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
            state.isVisible = true;
        },

        closeToast: (state) => {
            state.isVisible = false;
        }
    }
});

export const { showToast, closeToast } = ToastSlice.actions;

export const selectToast = (state: RootState) => state.toast;