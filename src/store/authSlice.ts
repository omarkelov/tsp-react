import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Credentials, fetchLogin, fetchLogout } from '../api/authAPI';


export interface AuthState {
    isLoggedIn: boolean;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    isLoggedIn: false,
    status: 'idle',
};

export const loginAsync = createAsyncThunk(
    'auth/fetchLogin',
    async (credentials: Credentials) => {
        const response = await fetchLogin(credentials);
        return response.status === 200;
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/fetchLogout',
    async () => {
        const response = await fetchLogout();
        return response.status !== 200;
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
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isLoggedIn = action.payload;
            })
            .addCase(loginAsync.rejected, state => {
                state.status = 'failed';
            })
            .addCase(logoutAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isLoggedIn = action.payload;
            })
            .addCase(logoutAsync.rejected, state => {
                state.status = 'failed';
            })
})

// export const {  } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
