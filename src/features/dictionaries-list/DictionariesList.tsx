import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Dictionary, fetchDictionaries } from '../../api/dictionariesAPI';
import Spinner from '../../components/spinner/Spinner';

import styles from './DictionariesList.module.scss';
import DictionaryItem from './DictionaryItem';


const LIMIT = 25;

const DictionariesList: FC = () => {
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const spinnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const abortController = new AbortController();
        const intersectionObserver = new IntersectionObserver(([observable]) => {
            if (!observable.isIntersecting) {
                return;
            }

            fetchDictionaries(abortController.signal, page, LIMIT)
                .then(response => response.json())
                .then((extraDictionaries: Dictionary[]) => {
                    if (!extraDictionaries.length) {
                        setHasMore(false);
                        return;
                    }

                    setDictionaries(prevDictionaries => [...prevDictionaries, ...extraDictionaries]);
                    setPage(prevPage => prevPage + 1);

                    if (extraDictionaries.length < LIMIT) {
                        setHasMore(false);
                    }
                })
                .catch(e => {
                    if (e.name !== 'AbortError') {
                        throw e;
                    }
                });
        });

        if (spinnerRef?.current) {
            intersectionObserver.observe(spinnerRef.current);
        }

        return () => {
            abortController.abort();
            intersectionObserver.disconnect();
        };
    }, [page]);

    const onDictionaryDeleted = useCallback((dictionary: Dictionary) => {
        setDictionaries(prevDictionaries => prevDictionaries!.filter(({ name }) => name !== dictionary.name));
    }, [setDictionaries]);

    return (
        <div>
            <ul className={styles.dictionaries}>
                {!!dictionaries.length && dictionaries.map(dictionary => (
                    <DictionaryItem
                        key={dictionary.name}
                        dictionary={dictionary}
                        onDictionaryDeleted={onDictionaryDeleted} />
                ))}
            </ul>
            {hasMore && <Spinner ref={spinnerRef} className={styles.spinner} />}
        </div>
    );
};

export default DictionariesList;
