import { startAppListening } from '../listenerMiddleware';
import { CONTEXTS_REDUCER_KEY, updatePhraseStats } from '../slices/contextsSlice';
import { TEST_REDUCER_KEY, updatePhraseStatsAsync } from '../slices/testSlice';
import { RootState } from '../store';


export const startUpdatePhraseStatsListener = () => startAppListening({
    actionCreator: updatePhraseStatsAsync.fulfilled,
    effect: async ({ meta: { arg: updateInfo } }, { dispatch, getState }) => {
        const { [TEST_REDUCER_KEY]: test, [CONTEXTS_REDUCER_KEY]: contexts } = (getState() as RootState);

        if (test.dictionaryName === contexts.dictionaryName) {
            dispatch(updatePhraseStats(updateInfo));
        }
    },
});
