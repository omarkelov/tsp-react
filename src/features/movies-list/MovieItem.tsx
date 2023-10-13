import { FC, memo, useRef } from 'react';
import { Link } from 'react-router-dom';

import SlideUp from '../../components/slide-up/SlideUp';
import { useAppDispatch } from '../../store/hooks';
import { deleteMovie, deleteMovieAsync } from '../../store/slices/moviesSlice';
import { combineClassNames } from '../../util/classNames';
import { Movie } from '../../util/types';

import styles from './MovieItem.module.scss';


const MovieItem: FC<{
    movie: Movie;
    isDeleting: boolean;
    isDeleted: boolean;
}> = memo(({ movie: { id, videoFilePath }, isDeleting, isDeleted }) => {
    const dispatch = useAppDispatch();
    const liRef = useRef<HTMLLIElement>(null);

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this movie?')) {
            dispatch(deleteMovieAsync(id));
        }
    };

    const liElement = (
        <li
            ref={liRef}
            className={combineClassNames(styles.movie, (isDeleting || isDeleted) && styles.mMovieDeleting)}
        >
            <Link
                className={styles.link}
                to={`/movies/${id}`}
            >
                {videoFilePath}
            </Link>
            <div
                className={styles.removeButton}
                onClick={handleDeleteClick}
            />
        </li>
    );

    if (!isDeleted) {
        return liElement;
    }

    return (
        <SlideUp
            childRef={liRef}
            onAnimationFinished={() => dispatch(deleteMovie(id))}
        >
            {liElement}
        </SlideUp>
    );
});

export default MovieItem;
