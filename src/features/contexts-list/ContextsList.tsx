import { FC, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getNextContextsAsync,
    resetStatus,
    selectContexts,
    selectDeletionStatusByContextId,
    selectHasMore,
    selectPage,
    selectStatus,
} from '../../store/slices/contextsSlice';
import InfiniteList from '../infinite-list/InfiniteList';

import ContextItem from './ContextItem';


const ContextsList: FC = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectStatus);
    const contexts = useAppSelector(selectContexts);
    const hasMore = useAppSelector(selectHasMore);
    const page = useAppSelector(selectPage);
    const deletionStatusByContextId = useAppSelector(selectDeletionStatusByContextId);

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
            isEnumerated
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
