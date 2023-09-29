import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import dictionariesReducer from './dictionariesSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        dictionaries: dictionariesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
