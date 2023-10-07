import { FC, useEffect, useRef } from 'react';

import Spinner from '../../components/spinner/Spinner';
import {
    getNextDictionariesAsync,
    // initialize,
    selectDeletionStatusByDictionaryName,
    selectDictionaries,
    selectHasMore,
    selectPage,
} from '../../store/dictionariesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './DictionariesList.module.scss';
import DictionaryItem from './DictionaryItem';



const DictionariesList: FC = () => {
    const dispatch = useAppDispatch();
    const dictionaries = useAppSelector(selectDictionaries);
    const hasMore = useAppSelector(selectHasMore);
    const page = useAppSelector(selectPage);
    const deletionStatusByDictionaryName = useAppSelector(selectDeletionStatusByDictionaryName);
    const spinnerRef = useRef<HTMLDivElement>(null);

    /* useEffect(() => {
        dispatch(initialize());
    }, [dispatch]); */

    useEffect(() => {
        const abortController = new AbortController();
        const intersectionObserver = new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) {
                dispatch(getNextDictionariesAsync({ page, signal: abortController.signal }));
                intersectionObserver.disconnect();
            }
        });

        if (spinnerRef?.current) {
            intersectionObserver.observe(spinnerRef.current);
        }

        return () => {
            abortController.abort();
            intersectionObserver.disconnect();
        };
    }, [page, dispatch]);

    return (
        <div>
            <ul className={styles.dictionaries}>
                {!!dictionaries.length && dictionaries.map(dictionary => (
                    <DictionaryItem
                        key={dictionary.name}
                        dictionary={dictionary}
                        isDeleting={deletionStatusByDictionaryName[dictionary.name] === 'deleting'}
                        isDeleted={deletionStatusByDictionaryName[dictionary.name] === 'deleted'}
                    />
                ))}
            </ul>
            {hasMore && <Spinner ref={spinnerRef} className={styles.spinner} />}
        </div>
    );
};

export default DictionariesList;
