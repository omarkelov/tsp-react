import { FC, useEffect } from 'react';

import Spinner from '../../components/spinner/Spinner';
import { useAbortOnUnmount } from '../../hooks/abortOnUnmount';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getContextAsync, selectIsContextReady, selectPhraseId, selectPhraseIdx } from '../../store/slices/testSlice';

import styles from './Test.module.scss';
import TestContext from './TestContext';
import TestQuestion from './TestQuestion';


const Test: FC = () => {
    const dispatch = useAppDispatch();

    const phraseId = useAppSelector(selectPhraseId);
    const phraseIdx = useAppSelector(selectPhraseIdx);
    const isContextReady = useAppSelector(selectIsContextReady);

    const setAbortCallback = useAbortOnUnmount();

    useEffect(() => {
        if (!phraseIdx) {
            setAbortCallback(dispatch(getContextAsync(phraseId)));
        }
    }, [phraseIdx, phraseId, dispatch, setAbortCallback]);

    return (
        <div>
            {isContextReady ? (
                <>
                    <TestQuestion />
                    <TestContext />
                </>
            ) : (
                <Spinner
                    className={styles.spinner}
                    size='large'
                />
            )}
        </div>
    );
};

export default Test;
