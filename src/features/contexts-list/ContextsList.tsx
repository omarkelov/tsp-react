import { FC, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getNextContextsAsync,
    initialize,
    resetStatus,
    selectContexts,
    selectDeletionStatusByContextId,
    selectDictionaryName,
    selectHasMore,
    selectPage,
    selectStatus,
} from '../../store/slices/contextsSlice';
import InfiniteList from '../infinite-list/InfiniteList';

import ContextItem from './ContextItem';


const ContextsList: FC<{
    dictionaryName: string;
}> = ({ dictionaryName }) => {
    const dispatch = useAppDispatch();

    const savedDictionaryName = useAppSelector(selectDictionaryName);
    const status = useAppSelector(selectStatus);
    const contexts = useAppSelector(selectContexts);
    const hasMore = useAppSelector(selectHasMore);
    const page = useAppSelector(selectPage);
    const deletionStatusByContextId = useAppSelector(selectDeletionStatusByContextId);

    useEffect(() => {
        if (dictionaryName !== savedDictionaryName) {
            dispatch(initialize(dictionaryName));
        }
    }, [dictionaryName, savedDictionaryName, dispatch]);

    const dispatchGetNextContextsAsync = useCallback(
        (page: number) => dispatch(getNextContextsAsync(page)),
        [dispatch]
    );

    const dispatchResetStatus = useCallback(() => dispatch(resetStatus()), [dispatch]);

    return (
        <InfiniteList
            entitiesName={'contexts'}
            status={status}
            hasMore={hasMore}
            page={page}
            dispatchGetNextEntitiesAsync={dispatchGetNextContextsAsync}
            dispatchResetStatus={dispatchResetStatus}
        >
            {!!contexts.length && contexts.map(context => (
                <ContextItem
                    key={context.id}
                    context={context}
                    isDeleting={deletionStatusByContextId[context.id] === 'deleting'}
                    isDeleted={deletionStatusByContextId[context.id] === 'deleted'}
                />
            ))}
        </InfiniteList>
    );
};

export default ContextsList;
