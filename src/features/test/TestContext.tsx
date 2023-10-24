import { FC } from 'react';

import Button from '../../components/button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getContextAsync, selectContext, selectIsContextVisible, selectIsLastPhrase, selectPhraseId, showContext, updatePhraseStatsAsync } from '../../store/slices/testSlice';
import ContextItem from '../contexts-list/ContextItem';


import styles from './TestContext.module.scss';


const TestContext: FC = () => {
    const dispatch = useAppDispatch();
    const phraseId = useAppSelector(selectPhraseId);
    const context = useAppSelector(selectContext)!;
    const isLastPhrase = useAppSelector(selectIsLastPhrase);
    const isContextVisible = useAppSelector(selectIsContextVisible);

    const handleNextPhraseClick = () => {
        if (!isLastPhrase) {
            dispatch(getContextAsync(phraseId));
        } else {
            alert("You've completed the test");
        }
    };

    const handleViewAnswerClick = () => {
        const phrase = context.phrases![0];

        dispatch(showContext());
        dispatch(updatePhraseStatsAsync({
            phraseId: phrase.id,
            isCorrect: false,
        }));
    };

    return (
        <div className={styles.root}>
            {isContextVisible ? (
                <>
                    <ContextItem context={context} />
                    <Button
                        value='Next phrase'
                        onClick={handleNextPhraseClick}
                    />
                </>
            ) : (
                <Button
                    value='View the answer'
                    onClick={handleViewAnswerClick}
                />
            )}
        </div>
    );
};

export default TestContext;
