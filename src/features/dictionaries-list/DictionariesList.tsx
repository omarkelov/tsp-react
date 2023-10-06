import { FC, useEffect, useRef } from 'react';

import Spinner from '../../components/spinner/Spinner';
import {
    getNextDictionariesAsync,
    initialize,
    selectDeletingDictionariesNames,
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
    const deletingDictionariesNames = useAppSelector(selectDeletingDictionariesNames);
    const spinnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) {
                dispatch(getNextDictionariesAsync(page));
            }
        });

        if (spinnerRef?.current) {
            intersectionObserver.observe(spinnerRef.current);
        }

        return () => intersectionObserver.disconnect();
    }, [page, dispatch]);

    return (
        <div>
            <ul className={styles.dictionaries}>
                {!!dictionaries.length && dictionaries.map(dictionary => (
                    <DictionaryItem
                        key={dictionary.name}
                        dictionary={dictionary}
                        isDeleting={deletingDictionariesNames.includes(dictionary.name)}
                    />
                ))}
            </ul>
            {hasMore && <Spinner ref={spinnerRef} className={styles.spinner} />}
        </div>
    );
};

export default DictionariesList;