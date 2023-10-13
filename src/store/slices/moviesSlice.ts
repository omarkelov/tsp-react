import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDeleteMovie, fetchGetMovies } from '../../api/movieAPI';
import { DeletionStatus, LoadingStatus, Movie, ResponseError } from '../../util/types';
import { RootState } from '../store';


export const MOVIES_REDUCER_KEY = 'movies';

const LIMIT = 25;

export interface MoviesState {
    status: LoadingStatus;
    movies: Movie[];
    hasMore: boolean;
    page: number;
    deletionStatusByMovieId: { [key: number]: DeletionStatus; };
}

const initialState: MoviesState = {
    status: 'idle',
    movies: [],
    hasMore: true,
    page: 0,
    deletionStatusByMovieId: {},
};

export const getNextMoviesAsync = createAsyncThunk<Movie[], number, { rejectValue: ResponseError }>(
    `${MOVIES_REDUCER_KEY}/getNextMoviesAsync`,
    async (page, { rejectWithValue, signal }) => {
        const response = await fetchGetMovies(page, LIMIT, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }

        return response.json();
    }
);

export const deleteMovieAsync = createAsyncThunk<void, number, { rejectValue: ResponseError }>(
    `${MOVIES_REDUCER_KEY}/deleteMovieAsync`,
    async (id, { rejectWithValue }) => {
        const response = await fetchDeleteMovie(id);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const moviesSlice = createSlice({
    name: MOVIES_REDUCER_KEY,
    initialState,
    reducers: {
        resetStatus: state => {
            state.status = 'idle';
        },
        deleteMovie: (state, { payload: id }: { payload: number }) => {
            state.movies = state.movies.filter(m => m.id !== id);
            delete state.deletionStatusByMovieId[id];
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getNextMoviesAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(getNextMoviesAsync.fulfilled, (state, { payload: extraMovies }) => {
                state.status = 'idle';
                state.movies.push(...extraMovies);
                state.page++;

                if (extraMovies.length < LIMIT) {
                    state.hasMore = false;
                }
            })
            .addCase(getNextMoviesAsync.rejected, state => {
                if (state.status === 'loading') {
                    state.status = 'failed';
                }
            })
            .addCase(deleteMovieAsync.pending, (state, { meta: { arg: id } }) => {
                state.deletionStatusByMovieId[id] = 'deleting';
            })
            .addCase(deleteMovieAsync.fulfilled, (state, { meta: { arg: id } }) => {
                state.deletionStatusByMovieId[id] = 'deleted';
            })
            .addCase(deleteMovieAsync.rejected, (state, { meta: { arg: id } }) => {
                delete state.deletionStatusByMovieId[id];
            }),
});

export const { resetStatus, deleteMovie } = moviesSlice.actions;

export const selectStatus = (state: RootState) => state[MOVIES_REDUCER_KEY].status;
export const selectMovies = (state: RootState) => state[MOVIES_REDUCER_KEY].movies;
export const selectHasMore = (state: RootState) => state[MOVIES_REDUCER_KEY].hasMore;
export const selectPage = (state: RootState) => state[MOVIES_REDUCER_KEY].page;
export const selectDeletionStatusByMovieId = (state: RootState) => state[MOVIES_REDUCER_KEY].deletionStatusByMovieId;

export default moviesSlice.reducer;
