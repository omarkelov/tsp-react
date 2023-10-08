import { FC, useCallback, useEffect, useRef } from 'react';

import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import { useIntersectionObserver } from '../../hooks/intersectionObserver';
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

    const abortableRef = useRef<Abortable | null>(null);
    const getNextDictionaries = useCallback(() => {
        abortableRef.current = dispatch(getNextDictionariesAsync(page));
    }, [page, dispatch]);
    const spinnerRef = useIntersectionObserver<HTMLDivElement>(getNextDictionaries);

    useEffect(() => {
        return () => {
            abortableRef.current?.abort();
            dispatch(resetStatus());
        };
    }, [dispatch]);

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
