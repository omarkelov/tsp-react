import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Dictionary, fetchDeleteDictionary, fetchDictionaries } from '../api/dictionariesAPI';

import { RootState } from './store';


const LIMIT = 25;

type Status = 'idle' | 'loading' | 'failed';

export interface DictionariesState {
    fetchStatus: Status;
    deleteStatus: Status;
    dictionaries: Dictionary[];
    hasMore: boolean;
    page: number;
}

const initialState: DictionariesState = {
    fetchStatus: 'idle',
    deleteStatus: 'idle',
    dictionaries: [],
    hasMore: true,
    page: 0,
};

export const getNextDictionariesAsync = createAsyncThunk(
    'dictionaries/getNextDictionaries',
    async (page: number): Promise<Dictionary[]> => {
        const response = await fetchDictionaries(page, LIMIT);
        return response.json();
    }
);

export const deleteDictionaryAsync = createAsyncThunk(
    'dictionaries/deleteDictionary',
    async (name: string): Promise<string> => {
        const response = await fetchDeleteDictionary(name);

        return new Promise((resolve, reject) => {
            if (response.status == 204) {
                resolve(name);
            } else {
                reject();
            }
        });
    }
);

export const dictionariesSlice = createSlice({
    name: 'dictionaries',
    initialState,
    reducers: {},
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
            .addCase(deleteDictionaryAsync.pending, state => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteDictionaryAsync.fulfilled, (state, { payload: name }) => {
                state.deleteStatus = 'idle';
                state.dictionaries = state.dictionaries.filter(d => d.name !== name);
            })
            .addCase(deleteDictionaryAsync.rejected, state => {
                state.deleteStatus = 'failed';
            }),
});

export const selectFetchStatus = (state: RootState) => state.dictionaries.fetchStatus;
export const selectDeleteStatus = (state: RootState) => state.dictionaries.deleteStatus;
export const selectDictionaries = (state: RootState) => state.dictionaries.dictionaries;
export const selectHasMore = (state: RootState) => state.dictionaries.hasMore;
export const selectPage = (state: RootState) => state.dictionaries.page;

export default dictionariesSlice.reducer;
