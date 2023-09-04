import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Credentials, fetchLogin, fetchLogout } from '../api/authAPI';
import { persistInLocalStorage } from '../util/localStorage';

import { RootState } from './store';


export const LOGGED_IN_KEY = 'isLoggedIn';

export interface AuthState {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    status: 'idle',
};

export const loginAsync = createAsyncThunk(
    'auth/fetchLogin',
    async (credentials: Credentials) => {
        const response = await fetchLogin(credentials);

        if (response.status === 200) {
            persistInLocalStorage(LOGGED_IN_KEY, true);
        }
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/fetchLogout',
    async () => {
        const response = await fetchLogout();

        if (response.status === 200) {
            persistInLocalStorage(LOGGED_IN_KEY, false);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, state => {
                state.status = 'idle';
            })
            .addCase(loginAsync.rejected, state => {
                state.status = 'failed';
            })
            .addCase(logoutAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(logoutAsync.fulfilled, state => {
                state.status = 'idle';
            })
            .addCase(logoutAsync.rejected, state => {
                state.status = 'failed';
            }),
});

export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
