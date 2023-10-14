import { FC } from 'react';

import Tooltip from '../../components/tooltip/Tooltip';
import { Phrase } from '../../util/types';

import styles from './PhraseElement.module.scss';


const PhraseElement: FC<{
    phrase: Phrase;
}> = ({ phrase: { phrase, translation, correctedPhrase, phraseStats } }) => {
    let tooltip = '';
    if (correctedPhrase) {
        tooltip += `${correctedPhrase} – `;
    }
    tooltip += translation;
    if (phraseStats?.attempts) {
        tooltip += ' (' + phraseStats.successfulAttempts + ' / ' + phraseStats.attempts + ')';
    }

    return (
        <span className={styles.phrase}>
            <Tooltip tooltip={tooltip}>
                {phrase}
            </Tooltip>
        </span>
    );
};

export default PhraseElement;
