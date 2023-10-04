import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "../features/themeSlice";
import { modalSlice } from "../features/modalSlice";
import { SongSlice } from "../features/songSlice";
import createSagaMiddleware from "@redux-saga/core";
import { watchAddSong, watchDeleteSong, watchEditSong, watchFetchSong, watchFetchSongs } from "../features/songSaga";
import { ToastSlice } from "../features/toastSlice";
import { PlayerSlice } from "../features/playerSlice";


const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        modal: modalSlice.reducer,
        song: SongSlice.reducer,
        toast: ToastSlice.reducer,
        player: PlayerSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}).concat(sagaMiddleware)
});

sagaMiddleware.run(watchAddSong);
sagaMiddleware.run(watchFetchSongs);
sagaMiddleware.run(watchFetchSong);
sagaMiddleware.run(watchDeleteSong);
sagaMiddleware.run(watchEditSong);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;