import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchDeleteDictionary, fetchGetDictionaries } from '../../api/dictionaryAPI';
import { DeletionStatus, Dictionary, LoadingStatus, ResponseError } from '../../util/types';
import { RootState } from '../store';


export const DICTIONARIES_REDUCER_KEY = 'dictionaries';

const LIMIT = 25;

export interface DictionariesState {
    status: LoadingStatus;
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

export const getNextDictionariesAsync = createAsyncThunk<Dictionary[], number, { rejectValue: ResponseError }>(
    `${DICTIONARIES_REDUCER_KEY}/getNextDictionariesAsync`,
    async (page, { rejectWithValue, signal }) => {
        const response = await fetchGetDictionaries(page, LIMIT, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }

        return response.json();
    }
);

export const deleteDictionaryAsync = createAsyncThunk<void, string, { rejectValue: ResponseError }>(
    `${DICTIONARIES_REDUCER_KEY}/deleteDictionaryAsync`,
    async (name, { rejectWithValue }) => {
        const response = await fetchDeleteDictionary(name);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const dictionariesSlice = createSlice({
    name: DICTIONARIES_REDUCER_KEY,
    initialState,
    reducers: {
        resetStatus: state => {
            state.status = 'idle';
        },
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
                if (state.status === 'loading') {
                    state.status = 'failed';
                }
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

export const { resetStatus, deleteDictionary } = dictionariesSlice.actions;

export const selectStatus = (state: RootState) => state.dictionaries.status;
export const selectDictionaries = (state: RootState) => state.dictionaries.dictionaries;
export const selectHasMore = (state: RootState) => state.dictionaries.hasMore;
export const selectPage = (state: RootState) => state.dictionaries.page;
export const selectDeletionStatusByDictionaryName = (state: RootState) => state.dictionaries.deletionStatusByDictionaryName;

export default dictionariesSlice.reducer;
