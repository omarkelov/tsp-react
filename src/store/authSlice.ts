import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

import { Credentials, fetchLogin, fetchLogout } from '../api/authAPI';

import { RootState } from './store';


export const IS_LOGGED_IN = 'isLoggedIn';

export interface AuthState {
    status: 'idle' | 'loading' | 'failed';
    [IS_LOGGED_IN]: boolean;
    error: SerializedError | null;
}

const initialState: AuthState = {
    status: 'idle',
    isLoggedIn: false,
    error: null,
};

export const loginAsync = createAsyncThunk(
    'auth/fetchLogin',
    async (credentials: Credentials, { rejectWithValue }) => {
        const response = await fetchLogin(credentials);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/fetchLogout',
    async (_, { rejectWithValue }) => {
        const response = await fetchLogout();

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
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
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, state => {
                state.status = 'idle';
                state.isLoggedIn = true;
            })
            .addCase(loginAsync.rejected, (state, { payload: error }) => {
                state.status = 'failed';
                state.error = error as SerializedError;
            })
            .addCase(logoutAsync.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logoutAsync.fulfilled, state => {
                state.status = 'idle';
                state.isLoggedIn = false;
            })
            .addCase(logoutAsync.rejected, (state, { payload: error }) => {
                state.status = 'failed';
                state.error = error as SerializedError;
            }),
});

export const selectStatus = (state: RootState) => state.auth.status;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
