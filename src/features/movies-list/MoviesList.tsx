import { FC, useCallback, useEffect } from 'react';

import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import { useAbortOnUnmount } from '../../hooks/abortOnUnmount';
import { useIntersectionObserver } from '../../hooks/intersectionObserver';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getNextMoviesAsync,
    resetStatus,
    selectDeletionStatusByMovieId,
    selectHasMore,
    selectMovies,
    selectPage,
    selectStatus,
} from '../../store/slices/moviesSlice';

import MovieItem from './MovieItem';
import styles from './MoviesList.module.scss';


const MoviesList: FC = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectStatus);
    const movies = useAppSelector(selectMovies);
    const hasMore = useAppSelector(selectHasMore);
    const page = useAppSelector(selectPage);
    const deletionStatusByMovieId = useAppSelector(selectDeletionStatusByMovieId);

    const setAbortCallback = useAbortOnUnmount();
    const getNextMovies = useCallback(() => {
        setAbortCallback(dispatch(getNextMoviesAsync(page)));
    }, [page, dispatch, setAbortCallback]);
    const spinnerRef = useIntersectionObserver<HTMLDivElement>(getNextMovies);

    useEffect(() => () => {
        dispatch(resetStatus());
    }, [dispatch]);

    return (
        <div className={styles.root}>
            <ul className={styles.movies}>
                {!!movies.length && movies.map(movie => (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                        isDeleting={deletionStatusByMovieId[movie.id] === 'deleting'}
                        isDeleted={deletionStatusByMovieId[movie.id] === 'deleted'}
                    />
                ))}
            </ul>
            {hasMore && (
                <div className={styles.loadingRoot}>
                    {status === 'failed'
                        ? (
                            <div className={styles.loadingFailed}>
                                <span>{`Failed to load ${page ? 'more' : ''} movies`}</span>
                                <Button value='Try again' onClick={getNextMovies} />
                            </div>
                        )
                        : <Spinner ref={spinnerRef} />
                    }
                </div>
            )}
        </div>
    );
};

export default MoviesList;
