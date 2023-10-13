import { FC, memo, useRef } from 'react';
import { Link } from 'react-router-dom';

import SlideUp from '../../components/slide-up/SlideUp';
import { useAppDispatch } from '../../store/hooks';
import { deleteDictionary, deleteDictionaryAsync } from '../../store/slices/dictionariesSlice';
import { combineClassNames } from '../../util/classNames';
import { Dictionary } from '../../util/types';

import styles from './DictionaryItem.module.scss';


const DictionaryItem: FC<{
    dictionary: Dictionary;
    isDeleting: boolean;
    isDeleted: boolean;
}> = memo(({ dictionary: { name }, isDeleting, isDeleted }) => {
    const dispatch = useAppDispatch();
    const liRef = useRef<HTMLLIElement>(null);

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this dictionary?')) {
            dispatch(deleteDictionaryAsync(name));
        }
    };

    const liElement = (
        <li
            ref={liRef}
            className={combineClassNames(styles.dictionary, (isDeleting || isDeleted) && styles.mDictionaryDeleting)}
        >
            <Link
                className={styles.link}
                to={`/dictionaries/${name}`}
            >
                {name}
            </Link>
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
            onAnimationFinished={() => dispatch(deleteDictionary(name))}
        >
            {liElement}
        </SlideUp>
    );
});

export default DictionaryItem;
