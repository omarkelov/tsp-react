import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Dictionary, fetchDeleteDictionary } from '../../api/dictionariesAPI';

import styles from './DictionaryItem.module.scss';


const DictionaryItem: FC<{
    dictionary: Dictionary;
    onDictionaryDeleted: (dictionary: Dictionary) => void;
}> = memo(({ dictionary, onDictionaryDeleted }) => {
    const handleRemoveClick = () => {
        if (confirm('Are you sure you want to delete this dictionary?')) {
            fetchDeleteDictionary(dictionary.name)
                .then(response => {
                    if (response.status == 204) {
                        onDictionaryDeleted(dictionary);
                    } else {
                        alert('Cannot remove the dictionary: status code is ' + response.status);
                    }
                })
                .catch(e => {
                    alert('Cannot remove the dictionary: ' + e.message);
                });
        }
    };

    return (
        <li className={styles.dictionary}>
            <Link className={styles.link} to={`/movies/${dictionary.name}`}>{dictionary.name}</Link>
            <div className={styles.removeButton} onClick={handleRemoveClick}></div>
        </li>
    );
});

export default DictionaryItem;
