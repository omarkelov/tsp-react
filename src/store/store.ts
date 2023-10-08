import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer, { AUTH_REDUCER_KEY, LOGIN_KEY, logoutAsync } from './authSlice';
import dictionariesReducer, { DICTIONARIES_REDUCER_KEY } from './dictionariesSlice';


const persistConfig = {
    key: AUTH_REDUCER_KEY,
    storage,
    whitelist: [LOGIN_KEY],
};

const appReducer = combineReducers({
    [AUTH_REDUCER_KEY]: persistReducer(persistConfig, authReducer),
    [DICTIONARIES_REDUCER_KEY]: dictionariesReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
    if (action.type === logoutAsync.fulfilled.type && state) {
        state = {
            [AUTH_REDUCER_KEY]: {
                _persist: state[AUTH_REDUCER_KEY]._persist,
            },
        } as ReturnType<typeof appReducer>;
    }

    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
