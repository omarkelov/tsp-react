import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import NavigationBar from './features/navigation-bar/NavigationBar';
import { LOGGED_IN_KEY } from './store/authSlice';
import { privateRoutes, publicRoutes } from './routes';
import './styles/App.module.scss';


const App: FC = () => {
    const [isLoggedIn] = useLocalStorage(LOGGED_IN_KEY, false);

    return (
        <BrowserRouter>
            {isLoggedIn && <NavigationBar />}
            <Routes>
                {(isLoggedIn ? privateRoutes : publicRoutes).map(({ path, Element }) =>
                    <Route
                        key={path}
                        path={path}
                        element={<Element />}
                    />
                )}
                <Route path='*' element={<Navigate to={isLoggedIn ? '/dictionaries' : 'login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
