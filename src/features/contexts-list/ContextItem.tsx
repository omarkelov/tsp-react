import { FC, memo, ReactNode, useRef } from 'react';

import SlideUp from '../../components/slide-up/SlideUp';
import { useAppDispatch } from '../../store/hooks';
import { deleteContext, deleteContextAsync } from '../../store/slices/contextsSlice';
import { combineClassNames } from '../../util/classNames';
import { Context, Phrase } from '../../util/types';
import PhraseElement from '../phrase/PhraseElement';

import styles from './ContextItem.module.scss';


const generateContextWithPhrases = (context: string, phrases: Phrase[] = []) => {
    let pattern = '';

    phrases.forEach(({ phrase }, idx) => {
        if (idx > 0) pattern += '|';
        pattern += phrase;
    });

    const groups: ReactNode[] = context.split(new RegExp('(' + pattern + ')', 'gi'));

    for (let i = 0; i < groups.length; i++) {
        phrases.filter(({ phrase }) => groups[i] === phrase).forEach(phrase => {
            groups[i] = <PhraseElement key={`${phrase.id}-${i}`} phrase={phrase} />;
        });
    }

    return groups;
};

const ContextItem: FC<{
    context: Context;
    isDeleting: boolean;
    isDeleted: boolean;
}> = memo(({ context: { id, context, link, phrases }, isDeleting, isDeleted }) => {
    const dispatch = useAppDispatch();
    const liRef = useRef<HTMLLIElement>(null);

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this context?')) {
            dispatch(deleteContextAsync(id));
        }
    };

    const liElement = (
        <li
            ref={liRef}
            className={combineClassNames(styles.context, (isDeleting || isDeleted) && styles.mContextDeleting)}
        >
            <span>
                {generateContextWithPhrases(context, phrases)}
            </span>
            <div
                className={styles.removeButton}
                onClick={handleDeleteClick}
            />
        </li>
    );

    if (!isDeleted) {
        return liElement;
    }

    return (
        <SlideUp
            childRef={liRef}
            onAnimationFinished={() => dispatch(deleteContext(id))}
        >
            {liElement}
        </SlideUp>
    );
});

export default ContextItem;
