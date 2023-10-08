import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

import { Credentials, fetchLogin, fetchLogout } from '../api/authAPI';

import { RootState } from './store';


export const LOGIN = 'login';

export interface AuthState {
    status: 'idle' | 'loading' | 'failed';
    [LOGIN]?: string;
    error?: SerializedError;
}

const initialState: AuthState = {
    status: 'idle',
    [LOGIN]: undefined,
    error: undefined,
};

export const loginAsync = createAsyncThunk<void, Credentials, { rejectValue: { code: number } }>(
    'auth/fetchLogin',
    async (credentials, { rejectWithValue }) => {
        const response = await fetchLogin(credentials);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const logoutAsync = createAsyncThunk<void, undefined, { rejectValue: { code: number } }>(
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
    extraReducers: builder =>
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading';
                state.error = undefined;
            })
            .addCase(loginAsync.fulfilled, (state, { meta: { arg: { login } } }) => {
                state.status = 'idle';
                state[LOGIN] = login;
            })
            .addCase(loginAsync.rejected, (state, { payload: error }) => {
                state.status = 'failed';
                state.error = error as SerializedError; // TODO: fix
            })
            .addCase(logoutAsync.pending, state => {
                state.status = 'loading';
                state.error = undefined;
            })
            .addCase(logoutAsync.fulfilled, state => {
                state.status = 'idle';
                state[LOGIN] = undefined;
            })
            .addCase(logoutAsync.rejected, (state, { payload: error }) => {
                state.status = 'failed';
                state.error = error as SerializedError; // TODO: fix
            }),
});

export const selectStatus = (state: RootState) => state.auth.status;
export const selectLogin = (state: RootState) => state.auth[LOGIN];
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
