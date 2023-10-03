import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Theme } from '../types';
import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeState {
    theme: Theme
    isDarkMode: boolean
}

const initialState : ThemeState = {
    theme: localStorage.getItem('isDarkMode') === 'true' ? darkTheme : lightTheme,
    isDarkMode: localStorage.getItem('isDarkMode') === 'true' ? true : false
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
        changeTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            if (state.isDarkMode) {
                localStorage.setItem('isDarkMode', 'true');
            } else {
                localStorage.removeItem('isDarkMode');
            }
            console.log(localStorage.getItem('isDarkMode'));
            state.theme = state.isDarkMode ? darkTheme : lightTheme;
        },
        setDarkMode: (state) => {
            state.isDarkMode = true;
            localStorage.setItem('isDarkMode', 'true');
            state.theme = darkTheme;
        },
    }

});

export const { setTheme, changeTheme, setDarkMode } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;