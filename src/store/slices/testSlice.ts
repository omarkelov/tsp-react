import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchGetContext, fetchGetTest, fetchPatchPhrase } from '../../api/testAPI';
import { Context, LoadingStatus, ResponseError, Test } from '../../util/types';
import { RootState } from '../store';

import { CONTEXTS_REDUCER_KEY } from './contextsSlice';


export const TEST_REDUCER_KEY = 'test';

export interface TestState {
    dictionaryName: string;
    testStatus: LoadingStatus;
    phraseStatus: LoadingStatus;
    phrasesIds: Test['phrasesIds'];
    phraseIdx: number;
    context: Context | undefined;
    isContextVisible: boolean;
}

const initialState: TestState = {
    dictionaryName: '',
    testStatus: 'idle',
    phraseStatus: 'idle',
    phrasesIds: [],
    phraseIdx: 0,
    context: undefined,
    isContextVisible: false,
};

export const getTestAsync = createAsyncThunk<Test, void, { rejectValue: ResponseError }>(
    `${TEST_REDUCER_KEY}/getTestAsync`,
    async (_, { getState, rejectWithValue, signal }) => {
        const { dictionaryName } = (getState() as RootState)[TEST_REDUCER_KEY];
        const response = await fetchGetTest(dictionaryName, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }

        return response.json();
    }
);

export const getContextAsync = createAsyncThunk<Context, number, { rejectValue: ResponseError }>(
    `${TEST_REDUCER_KEY}/getContextAsync`,
    async (phraseId, { getState, rejectWithValue, signal }) => {
        const { [TEST_REDUCER_KEY]: test, [CONTEXTS_REDUCER_KEY]: contexts } = (getState() as RootState);

        if (test.dictionaryName === contexts.dictionaryName) {
            const context = contexts.contexts
                .find(({ phrases }) => phrases?.some(({ id }) => id === phraseId)) as Context | undefined;

            if (context) {
                return { ...context };
            }
        }

        const response = await fetchGetContext(phraseId, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }

        return response.json();
    }
);

export const updatePhraseStatsAsync = createAsyncThunk<void, { phraseId: number, isCorrect: boolean }, { rejectValue: ResponseError }>(
    `${TEST_REDUCER_KEY}/updatePhraseStatsAsync`,
    async ({ phraseId, isCorrect }, { rejectWithValue, signal }) => {
        const response = await fetchPatchPhrase(phraseId, isCorrect, signal);

        if (!response.ok) {
            return rejectWithValue({ code: response.status });
        }
    }
);

export const testSlice = createSlice({
    name: TEST_REDUCER_KEY,
    initialState,
    reducers: {
        initialize: (_, { payload: dictionaryName }: { payload: string }) => ({
            ...initialState,
            dictionaryName,
        }),
        showContext: state => {
            state.isContextVisible = true;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getTestAsync.pending, state => {
                state.testStatus = 'loading';
            })
            .addCase(getTestAsync.fulfilled, (state, { payload: { phrasesIds } }) => {
                state.testStatus = 'idle';
                state.phrasesIds = phrasesIds;
            })
            .addCase(getTestAsync.rejected, state => {
                state.testStatus = 'failed';
            })
            .addCase(getContextAsync.pending, state => {
                state.phraseStatus = 'loading';
                state.isContextVisible = false;
            })
            .addCase(getContextAsync.fulfilled, (state, { payload: context }) => {
                context.phrases = context.phrases?.filter(({ id }) => id === state.phrasesIds[state.phraseIdx]);

                state.phraseStatus = 'idle';
                state.context = context;
                state.phraseIdx++;
            })
            .addCase(getContextAsync.rejected, state => {
                state.phraseStatus = 'failed';
            })
            .addCase(updatePhraseStatsAsync.fulfilled, (state, { meta: { arg: { phraseId, isCorrect } } }) => {
                const phrase = state.context?.phrases?.find(({ id }) => id === phraseId);

                if (!phrase) {
                    return state;
                }

                phrase.phraseStats ??= {
                    successfulAttempts: 0,
                    attempts: 0,
                };

                if (isCorrect) {
                    phrase.phraseStats.successfulAttempts++;
                }

                phrase.phraseStats.attempts++;
            }),
});

export const { initialize, showContext } = testSlice.actions;

export const selectDictionaryName = (state: RootState) => state[TEST_REDUCER_KEY].dictionaryName;
export const selectTestStatus = (state: RootState) => state[TEST_REDUCER_KEY].testStatus;
export const selectPhraseStatus = (state: RootState) => state[TEST_REDUCER_KEY].phraseStatus;
export const selectPhrasesIds = (state: RootState) => state[TEST_REDUCER_KEY].phrasesIds;
export const selectPhraseIdx = (state: RootState) => state[TEST_REDUCER_KEY].phraseIdx;
export const selectContext = (state: RootState) => state[TEST_REDUCER_KEY].context;
export const selectIsContextVisible = (state: RootState) => state[TEST_REDUCER_KEY].isContextVisible;

export const selectHasPhrasesIds = createSelector(
    [selectPhrasesIds],
    ({ length }) => !!length
);

export const selectPhraseId = createSelector(
    [selectPhrasesIds, selectPhraseIdx],
    (phrasesIds, phraseIdx) => phrasesIds[phraseIdx]
);

export const selectIsContextReady = createSelector(
    [selectContext, selectPhraseStatus],
    (context, phraseStatus) => context && phraseStatus !== 'loading'
);

export const selectIsLastPhrase = createSelector(
    [selectPhrasesIds, selectPhraseIdx],
    (phrasesIds, phraseIdx) => phrasesIds.length === phraseIdx
);

export default testSlice.reducer;
