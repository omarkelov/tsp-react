import { FC, useEffect, useRef } from 'react';

import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import {
    getNextDictionariesAsync,
    resetStatus,
    selectDeletionStatusByDictionaryName,
    selectDictionaries,
    selectHasMore,
    selectPage,
    selectStatus,
} from '../../store/dictionariesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Abortable } from '../../util/types';

import styles from './DictionariesList.module.scss';
import DictionaryItem from './DictionaryItem';


const DictionariesList: FC = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectStatus);
    const dictionaries = useAppSelector(selectDictionaries);
    const hasMore = useAppSelector(selectHasMore);
    const page = useAppSelector(selectPage);
    const deletionStatusByDictionaryName = useAppSelector(selectDeletionStatusByDictionaryName);

    const spinnerRef = useRef<HTMLDivElement>(null);
    const abortableRef = useRef<Abortable | null>(null);

    useEffect(() => {
        return () => {
            abortableRef.current?.abort();
            dispatch(resetStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) {
                abortableRef.current = dispatch(getNextDictionariesAsync(page));
                intersectionObserver.disconnect();
            }
        });

        if (spinnerRef?.current) {
            intersectionObserver.observe(spinnerRef.current);
        }

        return () => {
            intersectionObserver.disconnect();
        };
    }, [page, dispatch]);

    const getNextDictionaries = () => {
        abortableRef.current = dispatch(getNextDictionariesAsync(page));
    };

    return (
        <div className={styles.root}>
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
            {hasMore && (
                <div className={styles.loadingRoot}>
                    {status === 'failed'
                        ? (
                            <div className={styles.loadingFailed}>
                                <span>{`Failed to load ${page ? 'more' : ''} dictionaries`}</span>
                                <Button value='Try again' onClick={getNextDictionaries} />
                            </div>
                        )
                        : <Spinner ref={spinnerRef} />
                    }
                </div>
            )}
        </div>
    );
};

export default DictionariesList;
