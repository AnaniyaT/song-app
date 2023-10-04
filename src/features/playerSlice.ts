import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Song } from '../types';

interface PlayerState {
    isVisible: boolean,
    currentSong?: Song,
    isPlaying: boolean
}

const initialState : PlayerState = {
    currentSong: undefined,
    isVisible: true,
    isPlaying: false,
}

export const PlayerSlice = createSlice({
    name: 'Player',
    initialState,
    reducers: {
        showPlayer: (state) => {
            state.isVisible = true;
        },

        closePlayer: (state) => {
            state.isVisible = false;
        },

        changePlayerVisibility: (state) => {
            state.isVisible = !state.isVisible;
        },

        playSong: (state, action: PayloadAction<Song>) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
        },

        play: (state) => {
            state.isPlaying = true;
        },

        pause: (state) => {
            state.isPlaying = false;
        },

        tooglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        }
    }
});

export const { showPlayer, closePlayer, changePlayerVisibility, playSong, play, pause, tooglePlay } = PlayerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;