import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import NavigationBar from './features/navigation-bar/NavigationBar';
import { PageRoute, privateRoutes, publicRoutes } from './routes';
import { LOGGED_IN_KEY } from './store/authSlice';
import styles from './styles/App.module.scss';


const generateRoutes = (pageRoutes: PageRoute[]) => pageRoutes.map(({ path, Element }) => (
    <Route
        key={path}
        path={path}
        element={<Element />}
    />
));

const App: FC = () => {
    const [isLoggedIn] = useLocalStorage(LOGGED_IN_KEY, false);

    return (
        <BrowserRouter>
            {isLoggedIn ? (
                <div className={styles.root}>
                    <NavigationBar />
                    <Routes>
                        {generateRoutes(privateRoutes)}
                        <Route path='*' element={<Navigate to='/dictionaries' replace />} />
                    </Routes>
                </div>
            ) : (
                <Routes>
                    {generateRoutes(publicRoutes)}
                    <Route path='*' element={<Navigate to='/login' replace />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default App;
