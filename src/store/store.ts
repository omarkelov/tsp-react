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

import { listenerMiddleware } from './listenerMiddleware';
import authReducer, { AUTH_REDUCER_KEY, isLogoutAction, LOGIN_KEY } from './slices/authSlice';
import dictionariesReducer, { DICTIONARIES_REDUCER_KEY } from './slices/dictionariesSlice';
import moviesReducer, { MOVIES_REDUCER_KEY } from './slices/moviesSlice';
import notificationsReducer, { NOTIFICATIONS_REDUCER_KEY } from './slices/notificationsSlice';


const persistConfig = {
    key: AUTH_REDUCER_KEY,
    storage,
    whitelist: [LOGIN_KEY],
};

const appReducer = combineReducers({
    [AUTH_REDUCER_KEY]: persistReducer(persistConfig, authReducer),
    [DICTIONARIES_REDUCER_KEY]: dictionariesReducer,
    [NOTIFICATIONS_REDUCER_KEY]: notificationsReducer,
    [MOVIES_REDUCER_KEY]: moviesReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
    if (state && isLogoutAction(action)) { // TODO: history
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
        }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
