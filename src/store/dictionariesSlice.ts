import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Dictionary, fetchDeleteDictionary, fetchDictionaries } from '../api/dictionariesAPI';

import { RootState } from './store';


const LIMIT = 25;

type Status = 'idle' | 'loading' | 'failed';
type DeletionStatus = 'deleting' | 'deleted';

export interface DictionariesState {
    fetchStatus: Status;
    deleteStatus: Status;
    dictionaries: Dictionary[];
    hasMore: boolean;
    page: number;
    deletionStatusByDictionaryName: { [key: string]: DeletionStatus; };
}

const initialState: DictionariesState = {
    fetchStatus: 'idle',
    deleteStatus: 'idle',
    dictionaries: [],
    hasMore: true,
    page: 0,
    deletionStatusByDictionaryName: {},
};

export const getNextDictionariesAsync = createAsyncThunk(
    'dictionaries/getNextDictionaries',
    async ({page, signal}: {page: number, signal: AbortSignal}, { rejectWithValue }) => {
        const response = await fetchDictionaries(page, LIMIT, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status }); // TODO: handle
        }

        return response.json() as unknown as Dictionary[];
    }
);

export const deleteDictionaryAsync = createAsyncThunk(
    'dictionaries/deleteDictionary',
    async (name: string, { rejectWithValue }) => {
        const response = await fetchDeleteDictionary(name);

        if (!response.ok) {
            return rejectWithValue({ code: response.status }); // TODO: handle
        }
    }
);

export const dictionariesSlice = createSlice({
    name: 'dictionaries',
    initialState,
    reducers: {
        initialize: _ => initialState, // eslint-disable-line @typescript-eslint/no-unused-vars
        deleteDictionary: (state, { payload: name }: { payload: string }) => {
            state.dictionaries = state.dictionaries.filter(d => d.name !== name);
            delete state.deletionStatusByDictionaryName[name];
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getNextDictionariesAsync.pending, state => {
                state.fetchStatus = 'loading';
            })
            .addCase(getNextDictionariesAsync.fulfilled, (state, { payload: extraDictionaries }) => {
                state.fetchStatus = 'idle';

                if (!extraDictionaries.length) {
                    state.hasMore = false;
                    return;
                }

                state.dictionaries.push(...extraDictionaries);
                state.page++;

                if (extraDictionaries.length < LIMIT) {
                    state.hasMore = false;
                }
            })
            .addCase(getNextDictionariesAsync.rejected, state => {
                state.fetchStatus = 'failed';
            })
            .addCase(deleteDictionaryAsync.pending, (state, { meta: { arg: name } }) => {
                state.deleteStatus = 'loading';
                state.deletionStatusByDictionaryName[name] = 'deleting';
            })
            .addCase(deleteDictionaryAsync.fulfilled, (state, { meta: { arg: name } }) => {
                state.deleteStatus = 'idle';
                state.deletionStatusByDictionaryName[name] = 'deleted';
            })
            .addCase(deleteDictionaryAsync.rejected, (state, { meta: { arg: name } }) => {
                state.deleteStatus = 'failed';
                delete state.deletionStatusByDictionaryName[name];
            }),
});

export const { initialize, deleteDictionary } = dictionariesSlice.actions;

export const selectFetchStatus = (state: RootState) => state.dictionaries.fetchStatus;
export const selectDeleteStatus = (state: RootState) => state.dictionaries.deleteStatus;
export const selectDictionaries = (state: RootState) => state.dictionaries.dictionaries;
export const selectHasMore = (state: RootState) => state.dictionaries.hasMore;
export const selectPage = (state: RootState) => state.dictionaries.page;
export const selectDeletionStatusByDictionaryName = (state: RootState) => state.dictionaries.deletionStatusByDictionaryName;

export default dictionariesSlice.reducer;
