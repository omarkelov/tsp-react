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
    dispatchGetNextEntitiesAsync: (page: number) => any; // TODO: type
    dispatchResetStatus: () => any; // TODO: type
}> = memo(({
    children,
    entitiesName,
    status,
    hasMore,
    page,
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

    return (
        <div className={styles.root}>
            <ul className={styles.entities}>
                {children}
            </ul>
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
