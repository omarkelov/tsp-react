import DictionariesPage from './pages/DictionariesPage';
import DictionaryPage from './pages/DictionaryPage';
import LoginPage from './pages/LoginPage';
import MoviePage from './pages/MoviePage';
import MoviesPage from './pages/MoviesPage';
import TestPage from './pages/TestPage';


export const privateRoutes = [
    { path: '/movies', Element: MoviesPage },
    { path: '/movies/:id', Element: MoviePage },
    { path: '/dictionaries', Element: DictionariesPage },
    { path: '/dictionaries/:name', Element: DictionaryPage },
    { path: '/dictionaries/:name/test', Element: TestPage },
];

export const publicRoutes = [
    { path: '/login', Element: LoginPage },
];
