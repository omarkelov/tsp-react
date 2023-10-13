import { FC, useCallback } from 'react';

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
import InfiniteList from '../infinite-list/InfiniteList';

import MovieItem from './MovieItem';


const MoviesList: FC = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectStatus);
    const movies = useAppSelector(selectMovies);
    const hasMore = useAppSelector(selectHasMore);
    const page = useAppSelector(selectPage);
    const deletionStatusByMovieId = useAppSelector(selectDeletionStatusByMovieId);

    const dispatchGetNextMoviesAsync = useCallback(
        (page: number) => dispatch(getNextMoviesAsync(page)),
        [dispatch]
    );

    const dispatchResetStatus = useCallback(() => dispatch(resetStatus()), [dispatch]);

    return (
        <InfiniteList
            entitiesName={'movies'}
            status={status}
            hasMore={hasMore}
            page={page}
            dispatchGetNextEntitiesAsync={dispatchGetNextMoviesAsync}
            dispatchResetStatus={dispatchResetStatus}
        >
            {!!movies.length && movies.map(movie => (
                <MovieItem
                    key={movie.id}
                    movie={movie}
                    isDeleting={deletionStatusByMovieId[movie.id] === 'deleting'}
                    isDeleted={deletionStatusByMovieId[movie.id] === 'deleted'}
                />
            ))}
        </InfiniteList>
    );
};

export default MoviesList;
