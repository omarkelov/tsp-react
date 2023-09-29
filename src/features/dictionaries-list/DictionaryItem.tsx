import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Dictionary } from '../../api/dictionariesAPI';
import { deleteDictionaryAsync } from '../../store/dictionariesSlice';
import { useAppDispatch } from '../../store/hooks';

import styles from './DictionaryItem.module.scss';


const DictionaryItem: FC<{
    dictionary: Dictionary;
}> = memo(({ dictionary: { name } }) => {
    const dispatch = useAppDispatch();

    const handleRemoveClick = () => {
        if (confirm('Are you sure you want to delete this dictionary?')) {
            dispatch(deleteDictionaryAsync(name));
        }
    };

    return (
        <li className={styles.dictionary}>
            <Link className={styles.link} to={`/movies/${name}`}>{name}</Link>
            <div className={styles.removeButton} onClick={handleRemoveClick}></div>
        </li>
    );
});

export default DictionaryItem;
