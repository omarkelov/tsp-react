import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { DictionaryItem as Dictionary, fetchDeleteDictionary, fetchDictionaries } from '../../api/dictionariesAPI';

import styles from './DictionariesList.module.scss';


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
            <Link className={styles.link} to={dictionary.href}>{dictionary.name}</Link>
            <div className={styles.removeButton} onClick={handleRemoveClick}></div>
        </li>
    );
});

const DictionariesList: FC = () => {
    const [dictionaries, setDictionaries] = useState<Dictionary[]>();

    useEffect(() => {
        const abortController = new AbortController();

        fetchDictionaries(abortController.signal)
            .then(response => response.json())
            .then(json => setDictionaries(json))
            .catch(e => {
                if (e.name !== 'AbortError') {
                    throw e;
                }
            });

        return () => abortController.abort();
    }, []);

    const onDictionaryDeleted = useCallback((dictionary: Dictionary) => {
        setDictionaries(prevDictionaries => prevDictionaries!.filter(({ name }) => name !== dictionary.name));
    }, [setDictionaries]);

    if (!dictionaries) {
        return null;
    }

    return (
        <ul className={styles.root}>
            {dictionaries.map(dictionary => (
                <DictionaryItem
                    key={dictionary.name}
                    dictionary={dictionary}
                    onDictionaryDeleted={onDictionaryDeleted} />
            ))}
        </ul>
    );
};

export default DictionariesList;
