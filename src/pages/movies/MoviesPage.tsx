import { FC } from 'react';

import MoviesList from '../../features/movies-list/MoviesList';
import PageContent from '../../features/page-content/PageContent';
import { useAppTitle } from '../../hooks/title';


const MoviesPage: FC = () => {
    useAppTitle('Movies');

    return (
        <PageContent title='Movies'>
            <MoviesList />
        </PageContent>
    );
};

export default MoviesPage;
