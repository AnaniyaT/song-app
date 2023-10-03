import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Song } from '../types';

interface SongState {
    Songs: Song[]
    isPlaying: boolean
    currentSong?: Song
    isLoadingSong: boolean
    isLoadingSongError: boolean
    isLoading: boolean
    isLoadingError: boolean
    isLoadingEdit: boolean
    isLoadingEditError: boolean
    isLoadingDelete: boolean
    isLoadingDeleteError: boolean
    isLoadingCreate: boolean
    isLoadingCreateError: boolean
}

export interface AddSongRequestPayload {
    e: React.FormEvent<HTMLFormElement>,
    duration: string
}

const initialState : SongState = {
    Songs: [],
    isPlaying: false,
    currentSong: undefined,
    isLoading: false,
    isLoadingError: false,
    isLoadingSong: false,
    isLoadingSongError: false,
    isLoadingEdit: false,
    isLoadingEditError: false,
    isLoadingDelete: false,
    isLoadingDeleteError: false,
    isLoadingCreate: false,
    isLoadingCreateError: false,
}

export const SongSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        fetchSongsRequest: (state) => {
            state.isLoading = true;
            state.isLoadingError = false;
        },
        fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
            state.Songs = action.payload;
            state.isLoading = false;
            state.isLoadingError = false;
        },
        fetchSongsFailure: (state) => {
            state.isLoading = false;
            state.isLoadingError = true;
        },
        fetchSongRequest: (state, action: PayloadAction<number>) => {
            state.isLoadingSong = true;
            state.isLoadingSongError = false;
        },
        fetchSongSuccess: (state, action: PayloadAction<Song>) => {
            state.currentSong = action.payload;
            state.isLoadingSong = false;
            state.isLoadingSongError = false;
        },
        fetchSongFailure: (state) => {
            state.isLoadingSong = false;
            state.isLoadingSongError = true;
        },
        addSongRequest: (state, action: PayloadAction<AddSongRequestPayload>) => {
            state.isLoadingCreate = true;
            state.isLoadingCreateError = false;
        },
        addSongSuccess: (state, action: PayloadAction<Song>) => {
            state.Songs.push(action.payload);
            state.isLoadingCreate = false;
            state.isLoadingCreateError = false;
        },
        addSongFailure: (state) => {
            state.isLoadingCreate = false;
            state.isLoadingCreateError = true;
        },
        editSongRequest: (state, action: PayloadAction<FormData>) => {
            state.isLoadingEdit = true;
            state.isLoadingEditError = false;
        },
        editSongSuccess: (state, action: PayloadAction<Song>) => {
            const index = state.Songs.findIndex(song => song.id === action.payload.id);
            state.Songs[index] = action.payload;
            state.isLoadingEdit = false;
            state.isLoadingEditError = false;
        },
        editSongFailure: (state) => {
            state.isLoadingEdit = false;
            state.isLoadingEditError = true;
        },
        deleteSongRequest: (state, action: PayloadAction<number>) => {
            state.isLoadingDelete = true;
            state.isLoadingDeleteError = false;
        },
        deleteSongSuccess: (state, action: PayloadAction<number>) => {
            state.Songs = state.Songs.filter(song => song.id !== action.payload);
            state.isLoadingDelete = false;
            state.isLoadingDeleteError = false;
        },
        deleteSongFailure: (state) => {
            state.isLoadingDelete = false;
            state.isLoadingDeleteError = true;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setCurrentSong: (state, action: PayloadAction<Song>) => {
            state.currentSong = action.payload;
        },
    }
});

export const {
    fetchSongsRequest,
    fetchSongsSuccess,
    fetchSongsFailure,
    fetchSongRequest,
    fetchSongSuccess,
    fetchSongFailure,
    addSongRequest,
    addSongSuccess,
    addSongFailure,
    editSongRequest,
    editSongSuccess,
    editSongFailure,
    deleteSongRequest,
    deleteSongSuccess,
    deleteSongFailure,
    setIsPlaying,
    setCurrentSong
} = SongSlice.actions;

export const selectSong = (state: RootState) => state.song;