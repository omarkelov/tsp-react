import { FC, memo, ReactNode, useCallback, useEffect } from 'react';

import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import { useAbortOnUnmount } from '../../hooks/abortOnUnmount';
import { useIntersectionObserver } from '../../hooks/intersectionObserver';
import { LoadingStatus } from '../../util/types';

import styles from './InfiniteList.module.scss';


const InfiniteList: FC<{
    children: ReactNode; // TODO: type
    entitiesName: string;
    status: LoadingStatus;
    hasMore: boolean;
    page: number;
    isEnumerated?: boolean;
    dispatchGetNextEntitiesAsync: (page: number) => any; // TODO: type
    dispatchResetStatus: () => any; // TODO: type
}> = memo(({
    children,
    entitiesName,
    status,
    hasMore,
    page,
    isEnumerated = false,
    dispatchGetNextEntitiesAsync,
    dispatchResetStatus,
}) => {
    const setAbortCallback = useAbortOnUnmount();
    const getNextEntities = useCallback(() => {
        setAbortCallback(dispatchGetNextEntitiesAsync(page));
    }, [page, dispatchGetNextEntitiesAsync, setAbortCallback]);
    const spinnerRef = useIntersectionObserver<HTMLDivElement>(getNextEntities);

    useEffect(() => () => {
        dispatchResetStatus();
    }, [dispatchResetStatus]);

    const List = isEnumerated ? 'ol' : 'ul';

    return (
        <div className={styles.root}>
            <List className={styles.entities}>
                {children}
            </List>
            {hasMore && (
                <div className={styles.loadingRoot}>
                    {status === 'failed'
                        ? (
                            <div className={styles.loadingFailed}>
                                <span>
                                    {`Failed to load ${page ? 'more' : ''} ${entitiesName}`}
                                </span>
                                <Button
                                    value='Try again'
                                    onClick={getNextEntities}
                                />
                            </div>
                        )
                        : <Spinner ref={spinnerRef} />
                    }
                </div>
            )}
        </div>
    );
});

export default InfiniteList;
