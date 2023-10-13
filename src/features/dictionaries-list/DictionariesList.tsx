import { FC, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getNextDictionariesAsync,
    resetStatus,
    selectDeletionStatusByDictionaryName,
    selectDictionaries,
    selectHasMore,
    selectPage,
    selectStatus,
} from '../../store/slices/dictionariesSlice';
import InfiniteList from '../infinite-list/InfiniteList';

import DictionaryItem from './DictionaryItem';


const DictionariesList: FC = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectStatus);
    const dictionaries = useAppSelector(selectDictionaries);
    const hasMore = useAppSelector(selectHasMore);
    const page = useAppSelector(selectPage);
    const deletionStatusByDictionaryName = useAppSelector(selectDeletionStatusByDictionaryName);

    const dispatchGetNextDictionariesAsync = useCallback(
        (page: number) => dispatch(getNextDictionariesAsync(page)),
        [dispatch]
    );

    const dispatchResetStatus = useCallback(() => dispatch(resetStatus()), [dispatch]);

    return (
        <InfiniteList
            entitiesName={'dictionaries'}
            status={status}
            hasMore={hasMore}
            page={page}
            dispatchGetNextEntitiesAsync={dispatchGetNextDictionariesAsync}
            dispatchResetStatus={dispatchResetStatus}
        >
            {!!dictionaries.length && dictionaries.map(dictionary => (
                <DictionaryItem
                    key={dictionary.name}
                    dictionary={dictionary}
                    isDeleting={deletionStatusByDictionaryName[dictionary.name] === 'deleting'}
                    isDeleted={deletionStatusByDictionaryName[dictionary.name] === 'deleted'}
                />
            ))}
        </InfiniteList>
    );
};

export default DictionariesList;
