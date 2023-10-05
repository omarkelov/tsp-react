import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
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

import authReducer, { IS_LOGGED_IN } from './authSlice';
import dictionariesReducer from './dictionariesSlice';


const AUTH_REDUCER_KEY = 'auth';

const persistConfig = {
    key: AUTH_REDUCER_KEY,
    storage,
    whitelist: [IS_LOGGED_IN],
};

const rootReducer = combineReducers({
    [AUTH_REDUCER_KEY]: persistReducer(persistConfig, authReducer),
    dictionaries: dictionariesReducer,
});

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
