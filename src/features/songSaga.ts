import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { Song } from '../types';
import { editSong, getAllSongs, getSong, deleteSong, createSong } from '../api/songsApi';
import { AddSongRequestPayload, addSongFailure, addSongRequest, addSongSuccess, deleteSongFailure, deleteSongRequest, deleteSongSuccess, editSongFailure, editSongRequest, editSongSuccess, fetchSongFailure, fetchSongRequest, fetchSongSuccess, fetchSongsFailure, fetchSongsRequest, fetchSongsSuccess } from './songSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { closeModal } from './modalSlice';
import { closeToast, showToast } from './toastSlice';

function* handleFetchSongs() {
    try{
        const songs: Song[] = yield call(getAllSongs);
        yield put(fetchSongsSuccess(songs));
    } catch (error) {
        yield put(fetchSongsFailure());
    }
}

export function* watchFetchSongs() {
    yield takeLatest(fetchSongsRequest.type, handleFetchSongs);
}

function* handleFetchSong(action: PayloadAction<number>) {
    try {
        const song: Song = yield call(getSong, action.payload);
        yield put(fetchSongSuccess(song));
    } catch (error) {
        yield put(fetchSongFailure());
    }
}

export function* watchFetchSong() {
    yield takeLatest(fetchSongRequest.type, handleFetchSong);
}

function* handleAddSong(action: PayloadAction<AddSongRequestPayload>) {
    try {
        const newSong: Song = yield call(createSong, action.payload);
        yield put(addSongSuccess(newSong));
        yield put(closeModal());
        yield put(showToast('Song created successfully'));
        yield delay(3000);
        yield put(closeToast());
    } catch (error) {
        yield put(addSongFailure());
    }
}

export function* watchAddSong() {
    yield takeLatest(addSongRequest.type, handleAddSong);
}

function* handleDeleteSong(action: PayloadAction<number>) {
    try {
        yield call(deleteSong, action.payload);
        yield put(deleteSongSuccess(action.payload));
        yield put(closeModal());
        yield put(showToast('Song deleted successfully'));
        yield delay(3000);
        yield put(closeToast());
    } catch (error) {
        yield put(deleteSongFailure);
    }
}

export function* watchDeleteSong() {
    yield takeLatest(deleteSongRequest.type, handleDeleteSong);
}


function* handleEditSong(action: PayloadAction<FormData>) {
    try {
        const editedSong: Song = yield call(editSong, action.payload);
        yield put(editSongSuccess(editedSong));
        yield put(closeModal());
        yield put(showToast('Song updated successfully'));
        yield delay(3000);
        yield put(closeToast());
    } catch (error) {
        yield put(editSongFailure());
    }
}

export function* watchEditSong() {
    yield takeLatest(editSongRequest.type, handleEditSong);
}
