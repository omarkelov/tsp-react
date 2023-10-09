import { AnyAction, createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

import { Credentials, fetchLogin, fetchLogout } from '../api/authAPI';

import { RootState } from './store';


export const AUTH_REDUCER_KEY = 'auth';
export const LOGIN_KEY = 'login';

type Status = 'idle' | 'loading' | 'failed';
export interface AuthState {
    status: Status;
    [LOGIN_KEY]?: string;
    error?: SerializedError;
}

const initialState: AuthState = {
    status: 'idle',
    [LOGIN_KEY]: undefined,
    error: undefined,
};

export const loginAsync = createAsyncThunk<void, Credentials, { rejectValue: { code: number } }>(
    `${AUTH_REDUCER_KEY}/loginAsync`,
    async (credentials, { rejectWithValue }) => {
        const response = await fetchLogin(credentials);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const logoutAsync = createAsyncThunk<void, undefined, { rejectValue: { code: number } }>(
    `${AUTH_REDUCER_KEY}/logoutAsync`,
    async (_, { rejectWithValue }) => {
        const response = await fetchLogout();

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const authSlice = createSlice({
    name: AUTH_REDUCER_KEY,
    initialState,
    reducers: {
        logout: state => {
            state.status = 'idle';
            state[LOGIN_KEY] = undefined;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(loginAsync.pending, state => {
                state.status = 'loading';
                state.error = undefined;
            })
            .addCase(loginAsync.fulfilled, (state, { meta: { arg: { login } } }) => {
                state.status = 'idle';
                state[LOGIN_KEY] = login;
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
                state[LOGIN_KEY] = undefined;
            })
            .addCase(logoutAsync.rejected, (state, { payload: error }) => {
                state.status = 'failed';
                state.error = error as SerializedError; // TODO: fix
            }),
});

export const { logout } = authSlice.actions;

const logoutTypes = [logoutAsync.fulfilled.type, logout.type] as const;
export const isLogoutAction = (action: AnyAction) => logoutTypes.includes(action.type);

export const selectStatus = (state: RootState) => state.auth.status;
export const selectLogin = (state: RootState) => state.auth[LOGIN_KEY];
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
