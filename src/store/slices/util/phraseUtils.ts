import { Context } from '../../../util/types';


export const updatePhraseStatistics = (
    context: Context | undefined,
    { phraseId, isCorrect }: { phraseId: number, isCorrect: boolean }
): boolean => {
    const phrase = context?.phrases?.find(({ id }) => id === phraseId);

    if (!phrase) {
        return false;
    }

    phrase.phraseStats ??= {
        successfulAttempts: 0,
        attempts: 0,
    };

    if (isCorrect) {
        phrase.phraseStats.successfulAttempts++;
    }

    phrase.phraseStats.attempts++;

    return true;
};
