import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDeleteContext, fetchGetContexts } from '../../api/contextAPI';
import { Context, DeletionStatus, LoadingStatus, ResponseError } from '../../util/types';
import { RootState } from '../store';


export const CONTEXTS_REDUCER_KEY = 'contexts';

const LIMIT = 25;

export interface ContextsState {
    dictionaryName: string;
    status: LoadingStatus;
    contexts: Context[];
    hasMore: boolean;
    page: number;
    deletionStatusByContextId: { [key: number]: DeletionStatus; };
}

const initialState: ContextsState = {
    dictionaryName: '',
    status: 'idle',
    contexts: [],
    hasMore: true,
    page: 0,
    deletionStatusByContextId: {},
};

export const getNextContextsAsync = createAsyncThunk<Context[], number, { rejectValue: ResponseError }>(
    `${CONTEXTS_REDUCER_KEY}/getNextContextsAsync`,
    async (page, { getState, rejectWithValue, signal }) => {
        const { dictionaryName } = (getState() as RootState)[CONTEXTS_REDUCER_KEY];
        const response = await fetchGetContexts(dictionaryName, page, LIMIT, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }

        return response.json();
    }
);

export const deleteContextAsync = createAsyncThunk<void, number, { rejectValue: ResponseError }>(
    `${CONTEXTS_REDUCER_KEY}/deleteContextAsync`,
    async (id, { rejectWithValue }) => {
        const response = await fetchDeleteContext(id);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const contextsSlice = createSlice({
    name: CONTEXTS_REDUCER_KEY,
    initialState,
    reducers: {
        initialize: (_, { payload: dictionaryName }: { payload: string }) => ({
            ...initialState,
            dictionaryName,
        }),
        resetStatus: state => {
            state.status = 'idle';
        },
        deleteContext: (state, { payload: id }: { payload: number }) => {
            state.contexts = state.contexts.filter(c => c.id !== id);
            delete state.deletionStatusByContextId[id];
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getNextContextsAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(getNextContextsAsync.fulfilled, (state, { payload: extraContexts }) => {
                state.status = 'idle';
                state.contexts.push(...extraContexts);
                state.page++;

                if (extraContexts.length < LIMIT) {
                    state.hasMore = false;
                }
            })
            .addCase(getNextContextsAsync.rejected, state => {
                if (state.status === 'loading') {
                    state.status = 'failed';
                }
            })
            .addCase(deleteContextAsync.pending, (state, { meta: { arg: id } }) => {
                state.deletionStatusByContextId[id] = 'deleting';
            })
            .addCase(deleteContextAsync.fulfilled, (state, { meta: { arg: id } }) => {
                state.deletionStatusByContextId[id] = 'deleted';
            })
            .addCase(deleteContextAsync.rejected, (state, { meta: { arg: id } }) => {
                delete state.deletionStatusByContextId[id];
            }),
});

export const { initialize, resetStatus, deleteContext } = contextsSlice.actions;

export const selectDictionaryName = (state: RootState) => state[CONTEXTS_REDUCER_KEY].dictionaryName;
export const selectStatus = (state: RootState) => state[CONTEXTS_REDUCER_KEY].status;
export const selectContexts = (state: RootState) => state[CONTEXTS_REDUCER_KEY].contexts;
export const selectHasMore = (state: RootState) => state[CONTEXTS_REDUCER_KEY].hasMore;
export const selectPage = (state: RootState) => state[CONTEXTS_REDUCER_KEY].page;
export const selectDeletionStatusByContextId = (state: RootState) => state[CONTEXTS_REDUCER_KEY].deletionStatusByContextId;

export default contextsSlice.reducer;
