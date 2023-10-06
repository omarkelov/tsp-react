import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Dictionary } from '../../api/dictionariesAPI';
import { deleteDictionaryAsync } from '../../store/dictionariesSlice';
import { useAppDispatch } from '../../store/hooks';
import { combineClassNames } from '../../util/classNames';

import styles from './DictionaryItem.module.scss';


const DictionaryItem: FC<{
    dictionary: Dictionary;
    isDeleting: boolean;
}> = memo(({ dictionary: { name }, isDeleting }) => {
    const dispatch = useAppDispatch();

    const handleRemoveClick = () => {
        if (confirm('Are you sure you want to delete this dictionary?')) {
            dispatch(deleteDictionaryAsync(name));
        }
    };

    return (
        <li className={combineClassNames(styles.dictionary, isDeleting && styles.mDictionaryDeleting)}>
            <Link className={styles.link} to={`/movies/${name}`}>{name}</Link>
            <div className={styles.removeButton} onClick={handleRemoveClick}></div>
        </li>
    );
});

export default DictionaryItem;
