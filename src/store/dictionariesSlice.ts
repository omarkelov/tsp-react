import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Dictionary, fetchDeleteDictionary, fetchDictionaries } from '../api/dictionariesAPI';

import { RootState } from './store';


const LIMIT = 25;

type Status = 'idle' | 'loading' | 'failed';
type DeletionStatus = 'deleting' | 'deleted';

export interface DictionariesState {
    status: Status;
    dictionaries: Dictionary[];
    hasMore: boolean;
    page: number;
    deletionStatusByDictionaryName: { [key: string]: DeletionStatus; };
}

const initialState: DictionariesState = {
    status: 'idle',
    dictionaries: [],
    hasMore: true,
    page: 0,
    deletionStatusByDictionaryName: {},
};

export const getNextDictionariesAsync = createAsyncThunk<Dictionary[], number, {rejectValue: { code: number }}>(
    'dictionaries/getNextDictionaries',
    async (page, { rejectWithValue, signal }) => {
        const response = await fetchDictionaries(page, LIMIT, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status }); // TODO: handle
        }

        return response.json();
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
                state.status = 'loading';
            })
            .addCase(getNextDictionariesAsync.fulfilled, (state, { payload: extraDictionaries }) => {
                state.status = 'idle';

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
                state.status = 'failed';
            })
            .addCase(deleteDictionaryAsync.pending, (state, { meta: { arg: name } }) => {
                state.deletionStatusByDictionaryName[name] = 'deleting';
            })
            .addCase(deleteDictionaryAsync.fulfilled, (state, { meta: { arg: name } }) => {
                state.deletionStatusByDictionaryName[name] = 'deleted';
            })
            .addCase(deleteDictionaryAsync.rejected, (state, { meta: { arg: name } }) => {
                delete state.deletionStatusByDictionaryName[name];
            }),
});

export const { initialize, deleteDictionary } = dictionariesSlice.actions;

export const selectStatus = (state: RootState) => state.dictionaries.status;
export const selectDictionaries = (state: RootState) => state.dictionaries.dictionaries;
export const selectHasMore = (state: RootState) => state.dictionaries.hasMore;
export const selectPage = (state: RootState) => state.dictionaries.page;
export const selectDeletionStatusByDictionaryName = (state: RootState) => state.dictionaries.deletionStatusByDictionaryName;

export default dictionariesSlice.reducer;
