import { FC } from 'react';

import DictionariesPage from './pages/dictionaries/DictionariesPage';
import DictionaryPage from './pages/dictionary/DictionaryPage';
import LoginPage from './pages/login/LoginPage';
import MoviePage from './pages/MoviePage';
import MoviesPage from './pages/movies/MoviesPage';
import TestPage from './pages/TestPage';


export interface PageRoute {
    path: string;
    Element: FC;
}

export const privateRoutes: PageRoute[] = [
    { path: '/movies', Element: MoviesPage },
    { path: '/movies/:id', Element: MoviePage },
    { path: '/dictionaries', Element: DictionariesPage },
    { path: '/dictionaries/:name', Element: DictionaryPage },
    { path: '/dictionaries/:name/test', Element: TestPage },
];

export const publicRoutes: PageRoute[] = [
    { path: '/login', Element: LoginPage },
];
