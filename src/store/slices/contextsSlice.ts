import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDeleteContext, fetchGetContexts, fetchGetPhrasesCount } from '../../api/contextAPI';
import { Context, DeletionStatus, LoadingStatus, ResponseError } from '../../util/types';
import { RootState } from '../store';

import { addNotification } from './notificationsSlice';


export const CONTEXTS_REDUCER_KEY = 'contexts';

const LIMIT = 25;

export interface ContextsState {
    dictionaryName: string;
    phrasesCount: number | undefined;
    status: LoadingStatus;
    contexts: Context[];
    hasMore: boolean;
    page: number;
    deletionStatusByContextId: { [key: number]: DeletionStatus; };
}

const initialState: ContextsState = {
    dictionaryName: '',
    phrasesCount: undefined,
    status: 'idle',
    contexts: [],
    hasMore: true,
    page: 0,
    deletionStatusByContextId: {},
};

export const getPhrasesCountAsync = createAsyncThunk<number, void, { rejectValue: ResponseError }>(
    `${CONTEXTS_REDUCER_KEY}/getPhrasesCountAsync`,
    async (_, { getState, rejectWithValue, signal }) => {
        const { dictionaryName } = (getState() as RootState)[CONTEXTS_REDUCER_KEY];
        const response = await fetchGetPhrasesCount(dictionaryName, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }

        return response.json();
    }, {
        condition: (_, { getState }) => {
            const { dictionaryName } = (getState() as RootState)[CONTEXTS_REDUCER_KEY];

            if (!dictionaryName.length) {
                return false;
            }
        },
    }
);

export const getNextContextsAsync = createAsyncThunk<Context[], number, { rejectValue: ResponseError }>(
    `${CONTEXTS_REDUCER_KEY}/getNextContextsAsync`,
    async (page, { getState, dispatch, rejectWithValue, requestId, signal }) => {
        const { dictionaryName } = (getState() as RootState)[CONTEXTS_REDUCER_KEY];

        if (!dictionaryName.length) {
            dispatch(addNotification({
                id: requestId,
                type: 'error',
                message: `Internal error has ocurred. Try to reload the page.`,
            }));

            return Promise.reject();
        }

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
            if (state.phrasesCount !== undefined) {
                state.phrasesCount -= state.contexts.find(c => c.id === id)?.phrases?.length ?? 0;
            }
            state.contexts = state.contexts.filter(c => c.id !== id);
            delete state.deletionStatusByContextId[id];
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getPhrasesCountAsync.fulfilled, (state, { payload: phrasesCount }) => {
                state.phrasesCount = phrasesCount;
            })
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
                if (state.status === 'loading' || !state.dictionaryName.length) {
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
export const selectPhrasesCount = (state: RootState) => state[CONTEXTS_REDUCER_KEY].phrasesCount;
export const selectStatus = (state: RootState) => state[CONTEXTS_REDUCER_KEY].status;
export const selectContexts = (state: RootState) => state[CONTEXTS_REDUCER_KEY].contexts;
export const selectHasMore = (state: RootState) => state[CONTEXTS_REDUCER_KEY].hasMore;
export const selectPage = (state: RootState) => state[CONTEXTS_REDUCER_KEY].page;
export const selectDeletionStatusByContextId = (state: RootState) => state[CONTEXTS_REDUCER_KEY].deletionStatusByContextId;

export default contextsSlice.reducer;
