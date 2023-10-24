import { FC, useRef } from 'react';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectContext, selectIsContextVisible, showContext, updatePhraseStatsAsync } from '../../store/slices/testSlice';
import { unify } from '../../util/string';

import styles from './TestQuestion.module.scss';


const TestQuestion: FC = () => {
    const dispatch = useAppDispatch();

    const context = useAppSelector(selectContext)!;
    const phrase = context.phrases![0];
    const isContextVisible = useAppSelector(selectIsContextVisible);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const unifiedInputValue = unify(inputRef.current?.value);

        if (!unifiedInputValue?.length) {
            alert('Input field is blank!');
            return;
        }

        const isCorrect = unify(phrase.phrase) === unifiedInputValue || (
            !!phrase.correctedPhrase && unify(phrase.correctedPhrase) === unifiedInputValue
        );

        alert(`You are ${isCorrect ? 'correct' : 'wrong'}!`);

        dispatch(showContext());
        dispatch(updatePhraseStatsAsync({
            phraseId: phrase.id,
            isCorrect,
        }));
    };

    return (
        <div className={styles.root}>
            <p>Enter the translation of the phrase:</p>
            <p className={styles.testPhrase}>
                {phrase.translation}
            </p>
            <div className={styles.testInputShell}>
                <Input
                    ref={inputRef}
                    label='Answer'
                    className={styles.testInput}
                    isDisabled={isContextVisible}
                />
                <Button
                    value='Submit'
                    variant='secondary'
                    className={styles.testInputSubmitButton}
                    isDisabled={isContextVisible}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default TestQuestion;
